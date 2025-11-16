# AWS Amplify Deployment Checklist

## Current Issues to Resolve

### 1. Environment Variables (Required)
Add these in AWS Amplify Console → Environment Variables:

```
NEXT_PUBLIC_API_BASE_URL=https://ami-backend-alb-1784045037.us-east-1.elb.amazonaws.com/api/v1
```

**How to add:**
1. Go to AWS Amplify Console
2. Select your app → main-prod branch
3. Click "Environment variables" in left sidebar
4. Click "Add variable"
5. Add the variable above
6. Save and redeploy

### 2. IAM Role Permissions
The build is showing an IAM role error. Check:

**Amplify Service Role Requirements:**
- Go to AWS Amplify Console → App Settings → General
- Check the "Service role" section
- The role needs these permissions:
  - `amplify:*` (Amplify full access)
  - `logs:CreateLogGroup`, `logs:CreateLogStream`, `logs:PutLogEvents` (CloudWatch Logs)
  - Any other service permissions your build needs

**Fix IAM Role:**
1. Go to IAM Console → Roles
2. Find the role used by Amplify (shown in App Settings)
3. Ensure it has `AmplifyBackendDeployFullAccess` policy
4. Check Trust Relationship includes:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "amplify.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

### 3. Backend HTTPS Support
Verify your ALB supports HTTPS:

**Check ALB Configuration:**
1. Go to EC2 Console → Load Balancers
2. Find: `ami-backend-alb-1784045037`
3. Check Listeners tab
4. Verify there's an HTTPS:443 listener with valid SSL certificate

**If no HTTPS listener:**
- You need to add SSL certificate from ACM (AWS Certificate Manager)
- Or temporarily use HTTP (not recommended for production)

### 4. CORS Configuration
If using HTTPS backend, ensure backend CORS allows your Amplify domain:
- `https://main-prod.d3olqsph6lodsn.amplifyapp.com`
- Or use wildcard for Amplify: `https://*.amplifyapp.com`

## After Fixing Issues

1. Save all changes in AWS Console
2. In Amplify Console, click "Redeploy this version"
3. Monitor the build logs for success
4. Test login at: https://main-prod.d3olqsph6lodsn.amplifyapp.com

## Current Status
- ✅ Code updated to use HTTPS
- ✅ Changes pushed to GitHub
- ⏳ Deployment in progress
- ❌ IAM Role needs configuration
- ❓ Environment variables need verification
- ❓ Backend HTTPS support needs verification
