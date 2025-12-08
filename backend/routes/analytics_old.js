import express from 'express';
import { projects, users } from '../data/store.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Get analytics dashboard (admin only)
router.get('/', authenticate, authorize('admin'), async (req, res) => {
  try {
    const totalProjects = projects.length;
    const completedProjects = projects.filter(p => p.status === 'completed').length;
    const pendingProjects = projects.filter(p => ['open', 'in-review', 'accepted', 'in-progress'].includes(p.status)).length;
    const deliveredProjects = projects.filter(p => p.status === 'delivered').length;
    
    // Revenue calculation
    const revenue = projects
      .filter(p => p.status === 'completed')
      .reduce((sum, p) => sum + (p.budget || 0), 0);
    
    // Category breakdown
    const categoryStats = {};
    projects.forEach(p => {
      if (p.category) {
        categoryStats[p.category] = (categoryStats[p.category] || 0) + 1;
      }
    });
    
    // Project type breakdown
    const typeStats = {
      mini: projects.filter(p => p.projectType === 'mini').length,
      major: projects.filter(p => p.projectType === 'major').length
    };
    
    // User activity
    const totalUsers = users.filter(u => u.role === 'requester').length;
    const activeUsers = [...new Set(projects.map(p => p.requester))].length;
    
    // Developer performance
    const developerStats = {};
    projects.forEach(p => {
      if (p.assignedDeveloper) {
        if (!developerStats[p.assignedDeveloper]) {
          const dev = users.find(u => u._id === p.assignedDeveloper);
          developerStats[p.assignedDeveloper] = {
            name: dev?.name || 'Unknown',
            phone: dev?.phone || '',
            total: 0,
            completed: 0,
            inProgress: 0
          };
        }
        developerStats[p.assignedDeveloper].total++;
        if (p.status === 'completed') {
          developerStats[p.assignedDeveloper].completed++;
        } else if (['in-progress', 'accepted'].includes(p.status)) {
          developerStats[p.assignedDeveloper].inProgress++;
        }
      }
    });
    
    // Recent activity
    const recentProjects = projects
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 10);
    
    // Monthly project creation data (last 6 months)
    const monthlyData = {};
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      monthlyData[monthKey] = 0;
    }
    
    projects.forEach(p => {
      const projectDate = new Date(p.createdAt);
      const monthKey = projectDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      if (monthlyData.hasOwnProperty(monthKey)) {
        monthlyData[monthKey]++;
      }
    });
    
    res.json({
      overview: {
        totalProjects,
        completedProjects,
        pendingProjects,
        deliveredProjects,
        revenue,
        totalUsers,
        activeUsers
      },
      categoryStats,
      typeStats,
      monthlyData,
      developerStats: Object.values(developerStats),
      recentProjects
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
