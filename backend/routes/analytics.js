import express from 'express';
import sql from '../config/database.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticate, authorize('admin'), async (req, res) => {
  try {
    // Get total counts
    const projectCounts = await sql`
      SELECT 
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE status = 'open') as open,
        COUNT(*) FILTER (WHERE status = 'in-progress') as in_progress,
        COUNT(*) FILTER (WHERE status = 'completed') as completed,
        COUNT(*) FILTER (WHERE status = 'rejected') as rejected
      FROM projects
    `;
    
    const userCounts = await sql`
      SELECT 
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE role = 'requester') as requesters,
        COUNT(*) FILTER (WHERE role = 'admin') as admins
      FROM users
    `;
    
    // Get recent projects
    const recentProjects = await sql`
      SELECT 
        p.*,
        u.name as requester_name,
        u.email as requester_email
      FROM projects p
      LEFT JOIN users u ON p.requester_id = u.id
      ORDER BY p.created_at DESC
      LIMIT 10
    `;
    
    // Get project stats by category
    const categoryStats = await sql`
      SELECT category, COUNT(*) as count
      FROM projects
      GROUP BY category
      ORDER BY count DESC
    `;
    
    // Get project stats by type
    const typeStats = await sql`
      SELECT project_type, COUNT(*) as count
      FROM projects
      GROUP BY project_type
    `;
    
    res.json({
      projects: {
        total: parseInt(projectCounts[0].total),
        open: parseInt(projectCounts[0].open),
        inProgress: parseInt(projectCounts[0].in_progress),
        completed: parseInt(projectCounts[0].completed),
        rejected: parseInt(projectCounts[0].rejected)
      },
      users: {
        total: parseInt(userCounts[0].total),
        requesters: parseInt(userCounts[0].requesters),
        admins: parseInt(userCounts[0].admins)
      },
      recentProjects: recentProjects.map(p => ({
        _id: p.id.toString(),
        title: p.title,
        status: p.status,
        category: p.category,
        projectType: p.project_type,
        requesterName: p.requester_name,
        requesterEmail: p.requester_email,
        createdAt: p.created_at
      })),
      categoryStats: categoryStats.map(c => ({
        category: c.category,
        count: parseInt(c.count)
      })),
      typeStats: typeStats.map(t => ({
        type: t.project_type,
        count: parseInt(t.count)
      }))
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(400).json({ error: error.message });
  }
});

export default router;
