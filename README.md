# 🎓 ProjectHub - Student Project Management System

A modern, full-stack web application for managing student projects with admin oversight and real-time collaboration.

![ProjectHub](https://img.shields.io/badge/Status-Production%20Ready-success)
![React](https://img.shields.io/badge/React-18.x-blue)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

### 👨‍🎓 Student Features
- **Project Submission**: Submit mini and major projects with detailed requirements
- **Real-time Tracking**: Monitor project status and progress updates
- **Dashboard**: View project statistics and recent activities
- **Notifications**: Get instant updates on project status changes
- **Profile Management**: Update personal information and preferences

### 👨‍💼 Admin Features
- **Project Management**: Review, approve, and track all student projects
- **Status Updates**: Change project status and add progress notes
- **User Management**: Manage student accounts and permissions
- **Analytics Dashboard**: View comprehensive project statistics
- **Kanban Board**: Visual task management with drag-and-drop
- **Settings**: Configure FAQs, pricing, and contact information

### 🎨 UI/UX Features
- **Modern Design**: Purple gradient theme with sci-fi patterns
- **Responsive**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: Floating shapes and interactive elements
- **Dark Mode Ready**: Prepared for dark theme implementation
- **Accessible**: WCAG compliant design

## 🚀 Tech Stack

### Frontend
- **React 18** - UI framework
- **React Router** - Navigation
- **Axios** - API communication
- **CSS3** - Styling with animations

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **JWT** - Authentication
- **bcrypt** - Password hashing

### Deployment
- **Frontend**: Vercel
- **Backend**: Render
- **Repository**: GitHub

## 📦 Installation

### Prerequisites
- Node.js 18.x or higher
- npm or yarn
- Git

### Clone Repository
```bash
git clone https://github.com/YOUR_USERNAME/projecthub.git
cd projecthub
```

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your backend URL
npm start
```

## 🔧 Configuration

### Backend Environment Variables
```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:3000
```

### Frontend Environment Variables
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🎯 Usage

### Default Accounts

**Student Account**
- Email: `student@test.com`
- Password: `password123`

**Admin Account**
- Email: `admin@test.com`
- Password: `password123`

### Student Workflow
1. Register/Login to your account
2. Submit a new project with requirements
3. Track project status on dashboard
4. Receive notifications on updates
5. View progress and deliverables

### Admin Workflow
1. Login to admin dashboard
2. Review new project submissions
3. Update project status
4. Add progress notes
5. Manage users and settings

## 📱 Screenshots

### Student Dashboard
![Dashboard](docs/screenshots/dashboard.png)

### Admin Project Management
![Admin](docs/screenshots/admin.png)

### Mobile View
![Mobile](docs/screenshots/mobile.png)

## 🌐 Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy

**Frontend to Vercel:**
```bash
cd frontend
vercel --prod
```

**Backend to Render:**
- Connect GitHub repository
- Set environment variables
- Deploy automatically

## 🧪 Testing

```bash
# Run frontend tests
cd frontend
npm test

# Run backend tests
cd backend
npm test
```

## 📚 API Documentation

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project
- `PATCH /api/projects/:id/status` - Update status
- `POST /api/projects/:id/progress` - Add progress

### Users
- `GET /api/users/me` - Get current user
- `PATCH /api/users/me` - Update profile
- `GET /api/users` - Get all users (admin)

See full API documentation in [API.md](docs/API.md)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - Initial work

## 🙏 Acknowledgments

- React team for the amazing framework
- Vercel for hosting
- Render for backend hosting
- All contributors and testers

## 📞 Support

For support, email support@projecthub.com or open an issue on GitHub.

## 🗺️ Roadmap

- [ ] Add MongoDB database integration
- [ ] Implement file upload for deliverables
- [ ] Add email notifications
- [ ] Implement real-time chat
- [ ] Add payment integration
- [ ] Mobile app (React Native)
- [ ] Dark mode
- [ ] Multi-language support

## 📊 Project Status

- ✅ Core features complete
- ✅ Responsive design
- ✅ Production ready
- 🚧 Database integration (planned)
- 🚧 File uploads (planned)

---

Made with ❤️ by ProjectHub Team
