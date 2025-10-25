# Backend Requirements for 4ami Application

## Database Schema Requirements

### PostgreSQL Tables Needed:

#### 1. Users Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role VARCHAR(50) NOT NULL, -- 'super_admin', 'company_admin', 'user'
    company_id UUID REFERENCES companies(id),
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 2. Companies Table
```sql
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    domain VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 3. Projects Table
```sql
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    company_id UUID REFERENCES companies(id),
    created_by UUID REFERENCES users(id),
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 4. User Invitations Table
```sql
CREATE TABLE user_invitations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL,
    company_id UUID REFERENCES companies(id),
    invited_by UUID REFERENCES users(id),
    token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    is_used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## API Endpoints Required

### Authentication Endpoints
- `POST /auth/signin` - User login
- `POST /auth/customer-admin-signup` - Company admin registration
- `POST /auth/verify-email` - Email verification

### User Management
- `POST /users/invite` - Invite new users
- `GET /users` - List users (with pagination)
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Company Management
- `POST /companies/register` - Register new company
- `GET /companies/:id` - Get company details
- `PUT /companies/:id` - Update company

### Project Management
- `POST /projects` - Create new project
- `GET /projects` - List projects
- `GET /projects/types` - Get project types
- `PUT /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project

## AWS Infrastructure Requirements

### RDS PostgreSQL Setup
```bash
# Create RDS instance
aws rds create-db-instance \
    --db-instance-identifier 4ami-database \
    --db-instance-class db.t3.micro \
    --engine postgres \
    --engine-version 15.4 \
    --master-username 4ami_admin \
    --master-user-password YourSecurePassword123! \
    --allocated-storage 20 \
    --vpc-security-group-ids sg-xxxxxxxxx \
    --db-subnet-group-name 4ami-subnet-group
```

### Environment Variables for Backend
```env
DATABASE_URL=postgresql://4ami_admin:YourSecurePassword123!@4ami-database.xxxxx.us-east-1.rds.amazonaws.com:5432/4ami
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
NODE_ENV=production
PORT=3001
CORS_ORIGIN=https://your-frontend-domain.elasticbeanstalk.com
```

## Recommended Backend Technology Stack

### Option 1: Node.js + Express + Prisma
- **Framework**: Express.js
- **ORM**: Prisma
- **Authentication**: JWT + bcrypt
- **Validation**: Joi or Zod
- **Documentation**: Swagger/OpenAPI

### Option 2: Python + FastAPI + SQLAlchemy
- **Framework**: FastAPI
- **ORM**: SQLAlchemy
- **Authentication**: JWT + passlib
- **Validation**: Pydantic
- **Documentation**: Auto-generated OpenAPI

### Option 3: Java + Spring Boot + JPA
- **Framework**: Spring Boot
- **ORM**: JPA/Hibernate
- **Authentication**: Spring Security + JWT
- **Validation**: Bean Validation

## Security Considerations

1. **Password Hashing**: Use bcrypt or Argon2
2. **JWT Tokens**: Secure secret keys, proper expiration
3. **CORS**: Configure for your frontend domain
4. **Rate Limiting**: Implement to prevent abuse
5. **Input Validation**: Sanitize all inputs
6. **SQL Injection**: Use parameterized queries
7. **HTTPS**: Enforce SSL/TLS
8. **Environment Variables**: Never commit secrets

## Deployment Architecture

```
Frontend (EB) → Backend (EB/EC2) → RDS PostgreSQL
     ↓              ↓                    ↓
  CloudFront    Load Balancer      Multi-AZ Setup
     ↓              ↓                    ↓
   Route 53    Auto Scaling        Automated Backups
```

## Cost Estimation (Monthly)

- **Frontend EB**: ~$25-50 (t3.small)
- **Backend EB**: ~$25-50 (t3.small) 
- **RDS PostgreSQL**: ~$15-30 (db.t3.micro)
- **Total**: ~$65-130/month
