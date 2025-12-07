import bcrypt from 'bcryptjs';

// Pre-hash passwords synchronously
const hashedPassword = bcrypt.hashSync('password123', 10);

// In-memory data store
export const users = [
  {
    _id: '1',
    email: 'student@test.com',
    password: hashedPassword,
    name: 'Test Student',
    phone: '+1234567890',
    branch: 'Computer Science',
    college: 'Test University',
    role: 'requester',
    isActive: true,
    notifications: [],
    createdAt: new Date()
  },
  {
    _id: '3',
    email: 'admin@test.com',
    password: hashedPassword,
    name: 'Admin User',
    phone: '7892856055',
    branch: 'N/A',
    college: 'N/A',
    role: 'admin',
    isActive: true,
    notifications: [],
    createdAt: new Date()
  }
];

export const projects = [];
export const notifications = [];

export const settings = {
  faqs: [
    { question: 'How long does it take?', answer: 'Depends on project complexity' },
    { question: 'What payment methods?', answer: 'UPI, Card, Net Banking' }
  ],
  contactDetails: {
    email: 'support@projecthub.com',
    phone: '+1234567890',
    address: '123 Main St, City'
  },
  pricingRules: {
    mini: 5000,
    major: 15000
  },
  homepageContent: {
    title: 'ProjectHub',
    subtitle: 'Get your projects built by experts'
  }
};

let userIdCounter = 4;
let projectIdCounter = 1;
let notificationIdCounter = 1;

export const generateUserId = () => String(userIdCounter++);
export const generateProjectId = () => String(projectIdCounter++);
export const generateNotificationId = () => String(notificationIdCounter++);

// Helper function to create notification
export const createNotification = (userId, message, type, projectId = null) => {
  const notification = {
    _id: generateNotificationId(),
    userId,
    message,
    type,
    projectId,
    read: false,
    createdAt: new Date()
  };
  notifications.push(notification);
  
  const user = users.find(u => u._id === userId);
  if (user) {
    user.notifications.push(notification);
  }
  
  return notification;
};
