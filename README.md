# 4AMI Frontend Platform

A comprehensive Next.js application for asset management, user administration, and project analysis.

## 🚀 **Live Deployment**

- **Production URL**: [https://main-prod.d3olqsph6lodsn.amplifyapp.com](https://main-prod.d3olqsph6lodsn.amplifyapp.com)
- **Custom Domain**: [https://project4ami.com](https://project4ami.com) *(Coming Soon)*
- **Backend API (Current)**: `http://ami-backend-alb-1784045037.us-east-1.elb.amazonaws.com/api/v1`
- **Backend API (Future)**: `https://api.project4ami.com/api/v1` *(HTTPS - Coming Soon)*
- **Status**: ✅ Deployed and Running
- **Last Updated**: November 16, 2025

## 🏗️ **AWS Resources**

### **Frontend Infrastructure**
- **Service**: AWS Amplify
- **Region**: us-east-1
- **Branch**: main-prod
- **Domain**: `main-prod.d3olqsph6lodsn.amplifyapp.com`
- **Build Specs**: 8GiB Memory, 4vCPUs, 128GB Disk Space
- **IAM Role**: Banfield-AWS-Amplify (or custom Amplify role)
- **CI/CD**: Auto-deploy from GitHub on push to `main-prod`

### **Backend Infrastructure**
- **Service**: Application Load Balancer (ALB)
- **Load Balancer**: `ami-backend-alb-1784045037.us-east-1.elb.amazonaws.com`
- **Region**: us-east-1 (N. Virginia)
- **Protocol**: HTTP (Port 80) - *HTTPS coming with custom domain*
- **Health Check**: `/api/v1/health` returns `{"status":"ok"}`
- **Backend Platform**: Docker containers on AWS ECS/Elastic Beanstalk

### **Environment Variables (Amplify)**
```bash
NEXT_PUBLIC_API_BASE_URL=http://ami-backend-alb-1784045037.us-east-1.elb.amazonaws.com/api/v1
NEXT_PUBLIC_API_URL=http://ami-backend-alb-1784045037.us-east-1.elb.amazonaws.com/api/v1
NODE_ENV=production
```

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
┌─────────────────────┐   HTTPS    ┌──────────────────┐   HTTP    ┌─────────────────┐
│   Browser/Client    │ ────────► │   Next.js API    │ ────────► │   Backend ALB   │
│                     │           │   Proxy Routes   │           │  (ECS/Docker)   │
│   AWS Amplify       │           │   (Server-Side)  │           │                 │
│   CDN/Edge          │           │                  │           │  Port 80 (HTTP) │
└─────────────────────┘           └──────────────────┘           └─────────────────┘
         ▲                                                                │
         │                                                                ▼
         │                                                        ┌─────────────────┐
         │                                                        │   AWS Database  │
         └────────── Deployment via GitHub Actions ──────────────│   (RDS/Redis)   │
                                                                  └─────────────────┘
```

**Architecture Notes**:
- Frontend deployed on AWS Amplify with HTTPS enabled
- Backend uses HTTP ALB (HTTPS coming with custom domain `api.project4ami.com`)
- Mixed content issues avoided by using Next.js API proxy routes
- All browser requests go through `/api/*` routes which call backend server-side

### **API Integration**

**Current Base URL**: `http://ami-backend-alb-1784045037.us-east-1.elb.amazonaws.com/api/v1`  
**Future Base URL**: `https://api.project4ami.com/api/v1` *(HTTPS with custom domain)*

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

**Production Environment Variables (Amplify)**:
```bash
# Current Configuration (HTTP Backend)
NEXT_PUBLIC_API_BASE_URL=http://ami-backend-alb-1784045037.us-east-1.elb.amazonaws.com/api/v1
NEXT_PUBLIC_API_URL=http://ami-backend-alb-1784045037.us-east-1.elb.amazonaws.com/api/v1
NODE_ENV=production

# Future Configuration (HTTPS Backend)
# NEXT_PUBLIC_API_BASE_URL=https://api.project4ami.com/api/v1
# NEXT_PUBLIC_API_URL=https://api.project4ami.com/api/v1
# NODE_ENV=production
```

**Local Development Environment**:
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api/v1
NODE_ENV=development
```

**How to Update Amplify Environment Variables**:
1. Go to AWS Amplify Console
2. Select your app → `main-prod` branch
3. Navigate to **Hosting** → **Environment variables**
4. Add/Update variables
5. Save and redeploy

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

**1. Backend Health Check**
```bash
# Test backend ALB health endpoint
curl http://ami-backend-alb-1784045037.us-east-1.elb.amazonaws.com/api/v1/health

# Expected response: {"status":"ok"}
```

**2. Frontend Health Check**
```bash
# Test Next.js frontend health
curl https://main-prod.d3olqsph6lodsn.amplifyapp.com/api/health

# Expected response: 
# {
#   "status": "healthy",
#   "timestamp": "2025-11-16T...",
#   "uptime": 1234.56,
#   "environment": "production",
#   "version": "1.0.0"
# }
```

**3. Authentication Testing**
```bash
# Test login endpoint through Next.js proxy
curl -X POST https://main-prod.d3olqsph6lodsn.amplifyapp.com/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@4ami.com","password":"Admin@123456"}'

# Expected response: JWT token and user data
```

**4. Frontend-Backend Integration Test**
```javascript
// Test in browser console at https://main-prod.d3olqsph6lodsn.amplifyapp.com
fetch('/api/health')
  .then(response => response.json())
  .then(data => console.log('Frontend healthy:', data))
  .catch(error => console.error('Frontend health check failed:', error));
```

**5. Check Amplify Deployment Logs**
```bash
# View logs in AWS Console
AWS Console → Amplify → 4ami-frontend → Monitoring → Logging

# Or use AWS CLI
aws amplify list-apps
aws logs tail /aws/amplify/<app-id> --follow
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

## 🌐 **AWS Deployment & Infrastructure**

### **Frontend - AWS Amplify**

**Deployment Configuration**:
- **Service**: AWS Amplify Hosting
- **Region**: us-east-1 (N. Virginia)
- **Branch**: `main-prod` (production)
- **Build Settings**: Configured in `amplify.yml`
- **Compute**: 8GiB Memory, 4vCPUs, 128GB Disk
- **Auto-Deploy**: Enabled on push to `main-prod`
- **SSL/TLS**: Automatic HTTPS with AWS Certificate Manager

**Amplify Build Specification** (`amplify.yml`):
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install
    build:
      commands:
        - echo "API URL - $NEXT_PUBLIC_API_BASE_URL"
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
```

**IAM Role Requirements**:
- Role Name: `Banfield-AWS-Amplify` (or custom)
- Policies: `AdministratorAccess-Amplify`, `AmplifyBackendDeployFullAccess`
- Trust Relationship: `amplify.amazonaws.com`

### **Backend - Application Load Balancer**

**Current Configuration**:
- **Service**: Application Load Balancer (ALB)
- **DNS**: `ami-backend-alb-1784045037.us-east-1.elb.amazonaws.com`
- **Region**: us-east-1
- **Protocol**: HTTP (Port 80)
- **Target**: ECS/Docker containers
- **Health Check**: `/api/v1/health` → `{"status":"ok"}`

**Future Configuration** (HTTPS):
- **Custom Domain**: `api.project4ami.com`
- **Protocol**: HTTPS (Port 443)
- **Certificate**: AWS Certificate Manager (ACM)
- **SSL/TLS**: TLS 1.2+

**Backend Infrastructure**:
- **Container Platform**: AWS ECS or Elastic Beanstalk
- **Database**: AWS RDS PostgreSQL
- **Cache**: AWS ElastiCache Redis
- **Deployment**: Docker containers

### **Environment Variables (Production)**

**Set in AWS Amplify Console**:
```bash
# Current (HTTP Backend)
NEXT_PUBLIC_API_BASE_URL=http://ami-backend-alb-1784045037.us-east-1.elb.amazonaws.com/api/v1
NEXT_PUBLIC_API_URL=http://ami-backend-alb-1784045037.us-east-1.elb.amazonaws.com/api/v1
NODE_ENV=production

# Future (HTTPS Backend with Custom Domain)
# NEXT_PUBLIC_API_BASE_URL=https://api.project4ami.com/api/v1
# NEXT_PUBLIC_API_URL=https://api.project4ami.com/api/v1
```

**How to Update**:
1. AWS Console → Amplify → Select App
2. Hosting → Environment variables
3. Add/Edit variables
4. Save changes
5. Redeploy application

## 🔄 **CI/CD Pipeline**

### **Automated Deployment Flow**

```
┌─────────────────┐
│  Developer      │
│  Push Code      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  GitHub         │
│  main-prod      │
│  branch         │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  AWS Amplify    │
│  Auto-Deploy    │
│  Triggered      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Build Process  │
│  - npm install  │
│  - npm build    │
│  - Deploy       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Production     │
│  Live @ Amplify │
│  URL            │
└─────────────────┘
```

### **Deployment Process**

```bash
# 1. Make changes locally
git add .
git commit -m "Your feature or fix"

# 2. Push to GitHub (triggers auto-deploy)
git push origin main-prod

# 3. Monitor deployment in AWS Amplify Console
# AWS Console → Amplify → 4ami-frontend → Deployments

# 4. View logs for any issues
# Click on deployment to see build logs
```

### **Manual Redeploy**
If you need to redeploy without code changes:
1. Go to AWS Amplify Console
2. Select your app → main-prod branch
3. Click "Redeploy this version"

### **Deployment Verification**
```bash
# Check frontend health
curl https://main-prod.d3olqsph6lodsn.amplifyapp.com/api/health

# Check backend connectivity through frontend
curl -X POST https://main-prod.d3olqsph6lodsn.amplifyapp.com/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'
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

## 🔧 **Troubleshooting**

### **Common Issues**

#### **1. Amplify Build Failures - IAM Role Error**
```
Error: Unable to assume specified IAM Role
```
**Solution**:
- Go to IAM Console → Roles
- Find or create Amplify service role
- Ensure policies: `AdministratorAccess-Amplify`, `AmplifyBackendDeployFullAccess`
- Check Trust Relationship includes: `amplify.amazonaws.com`
- Update role in Amplify Console → App Settings → General → Service role

#### **2. Login Returns "Internal Server Error"**
**Possible Causes**:
- Backend ALB is down or unreachable
- Environment variables not set in Amplify
- CORS issues or mixed content blocking

**Debug Steps**:
```bash
# 1. Check backend health
curl http://ami-backend-alb-1784045037.us-east-1.elb.amazonaws.com/api/v1/health

# 2. Check frontend health
curl https://main-prod.d3olqsph6lodsn.amplifyapp.com/api/health

# 3. View Amplify logs
AWS Console → Amplify → Monitoring → Logging

# 4. Check browser console for errors
Open DevTools (F12) → Console tab → Network tab
```

#### **3. Mixed Content Errors (HTTP/HTTPS)**
```
Blocked loading mixed active content
```
**Solution**:
- All API calls use Next.js proxy routes (`/api/*`)
- Proxy routes run server-side (no browser CORS/mixed content issues)
- Backend can stay HTTP until HTTPS is enabled

#### **4. Environment Variables Not Working**
**Check**:
```bash
# In Amplify Console
Hosting → Environment variables → Verify all variables are set

# In browser console (frontend)
console.log(process.env.NEXT_PUBLIC_API_BASE_URL) // Should NOT work (client-side)

# In Next.js API routes (server-side)
console.log(process.env.NEXT_PUBLIC_API_BASE_URL) // Should work
```

**Fix**:
- Environment variables must start with `NEXT_PUBLIC_` for client-side
- Server-side API routes can access any env variable
- Redeploy after updating env vars in Amplify Console

#### **5. Deployment Stuck or Cancelled**
**Solution**:
- Check build specifications in `amplify.yml`
- Verify IAM role has proper permissions
- Check CloudWatch logs for specific errors
- Try manual redeploy: Amplify Console → Redeploy this version

### **Logging & Monitoring**

**View Real-time Logs**:
```bash
# AWS CLI method
aws logs tail /aws/amplify/<app-id> --follow

# Console method
AWS Console → Amplify → Monitoring → Logging
```

**Check Deployment Status**:
- Amplify Console → Deployments tab
- View build logs for each deployment
- Check Deploy phase for errors

**Monitor Performance**:
- Amplify Console → Monitoring tab
- View metrics: requests, latency, errors
- Set up CloudWatch alarms

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