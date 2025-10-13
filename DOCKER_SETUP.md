# Docker Setup for 4ami Next.js 

# Build the Docker image with tag '4ami'
docker build -t 4ami .

# Run the container and map port 3000
docker run -p 3000:3000 4ami

Application

This document provides comprehensive instructions for Dockerizing your Next.js application for both development and production environments.

## 📁 Files Created

- `Dockerfile` - Production-optimized multi-stage build
- `Dockerfile.dev` - Development environment with hot reload
- `docker-compose.yml` - Development environment setup
- `docker-compose.prod.yml` - Production environment with Nginx
- `nginx.conf` - Nginx configuration for production
- `.dockerignore` - Files to exclude from Docker build context

## 🚀 Quick Start

### Development Environment

1. **Start the development environment:**
   ```bash
   docker-compose up --build
   ```

2. **Access your application:**
   - Open http://localhost:3000 in your browser
   - The application will automatically reload when you make changes

3. **Stop the development environment:**
   ```bash
   docker-compose down
   ```

### Production Environment

1. **Build and start the production environment:**
   ```bash
   docker-compose -f docker-compose.prod.yml up --build -d
   ```

2. **Access your application:**
   - Open http://localhost in your browser
   - The application is served through Nginx for better performance

3. **Stop the production environment:**
   ```bash
   docker-compose -f docker-compose.prod.yml down
   ```

## 🔧 Development Commands

### Build and Run Development Container
```bash
# Build the development image
docker build -f Dockerfile.dev -t 4ami-dev .

# Run the development container
docker run -p 3000:3000 -v $(pwd):/app -v /app/node_modules 4ami-dev
```

### Build and Run Production Container
```bash
# Build the production image
docker build -t 4ami-prod .

# Run the production container
docker run -p 3000:3000 4ami-prod
```

## 🏗️ Architecture Overview

### Development Setup
- **Base Image:** Node.js 20 Alpine
- **Features:** Hot reload, volume mounting, development dependencies
- **Port:** 3000
- **Volumes:** Source code mounted for live updates

### Production Setup
- **Multi-stage Build:** Optimized for size and security
- **Base Image:** Node.js 20 Alpine
- **Features:** Standalone output, non-root user, minimal dependencies
- **Reverse Proxy:** Nginx for static file serving and load balancing
- **Security:** Security headers, gzip compression, proper caching

## 📊 Performance Optimizations

### Production Dockerfile Features
- **Multi-stage build** reduces final image size
- **Standalone output** includes only necessary files
- **Non-root user** for security
- **Layer caching** for faster rebuilds
- **Alpine Linux** for minimal base image

### Nginx Configuration Features
- **Gzip compression** for better performance
- **Static file caching** with proper headers
- **Security headers** for protection
- **Load balancing** ready for scaling

## 🔒 Security Considerations

### Production Security Features
- Non-root user execution
- Security headers via Nginx
- Minimal attack surface with Alpine Linux
- Proper file permissions
- Environment variable isolation

### SSL/HTTPS Setup (Optional)
To enable HTTPS in production:

1. **Create SSL directory:**
   ```bash
   mkdir ssl
   ```

2. **Add your SSL certificates:**
   - Place your `cert.pem` and `key.pem` files in the `ssl/` directory

3. **Update nginx.conf:**
   - Uncomment SSL configuration lines
   - Update certificate paths

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use:**
   ```bash
   # Check what's using port 3000
   lsof -i :3000
   
   # Kill the process or use a different port
   docker-compose up --build -p 3001:3000
   ```

2. **Permission issues on Linux:**
   ```bash
   # Fix file permissions
   sudo chown -R $USER:$USER .
   ```

3. **Node modules not updating:**
   ```bash
   # Remove node_modules volume and rebuild
   docker-compose down -v
   docker-compose up --build
   ```

4. **Build cache issues:**
   ```bash
   # Clear Docker build cache
   docker builder prune -a
   ```

### Debugging Commands

```bash
# View container logs
docker-compose logs -f app

# Access container shell
docker-compose exec app sh

# Check container status
docker-compose ps

# View resource usage
docker stats
```

## 📈 Monitoring and Logs

### View Logs
```bash
# Development logs
docker-compose logs -f

# Production logs
docker-compose -f docker-compose.prod.yml logs -f

# Specific service logs
docker-compose logs -f app
docker-compose logs -f nginx
```

### Health Checks
The production setup includes health checks to ensure services are running properly.

## 🔄 CI/CD Integration

### GitHub Actions Example
```yaml
name: Build and Deploy
on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build Docker image
        run: docker build -t 4ami-prod .
      - name: Run tests
        run: docker run --rm 4ami-prod npm test
```

## 📝 Environment Variables

Create a `.env` file for environment-specific variables:

```env
# Development
NODE_ENV=development
NEXT_TELEMETRY_DISABLED=1

# Production
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

## 🎯 Best Practices

1. **Always use specific versions** in Dockerfiles
2. **Keep images small** with multi-stage builds
3. **Use .dockerignore** to exclude unnecessary files
4. **Run as non-root user** in production
5. **Use health checks** for container monitoring
6. **Implement proper logging** for debugging
7. **Use secrets management** for sensitive data
8. **Regular security updates** of base images

## 📚 Additional Resources

- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Next.js Docker Documentation](https://nextjs.org/docs/deployment#docker-image)
- [Nginx Configuration Guide](https://nginx.org/en/docs/)
- [Docker Compose Reference](https://docs.docker.com/compose/compose-file/)

---

**Note:** This setup is optimized for your specific Next.js application with TypeScript and Tailwind CSS. Adjust configurations as needed for your specific requirements.
