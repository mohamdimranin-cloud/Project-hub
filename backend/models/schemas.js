// Enhanced data schemas for in-memory storage

export const ProjectSchema = {
  _id: String,
  title: String,
  description: String,
  projectType: String, // 'mini' | 'major'
  category: String, // 'IOT', 'Web App', 'Mobile App', 'ML', 'AI', 'Embedded'
  technologies: Array, // ['React', 'Node.js', etc]
  deadline: Date,
  budget: Number,
  phone: String, // Contact phone number for this project
  uploads: Array, // [{filename, url, type}]
  status: String, // 'open', 'in-review', 'accepted', 'in-progress', 'delivered', 'completed', 'rejected'
  requester: String, // user id
  assignedDeveloper: String, // user id (optional)
  estimatedDelivery: Date,
  progressUpdates: Array, // [{date, message, updatedBy}]
  deliverables: Array, // [{type: 'source'|'docs'|'ppt'|'video', url, description, uploadedAt}]
  revisionRequests: Array, // [{requestedAt, reason, status}]
  internalNotes: String,
  createdAt: Date,
  acceptedAt: Date,
  completedAt: Date
};

export const UserSchema = {
  _id: String,
  email: String,
  password: String,
  name: String,
  phone: String,
  branch: String,
  college: String,
  role: String, // 'requester', 'builder', 'admin'
  isActive: Boolean,
  notifications: Array, // [{id, message, type, read, createdAt}]
  createdAt: Date
};

export const NotificationSchema = {
  _id: String,
  userId: String,
  message: String,
  type: String, // 'project_posted', 'payment_done', 'revision_requested', 'status_update', 'delivery'
  projectId: String,
  read: Boolean,
  createdAt: Date
};

export const SettingsSchema = {
  faqs: Array, // [{question, answer}]
  contactDetails: Object, // {email, phone, address}
  pricingRules: Object, // {mini: 5000, major: 15000}
  homepageContent: Object
};
