import express from 'express';
import { projects, users, generateProjectId, createNotification } from '../data/store.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Get all projects
router.get('/', authenticate, async (req, res) => {
  try {
    const { status, category, projectType } = req.query;
    let filteredProjects = [...projects];
    
    if (status) filteredProjects = filteredProjects.filter(p => p.status === status);
    if (category) filteredProjects = filteredProjects.filter(p => p.category === category);
    if (projectType) filteredProjects = filteredProjects.filter(p => p.projectType === projectType);
    
    if (req.user.role === 'requester') {
      filteredProjects = filteredProjects.filter(p => p.requester === req.user.userId);
    }
    
    // Populate user data
    const populatedProjects = filteredProjects.map(p => ({
      ...p,
      requester: users.find(u => u._id === p.requester),
      assignedDeveloper: p.assignedDeveloper ? users.find(u => u._id === p.assignedDeveloper) : null
    }));
    
    res.json(populatedProjects);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get single project
router.get('/:id', authenticate, async (req, res) => {
  try {
    const project = projects.find(p => p._id === req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    const populated = {
      ...project,
      requester: users.find(u => u._id === project.requester),
      assignedDeveloper: project.assignedDeveloper ? users.find(u => u._id === project.assignedDeveloper) : null
    };
    
    res.json(populated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Create project
router.post('/', authenticate, async (req, res) => {
  try {
    const project = {
      _id: generateProjectId(),
      title: req.body.title,
      description: req.body.description,
      projectType: req.body.projectType || 'mini',
      category: req.body.category,
      technologies: req.body.technologies || [],
      deadline: req.body.deadline ? new Date(req.body.deadline) : null,
      budget: req.body.budget,
      phone: req.body.phone || '',
      uploads: req.body.uploads || [],
      status: 'open',
      requester: req.user.userId,
      assignedDeveloper: null,
      estimatedDelivery: null,
      progressUpdates: [],
      deliverables: [],
      revisionRequests: [],
      internalNotes: '',
      createdAt: new Date()
    };
    
    projects.push(project);
    
    // Notify all admins
    const admins = users.filter(u => u.role === 'admin');
    admins.forEach(admin => {
      createNotification(
        admin._id,
        `New project posted: ${project.title}`,
        'project_posted',
        project._id
      );
    });
    
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update project status (admin only)
router.patch('/:id/status', authenticate, authorize('admin'), async (req, res) => {
  try {
    console.log('Status update request:', { id: req.params.id, status: req.body.status });
    
    const project = projects.find(p => p._id === req.params.id);
    if (!project) {
      console.log('Project not found:', req.params.id);
      return res.status(404).json({ error: 'Project not found' });
    }
    
    if (!req.body.status) {
      console.log('No status provided in request body');
      return res.status(400).json({ error: 'Status is required' });
    }
    
    const oldStatus = project.status;
    project.status = req.body.status;
    
    if (req.body.status === 'accepted') {
      project.acceptedAt = new Date();
    }
    if (req.body.status === 'completed') {
      project.completedAt = new Date();
    }
    
    console.log('Status updated successfully:', { oldStatus, newStatus: project.status });
    
    // Notify requester
    createNotification(
      project.requester,
      `Project "${project.title}" status updated: ${oldStatus} → ${req.body.status}`,
      'status_update',
      project._id
    );
    
    res.json(project);
  } catch (error) {
    console.error('Status update error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Assign developer (admin only)
router.patch('/:id/assign', authenticate, authorize('admin'), async (req, res) => {
  try {
    const project = projects.find(p => p._id === req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    project.assignedDeveloper = req.body.developerId;
    project.estimatedDelivery = req.body.estimatedDelivery ? new Date(req.body.estimatedDelivery) : null;
    
    // Notify developer
    if (req.body.developerId) {
      createNotification(
        req.body.developerId,
        `You have been assigned to project: ${project.title}`,
        'assignment',
        project._id
      );
    }
    
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add progress update (admin only)
router.post('/:id/progress', authenticate, authorize('admin', 'builder'), async (req, res) => {
  try {
    const project = projects.find(p => p._id === req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    const update = {
      date: new Date(),
      message: req.body.message,
      updatedBy: req.user.userId
    };
    
    project.progressUpdates.push(update);
    
    // Notify requester
    createNotification(
      project.requester,
      `Progress update on "${project.title}": ${req.body.message}`,
      'progress_update',
      project._id
    );
    
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Upload deliverables (admin/builder)
router.post('/:id/deliverables', authenticate, authorize('admin', 'builder'), async (req, res) => {
  try {
    const project = projects.find(p => p._id === req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    const deliverable = {
      type: req.body.type, // 'source', 'docs', 'ppt', 'video'
      url: req.body.url,
      description: req.body.description,
      uploadedAt: new Date()
    };
    
    project.deliverables.push(deliverable);
    project.status = 'delivered';
    
    // Notify requester
    createNotification(
      project.requester,
      `Deliverables uploaded for "${project.title}"`,
      'delivery',
      project._id
    );
    
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Request revision (requester)
router.post('/:id/revision', authenticate, async (req, res) => {
  try {
    const project = projects.find(p => p._id === req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    if (project.requester !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }
    
    const revision = {
      requestedAt: new Date(),
      reason: req.body.reason,
      status: 'pending'
    };
    
    project.revisionRequests.push(revision);
    project.status = 'in-progress';
    
    // Notify admin
    const admins = users.filter(u => u.role === 'admin');
    admins.forEach(admin => {
      createNotification(
        admin._id,
        `Revision requested for "${project.title}"`,
        'revision_requested',
        project._id
      );
    });
    
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Mark as complete (requester)
router.patch('/:id/complete', authenticate, async (req, res) => {
  try {
    const project = projects.find(p => p._id === req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    if (project.requester !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }
    
    project.status = 'completed';
    project.completedAt = new Date();
    
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update internal notes (admin only)
router.patch('/:id/notes', authenticate, authorize('admin'), async (req, res) => {
  try {
    const project = projects.find(p => p._id === req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    project.internalNotes = req.body.notes;
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
