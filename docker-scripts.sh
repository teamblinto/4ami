#!/bin/bash

# Docker Management Scripts for 4ami Next.js Application

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}=== $1 ===${NC}"
}

# Development commands
dev_up() {
    print_header "Starting Development Environment"
    print_status "Building and starting development containers..."
    docker-compose up --build
}

dev_down() {
    print_header "Stopping Development Environment"
    print_status "Stopping development containers..."
    docker-compose down
}

dev_logs() {
    print_header "Development Logs"
    docker-compose logs -f
}

dev_shell() {
    print_header "Accessing Development Container Shell"
    docker-compose exec app sh
}

# Production commands
prod_up() {
    print_header "Starting Production Environment"
    print_status "Building and starting production containers..."
    docker-compose -f docker-compose.prod.yml up --build -d
}

prod_down() {
    print_header "Stopping Production Environment"
    print_status "Stopping production containers..."
    docker-compose -f docker-compose.prod.yml down
}

prod_logs() {
    print_header "Production Logs"
    docker-compose -f docker-compose.prod.yml logs -f
}

prod_shell() {
    print_header "Accessing Production Container Shell"
    docker-compose -f docker-compose.prod.yml exec app sh
}

# Utility commands
clean() {
    print_header "Cleaning Docker Resources"
    print_warning "This will remove all stopped containers, unused networks, and dangling images"
    read -p "Are you sure? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        docker system prune -f
        print_status "Docker cleanup completed"
    else
        print_status "Cleanup cancelled"
    fi
}

clean_all() {
    print_header "Deep Cleaning Docker Resources"
    print_warning "This will remove ALL Docker resources including images, containers, and volumes"
    read -p "Are you sure? This cannot be undone! (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        docker system prune -a -f --volumes
        print_status "Deep cleanup completed"
    else
        print_status "Deep cleanup cancelled"
    fi
}

status() {
    print_header "Docker Status"
    echo "Development containers:"
    docker-compose ps
    echo
    echo "Production containers:"
    docker-compose -f docker-compose.prod.yml ps
    echo
    echo "Docker system info:"
    docker system df
}

build_dev() {
    print_header "Building Development Image"
    docker build -f Dockerfile.dev -t 4ami-dev .
    print_status "Development image built successfully"
}

build_prod() {
    print_header "Building Production Image"
    docker build -t 4ami-prod .
    print_status "Production image built successfully"
}

# Help function
show_help() {
    print_header "Docker Management Scripts"
    echo "Usage: $0 [COMMAND]"
    echo
    echo "Development Commands:"
    echo "  dev-up      Start development environment"
    echo "  dev-down    Stop development environment"
    echo "  dev-logs    Show development logs"
    echo "  dev-shell   Access development container shell"
    echo
    echo "Production Commands:"
    echo "  prod-up     Start production environment"
    echo "  prod-down   Stop production environment"
    echo "  prod-logs   Show production logs"
    echo "  prod-shell  Access production container shell"
    echo
    echo "Build Commands:"
    echo "  build-dev   Build development image only"
    echo "  build-prod  Build production image only"
    echo
    echo "Utility Commands:"
    echo "  status      Show Docker status"
    echo "  clean       Clean unused Docker resources"
    echo "  clean-all   Deep clean all Docker resources"
    echo "  help        Show this help message"
    echo
    echo "Examples:"
    echo "  $0 dev-up     # Start development"
    echo "  $0 prod-up    # Start production"
    echo "  $0 status     # Check status"
}

# Main script logic
case "$1" in
    "dev-up")
        dev_up
        ;;
    "dev-down")
        dev_down
        ;;
    "dev-logs")
        dev_logs
        ;;
    "dev-shell")
        dev_shell
        ;;
    "prod-up")
        prod_up
        ;;
    "prod-down")
        prod_down
        ;;
    "prod-logs")
        prod_logs
        ;;
    "prod-shell")
        prod_shell
        ;;
    "build-dev")
        build_dev
        ;;
    "build-prod")
        build_prod
        ;;
    "status")
        status
        ;;
    "clean")
        clean
        ;;
    "clean-all")
        clean_all
        ;;
    "help"|"--help"|"-h"|"")
        show_help
        ;;
    *)
        print_error "Unknown command: $1"
        echo
        show_help
        exit 1
        ;;
esac
