# AWS Deployment Guide - 4AMI Frontend

## 📋 **Project Overview**

The 4AMI Frontend is a Next.js application that provides a comprehensive platform for asset management, user administration, and project analysis. This document covers the complete deployment process to AWS Amplify.

## 🏗️ **Project Structure**

```
4ami-frontend-main/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── api/                      # API Routes (Backend Proxies)
│   │   │   ├── auth/                 # Authentication endpoints
│   │   │   │   ├── signin/route.ts
│   │   │   │   ├── customer-admin-signup/route.ts
│   │   │   │   └── verify-email/route.ts
│   │   │   ├── companies/            # Company management
│   │   │   │   └── register/route.ts
│   │   │   ├── projects/            # Project management
│   │   │   │   ├── route.ts
│   │   │   │   └── types/route.ts
│   │   │   ├── users/               # User management
│   │   │   │   ├── route.ts
│   │   │   │   └── invite/route.ts
│   │   │   ├── health/route.ts      # Health check
│   │   │   └── proxy/               # CORS proxy routes
│   │   ├── components/              # Reusable components
│   │   │   ├── SupperAdminModules/  # Admin components
│   │   │   └── [other components]
│   │   ├── contexts/                # React contexts
│   │   ├── dashboard/               # Dashboard pages
│   │   ├── user-dashboard/          # User-specific dashboards
│   │   ├── company-admin/          # Company admin pages
│   │   ├── login/                   # Authentication pages
│   │   ├── signup/                  # Registration pages
│   │   └── [other pages]
│   ├── lib/                         # Utility libraries
│   │   ├── config.ts               # API configuration
│   │   └── emailjs-config.ts       # Email service config
│   └── [other directories]
├── public/                          # Static assets
├── .github/workflows/               # CI/CD workflows
├── amplify.yml                      # AWS Amplify configuration
├── package.json                     # Dependencies and scripts
├── next.config.ts                   # Next.js configuration
├── tailwind.config.ts              # Tailwind CSS configuration
└── tsconfig.json                   # TypeScript configuration
```

## 🔗 **Backend API Integration**

### **API Configuration**
The frontend connects to the backend through a centralized configuration system:

```typescript
// src/lib/config.ts
export const config = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://ami-backend-alb-1784045037.us-east-1.elb.amazonaws.com/api/v1",
  
  endpoints: {
    auth: {
      signin: '/auth/signin',
      customerAdminSignup: '/auth/customer-admin-signup',
      verifyEmail: '/auth/verify-email',
    },
    users: {
      invite: '/users/invite',
    },
    companies: {
      register: '/companies/register',
    }
  }
};
```

### **API Endpoints Used**

#### **Authentication APIs**
- **POST** `/api/auth/signin` - User login
- **POST** `/api/auth/customer-admin-signup` - Customer admin registration
- **POST** `/api/auth/verify-email` - Email verification

#### **User Management APIs**
- **GET** `/api/users` - Get all users (with pagination)
- **POST** `/api/users/invite` - Invite new users

#### **Company Management APIs**
- **POST** `/api/companies/register` - Register new company

#### **Project Management APIs**
- **POST** `/api/projects` - Create new project
- **GET** `/api/projects/types` - Get project types

#### **Health Check API**
- **GET** `/api/health` - Application health status

### **API Call Patterns**

#### **Direct Backend Calls**
```typescript
// Example: Login API call
const response = await fetch(getApiUrlForEnvironment(config.endpoints.auth.signin), {
  method: "POST",
  headers: getAuthHeaders(),
  body: JSON.stringify({ email, password }),
});
```

#### **Proxy API Routes**
```typescript
// Example: Company registration through proxy
const response = await fetch('/api/companies/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  body: JSON.stringify(registrationData),
});
```

## 🚀 **AWS Amplify Deployment**

### **Prerequisites**
- AWS Account with appropriate permissions
- GitHub repository: `bill-banfield/4ami-frontend`
- Node.js 18+ installed locally
- Git configured

### **Step 1: Create Amplify App**

1. **Go to AWS Amplify Console**
   - URL: https://console.aws.amazon.com/amplify/
   - Click "New app" → "Host web app"

2. **Connect GitHub Repository**
   - Select "GitHub" as source
   - Authorize AWS to access your GitHub account
   - Select repository: `bill-banfield/4ami-frontend`
   - Select branch: `main`

3. **Configure Build Settings**
   - **Framework**: Next.js
   - **Node.js version**: 18.x
   - **Build command**: `npm run build`
   - **Output directory**: `.next`

### **Step 2: Environment Variables**

Set the following environment variables in Amplify Console:

```bash
# Backend API Configuration
NEXT_PUBLIC_API_BASE_URL=https://4ami-backend-prod.eba-5euwtfrt.us-east-1.elasticbeanstalk.com/api/v1

# Frontend URL (will be set automatically by Amplify)
NEXT_PUBLIC_FRONTEND_URL=https://your-app.amplifyapp.com

# Environment
NODE_ENV=production

# Optional: EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

### **Step 3: Build Configuration**

The `amplify.yml` file is already configured:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - echo "Installing dependencies..."
        - npm install
    build:
      commands:
        - echo "Building the app..."
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

### **Step 4: Deploy**

1. **Save and Deploy**
   - Click "Save and deploy"
   - Amplify will automatically build and deploy your application

2. **Monitor Deployment**
   - Watch the build logs in real-time
   - Check for any build errors or warnings

## 🔄 **CI/CD with GitHub Actions**

### **Automatic Deployment Trigger**

The frontend is configured to automatically deploy when:

- **Push to `main` branch** - Triggers production deployment
- **Push to `develop` branch** - Triggers development deployment
- **Pull requests to `main`** - Triggers preview deployment

### **GitHub Actions Workflow**

The `.github/workflows/amplify-ci.yml` file handles:

```yaml
name: Amplify CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  ci:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4

    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'

    - name: Install dependencies
      run: |
        rm -f pnpm-lock.yaml
        npm install

    - name: Run linting
      run: npm run lint || echo "Linting failed, continuing"
      continue-on-error: true

    - name: Type check
      run: npx tsc --noEmit || echo "Type check failed, continuing"
      continue-on-error: true

    - name: Build application
      run: npm run build
      env:
        NODE_ENV: production
        NEXT_TELEMETRY_DISABLED: 1
```

### **Deployment Process**

1. **Code Push**
   ```bash
   git add .
   git commit -m "Your changes"
   git push origin main
   ```

2. **Automatic Trigger**
   - GitHub Actions runs CI checks
   - Amplify detects the push and starts deployment
   - Build process begins automatically

3. **Deployment Monitoring**
   - Check Amplify Console for build status
   - Monitor build logs for any issues
   - Verify deployment success

## 🌐 **Custom Domain Setup**

### **Step 1: Add Custom Domain**

1. **In Amplify Console**
   - Go to your app → "Domain management"
   - Click "Add domain"
   - Enter your domain name (e.g., `yourcompany.com`)

2. **Configure DNS**
   - Add the provided CNAME records to your DNS provider
   - Wait for DNS propagation (can take up to 48 hours)

### **Step 2: SSL Certificate**

- Amplify automatically provisions SSL certificates
- HTTPS is enabled by default
- Certificate renewal is handled automatically

## 🔧 **Environment-Specific Configuration**

### **Development Environment**
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api/v1
NODE_ENV=development
```

### **Production Environment**
```bash
NEXT_PUBLIC_API_BASE_URL=https://4ami-backend-prod.eba-5euwtfrt.us-east-1.elasticbeanstalk.com/api/v1
NODE_ENV=production
```

## 📊 **Monitoring and Logs**

### **Amplify Console Monitoring**
- **Build logs** - View real-time build progress
- **Deployment history** - Track all deployments
- **Performance metrics** - Monitor app performance
- **Error tracking** - Monitor runtime errors

### **Application Logs**
- **Console logs** - Browser console output
- **Network requests** - API call monitoring
- **Error boundaries** - React error handling

## 🚨 **Troubleshooting**

### **Common Issues**

#### **Build Failures**
```bash
# Check build logs in Amplify Console
# Common fixes:
npm install  # Install dependencies
npm run build  # Test build locally
```

#### **API Connection Issues**
```bash
# Verify backend URL
curl https://4ami-backend-prod.eba-5euwtfrt.us-east-1.elasticbeanstalk.com/api/v1/health

# Check CORS configuration
# Ensure backend allows frontend domain
```

#### **Environment Variable Issues**
```bash
# Verify environment variables in Amplify Console
# Check NEXT_PUBLIC_ prefix for client-side variables
```

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
```

## 📈 **Performance Optimization**

### **Amplify Features**
- **Global CDN** - Automatic content delivery
- **Image optimization** - Automatic image compression
- **Code splitting** - Automatic bundle optimization
- **Caching** - Intelligent caching strategies

### **Next.js Optimizations**
- **Static generation** - Pre-rendered pages
- **Server-side rendering** - Dynamic content
- **Image optimization** - Next.js Image component
- **Bundle analysis** - Webpack bundle analyzer

## 🔐 **Security Considerations**

### **API Security**
- **CORS configuration** - Backend must allow frontend domain
- **Authentication tokens** - Secure token storage
- **HTTPS enforcement** - All API calls over HTTPS

### **Environment Security**
- **Environment variables** - Secure storage in Amplify
- **Secrets management** - Use AWS Secrets Manager for sensitive data
- **Access control** - Proper IAM permissions

## 📚 **Additional Resources**

### **Documentation Links**
- [AWS Amplify Documentation](https://docs.amplify.aws/)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

### **Support Contacts**
- **AWS Support** - For Amplify-related issues
- **GitHub Support** - For repository and Actions issues
- **Development Team** - For application-specific issues

---

## 🎯 **Quick Start Checklist**

- [ ] AWS Account set up
- [ ] GitHub repository connected
- [ ] Environment variables configured
- [ ] Build settings verified
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active
- [ ] Backend API accessible
- [ ] Frontend deployed successfully
- [ ] CI/CD pipeline working
- [ ] Monitoring set up

---

*Last updated: October 25, 2025*
*Version: 1.0*
