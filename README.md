# 4AMI Frontend Platform

A comprehensive Next.js application for asset management, user administration, and project analysis.

## 🚀 **Live Deployment**

- **Production URL**: [https://project4ami.com](https://project4ami.com) (AWS Amplify)
- **Backend API**: [http://ami-backend-alb-1784045037.us-east-1.elb.amazonaws.com/api/v1](http://ami-backend-alb-1784045037.us-east-1.elb.amazonaws.com/api/v1)
- **Status**: ✅ Deployed and Running
- **Last Updated**: November 16, 2025

## 📋 **Project Overview**

The 4AMI Frontend is a modern web application built with Next.js 15, providing:

- **User Management**: Admin and user dashboards
- **Company Administration**: Multi-tenant company management
- **Project Analysis**: Residual analysis and reporting
- **Asset Management**: Comprehensive asset tracking
- **Authentication**: Secure login and registration

## 🏗️ **Tech Stack**

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom React components
- **State Management**: React Context API
- **API Integration**: RESTful API with backend
- **Deployment**: AWS Amplify
- **CI/CD**: GitHub Actions

## 🔗 **Frontend-Backend Integration**

### **Architecture Overview**

```
┌─────────────────┐    HTTPS     ┌─────────────────┐    HTTPS     ┌─────────────────┐
│   Frontend      │ ──────────► │   Backend API   │ ──────────► │   AWS Database  │
│   (Amplify)     │             │  (Elastic       │             │   (RDS + Redis) │
│                 │             │   Beanstalk)    │             │                 │
└─────────────────┘             └─────────────────┘             └─────────────────┘
```

### **API Integration**

**Base URL**: `https://4ami-backend-docker.eba-5euwtfrt.us-east-1.elasticbeanstalk.com/api/v1`

**Authentication Flow**:
```typescript
// Frontend API calls to backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Login request
const loginResponse = await fetch(`${API_BASE_URL}/auth/signin`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});
```

**Key API Endpoints**:

| Endpoint | Method | Purpose | Frontend Usage |
|----------|--------|---------|----------------|
| `/auth/signin` | POST | User login | Login page |
| `/auth/customer-admin-signup` | POST | Admin registration | Signup page |
| `/users` | GET | Get all users | User management |
| `/users/invite` | POST | Invite users | User invitation |
| `/companies/register` | POST | Company registration | Company setup |
| `/projects` | POST | Create project | Project creation |
| `/health` | GET | Health check | System monitoring |

### **Environment Configuration**

**Production Environment Variables**:
```bash
NEXT_PUBLIC_API_BASE_URL=https://4ami-backend-docker.eba-5euwtfrt.us-east-1.elasticbeanstalk.com/api/v1
NEXT_PUBLIC_FRONTEND_URL=https://your-app.amplifyapp.com
NODE_ENV=production
```

**Local Development Environment**:
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api/v1
NODE_ENV=development
```

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 18+ 
- npm or yarn
- Git
- Backend running locally or access to production backend

### **Local Development**

1. **Clone the repository**
   ```bash
   git clone https://github.com/bill-banfield/4ami-frontend.git
   cd 4ami-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local`:
   ```bash
   # For local development
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api/v1
   NODE_ENV=development
   
   # For production backend testing
   # NEXT_PUBLIC_API_BASE_URL=https://4ami-backend-docker.eba-5euwtfrt.us-east-1.elasticbeanstalk.com/api/v1
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Open [http://localhost:3000](http://localhost:3000)
   - Admin Login: `admin@4ami.com` / `Admin@123456`

## 🧪 **Testing & Validation**

### **API Connectivity Testing**

**1. Health Check**
```bash
# Test backend health
curl https://4ami-backend-docker.eba-5euwtfrt.us-east-1.elasticbeanstalk.com/api/health

# Expected response: {"status": "ok", "timestamp": "..."}
```

**2. Authentication Testing**
```bash
# Test login endpoint
curl -X POST https://4ami-backend-docker.eba-5euwtfrt.us-east-1.elasticbeanstalk.com/api/v1/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@4ami.com","password":"Admin@123456"}'

# Expected response: JWT token and user data
```

**3. Frontend-Backend Integration Test**
```javascript
// Test in browser console
fetch('/api/health')
  .then(response => response.json())
  .then(data => console.log('Backend connected:', data))
  .catch(error => console.error('Backend connection failed:', error));
```

### **Data Persistence Testing**

**1. User Registration Test**
```bash
# Register new user
curl -X POST https://4ami-backend-docker.eba-5euwtfrt.us-east-1.elasticbeanstalk.com/api/v1/auth/customer-admin-signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123456","companyName":"Test Company"}'
```

**2. Database Verification**
- Check AWS RDS PostgreSQL database
- Verify user data is stored in `users` table
- Confirm company data in `companies` table

**3. Session Testing**
```javascript
// Test session persistence
localStorage.getItem('authToken');
sessionStorage.getItem('userData');
```

## 🔧 **Available Scripts**

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Testing
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
```

## 📁 **Project Structure**

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes (Backend Proxies)
│   │   ├── auth/          # Authentication endpoints
│   │   ├── users/         # User management
│   │   └── companies/     # Company management
│   ├── components/        # Reusable components
│   ├── dashboard/         # Dashboard pages
│   ├── user-dashboard/    # User-specific dashboards
│   ├── company-admin/     # Company admin pages
│   ├── login/             # Authentication pages
│   └── signup/            # Registration pages
├── lib/                   # Utility libraries
│   ├── config.ts         # API configuration
│   └── emailjs-config.ts # Email service config
└── contexts/             # React contexts
    └── SidebarContext.tsx # UI state management
```

## 🌐 **AWS Integration**

### **AWS Amplify Deployment**

The frontend is automatically deployed to AWS Amplify:

1. **Automatic Deployment**: Push to `main` branch triggers deployment
2. **Environment Variables**: Configured in Amplify Console
3. **Custom Domain**: Supports custom domain configuration
4. **SSL Certificate**: Automatically provisioned

### **Backend Integration**

**Production Backend**: AWS Elastic Beanstalk with Docker
- **URL**: `https://4ami-backend-docker.eba-5euwtfrt.us-east-1.elasticbeanstalk.com`
- **Database**: AWS RDS PostgreSQL
- **Cache**: AWS ElastiCache Redis
- **Health Check**: `/api/health`

### **Environment Variables**

Required environment variables for production:

```bash
NEXT_PUBLIC_API_BASE_URL=https://4ami-backend-docker.eba-5euwtfrt.us-east-1.elasticbeanstalk.com/api/v1
NEXT_PUBLIC_FRONTEND_URL=https://your-app.amplifyapp.com
NODE_ENV=production
```

## 🔄 **CI/CD Pipeline**

### **GitHub Actions Workflow**

- **Trigger**: Push to `main` or `develop` branches
- **Process**: 
  1. Checkout code
  2. Setup Node.js 18
  3. Install dependencies
  4. Run linting and type checking
  5. Build application
  6. Deploy to AWS Amplify

### **Deployment Process**

```bash
# Deploy to production
git add .
git commit -m "Your changes"
git push origin main
```

## 🐳 **Docker Support**

### **Development**
```bash
# Build and start
docker-compose up --build

# Run in detached mode
docker-compose up -d

# Stop
docker-compose down

# View logs
docker-compose logs -f
```

### **Production**
```bash
# Build and start production
docker-compose -f docker-compose.prod.yml up --build

# Run in detached mode
docker-compose -f docker-compose.prod.yml up -d

# Stop containers
docker-compose -f docker-compose.prod.yml down

# View production logs
docker-compose -f docker-compose.prod.yml logs -f
```

## 🔐 **Authentication**

### **Admin Access**
- **Email**: `admin@4ami.com`
- **Password**: `Admin@123456`

### **User Roles**
- **Super Admin**: Full system access
- **Company Admin**: Company-specific management
- **Regular User**: Project and asset access

## 📚 **Documentation**

- **AWS Deployment Guide**: [AWS_DEPLOYMENT_FRONTEND.md](./AWS_DEPLOYMENT_FRONTEND.md)
- **API Documentation**: Available at `/api/docs` when backend is running
- **Component Documentation**: Inline JSDoc comments

## 🚨 **Troubleshooting**

### **Common Issues**

1. **Backend Connection Issues**
   ```bash
   # Check backend health
   curl https://4ami-backend-docker.eba-5euwtfrt.us-east-1.elasticbeanstalk.com/api/health
   
   # Check CORS configuration
   # Verify environment variables
   ```

2. **Build Failures**
   ```bash
   npm install
   npm run build
   ```

3. **Environment Variable Issues**
   - Verify `NEXT_PUBLIC_` prefix for client-side variables
   - Check Amplify Console configuration

### **Debug Commands**

```bash
# Local development
npm run dev

# Build test
npm run build

# Type checking
npx tsc --noEmit

# Linting
npm run lint

# API testing
curl -X GET http://localhost:3001/api/health
```

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 **License**

This project is proprietary software. All rights reserved.

## 📞 **Support**

For technical support or questions:
- **GitHub Issues**: Create an issue in the repository
- **Documentation**: Check the AWS deployment guide
- **Backend API**: Verify backend health at `/api/health`

---

**Last Updated**: October 25, 2025  
**Version**: 1.0.0  
**Status**: ✅ Production Ready