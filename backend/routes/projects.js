import express from 'express';
import sql from '../config/database.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Helper function to create notification
async function createNotification(userId, message, type, projectId) {
  try {
    await sql`
      INSERT INTO notifications (user_id, message, type, related_project_id, is_read)
      VALUES (${userId}, ${message}, ${type}, ${projectId}, false)
    `;
  } catch (error) {
    console.error('Failed to create notification:', error);
  }
}

// Get all projects
router.get('/', authenticate, async (req, res) => {
  try {
    const { status, category, projectType } = req.query;
    
    let query = sql`
      SELECT 
        p.*,
        json_build_object(
          'id', u.id,
          'name', u.name,
          'email', u.email,
          'phone', u.phone,
          'branch', u.branch,
          'college', u.college
        ) as requester
      FROM projects p
      LEFT JOIN users u ON p.requester_id = u.id
      WHERE 1=1
    `;
    
    // Add filters
    if (req.user.role === 'requester') {
      query = sql`
        SELECT 
          p.*,
          json_build_object(
            'id', u.id,
            'name', u.name,
            'email', u.email,
            'phone', u.phone,
            'branch', u.branch,
            'college', u.college
          ) as requester
        FROM projects p
        LEFT JOIN users u ON p.requester_id = u.id
        WHERE p.requester_id = ${req.user.userId}
      `;
    }
    
    let projects = await query;
    
    // Apply additional filters
    if (status) projects = projects.filter(p => p.status === status);
    if (category) projects = projects.filter(p => p.category === category);
    if (projectType) projects = projects.filter(p => p.project_type === projectType);
    
    // Get progress updates for each project
    for (let project of projects) {
      const progressUpdates = await sql`
        SELECT * FROM progress_updates 
        WHERE project_id = ${project.id}
        ORDER BY created_at DESC
      `;
      project.progressUpdates = progressUpdates.map(pu => ({
        message: pu.message,
        percentage: pu.percentage,
        date: pu.created_at
      }));
    }
    
    // Format response
    const formattedProjects = projects.map(p => ({
      _id: p.id.toString(),
      title: p.title,
      description: p.description,
      category: p.category,
      projectType: p.project_type,
      budget: parseFloat(p.budget),
      deadline: p.deadline,
      technologies: p.technologies || [],
      phone: p.phone,
      status: p.status,
      requester: p.requester,
      assignedDeveloper: p.assigned_developer_id,
      estimatedDelivery: p.estimated_delivery,
      acceptedAt: p.accepted_at,
      completedAt: p.completed_at,
      adminNotes: p.admin_notes,
      progressUpdates: p.progressUpdates || [],
      createdAt: p.created_at,
      updatedAt: p.updated_at
    }));
    
    res.json(formattedProjects);
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Get single project
router.get('/:id', authenticate, async (req, res) => {
  try {
    const projects = await sql`
      SELECT 
        p.*,
        json_build_object(
          'id', u.id,
          'name', u.name,
          'email', u.email,
          'phone', u.phone,
          'branch', u.branch,
          'college', u.college
        ) as requester
      FROM projects p
      LEFT JOIN users u ON p.requester_id = u.id
      WHERE p.id = ${req.params.id}
    `;
    
    if (projects.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    const project = projects[0];
    
    // Get progress updates
    const progressUpdates = await sql`
      SELECT * FROM progress_updates 
      WHERE project_id = ${project.id}
      ORDER BY created_at DESC
    `;
    
    const formattedProject = {
      _id: project.id.toString(),
      title: project.title,
      description: project.description,
      category: project.category,
      projectType: project.project_type,
      budget: parseFloat(project.budget),
      deadline: project.deadline,
      technologies: project.technologies || [],
      phone: project.phone,
      status: project.status,
      requester: project.requester,
      assignedDeveloper: project.assigned_developer_id,
      estimatedDelivery: project.estimated_delivery,
      acceptedAt: project.accepted_at,
      completedAt: project.completed_at,
      adminNotes: project.admin_notes,
      progressUpdates: progressUpdates.map(pu => ({
        message: pu.message,
        percentage: pu.percentage,
        date: pu.created_at
      })),
      createdAt: project.created_at,
      updatedAt: project.updated_at
    };
    
    res.json(formattedProject);
  } catch (error) {
    console.error('Get project error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Create project
router.post('/', authenticate, authorize('requester', 'admin'), async (req, res) => {
  try {
    const { title, description, category, projectType, budget, deadline, technologies, phone } = req.body;
    
    const newProject = await sql`
      INSERT INTO projects (
        title, description, category, project_type, budget, deadline, 
        technologies, phone, status, requester_id
      )
      VALUES (
        ${title}, ${description}, ${category}, ${projectType}, ${budget}, ${deadline},
        ${sql.array(technologies || [])}, ${phone || ''}, 'open', ${req.user.userId}
      )
      RETURNING *
    `;
    
    const project = newProject[0];
    
    // Create notification for admins
    const admins = await sql`SELECT id FROM users WHERE role = 'admin'`;
    for (const admin of admins) {
      await createNotification(
        admin.id,
        `New project submitted: ${title}`,
        'new_project',
        project.id
      );
    }
    
    res.status(201).json({
      _id: project.id.toString(),
      ...project,
      projectType: project.project_type
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Update project status
router.patch('/:id/status', authenticate, authorize('admin'), async (req, res) => {
  try {
    console.log('Status update request:', { id: req.params.id, status: req.body.status });
    
    const projects = await sql`
      SELECT * FROM projects WHERE id = ${req.params.id}
    `;
    
    if (projects.length === 0) {
      console.log('Project not found:', req.params.id);
      return res.status(404).json({ error: 'Project not found' });
    }
    
    const project = projects[0];
    const oldStatus = project.status;
    const newStatus = req.body.status;
    
    if (!newStatus) {
      console.log('No status provided in request body');
      return res.status(400).json({ error: 'Status is required' });
    }
    
    // Update project status
    const updated = await sql`
      UPDATE projects 
      SET status = ${newStatus},
          accepted_at = ${newStatus === 'accepted' ? sql`NOW()` : project.accepted_at},
          completed_at = ${newStatus === 'completed' ? sql`NOW()` : project.completed_at}
      WHERE id = ${req.params.id}
      RETURNING *
    `;
    
    console.log('Status updated successfully:', { oldStatus, newStatus });
    
    // Notify requester
    await createNotification(
      project.requester_id,
      `Project "${project.title}" status updated: ${oldStatus} → ${newStatus}`,
      'status_update',
      project.id
    );
    
    res.json({
      _id: updated[0].id.toString(),
      ...updated[0],
      projectType: updated[0].project_type
    });
  } catch (error) {
    console.error('Status update error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Add progress update
router.post('/:id/progress', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { message } = req.body;
    
    const projects = await sql`
      SELECT * FROM projects WHERE id = ${req.params.id}
    `;
    
    if (projects.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    const project = projects[0];
    
    await sql`
      INSERT INTO progress_updates (project_id, message, percentage)
      VALUES (${req.params.id}, ${message}, 0)
    `;
    
    // Notify requester
    await createNotification(
      project.requester_id,
      `New progress update on "${project.title}": ${message}`,
      'progress_update',
      project.id
    );
    
    res.json({ message: 'Progress updated successfully' });
  } catch (error) {
    console.error('Add progress error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Update admin notes
router.patch('/:id/notes', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { notes } = req.body;
    
    await sql`
      UPDATE projects 
      SET admin_notes = ${notes}
      WHERE id = ${req.params.id}
    `;
    
    res.json({ message: 'Notes updated successfully' });
  } catch (error) {
    console.error('Update notes error:', error);
    res.status(400).json({ error: error.message });
  }
});

export default router;
