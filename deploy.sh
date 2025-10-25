#!/bin/bash

# AWS Elastic Beanstalk Deployment Script
# Make sure you have AWS CLI configured with your credentials

echo "🚀 Starting deployment to AWS Elastic Beanstalk..."

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI is not installed. Please install it first."
    exit 1
fi

# Check if EB CLI is installed
if ! command -v eb &> /dev/null; then
    echo "❌ EB CLI is not installed. Please install it first."
    echo "Run: pip install awsebcli"
    exit 1
fi

# Initialize EB application if not already done
if [ ! -f ".elasticbeanstalk/config.yml" ]; then
    echo "📝 Initializing Elastic Beanstalk application..."
    eb init 4ami-frontend --platform node.js --region us-east-1
fi

# Create environment if it doesn't exist
echo "🌍 Creating/updating environment..."
eb create 4ami-prod --instance-type t3.small --platform-version "Node.js 18" --region us-east-1

# Deploy the application
echo "📦 Deploying application..."
eb deploy

echo "✅ Deployment complete!"
echo "🌐 Your application should be available at:"
eb status
