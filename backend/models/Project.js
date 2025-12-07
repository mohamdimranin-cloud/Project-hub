import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  budget: { type: Number },
  status: { 
    type: String, 
    enum: ['open', 'accepted', 'in-progress', 'delivered', 'completed', 'disputed'],
    default: 'open'
  },
  requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  builder: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  deliverables: [{ 
    url: String, 
    description: String, 
    uploadedAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now },
  acceptedAt: Date,
  completedAt: Date
});

export default mongoose.model('Project', projectSchema);
