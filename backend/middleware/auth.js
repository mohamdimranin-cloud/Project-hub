import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    console.log('Authorization check:', { 
      userRole: req.user.role, 
      requiredRoles: roles,
      userId: req.user.userId 
    });
    
    if (!roles.includes(req.user.role)) {
      console.log('Access denied - role mismatch');
      return res.status(403).json({ 
        error: 'Access denied',
        details: `Required role: ${roles.join(' or ')}, Your role: ${req.user.role}`
      });
    }
    next();
  };
};
