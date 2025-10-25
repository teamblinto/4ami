# AWS Amplify Configuration

## Environment Variables to Set in Amplify Console

```
NEXT_PUBLIC_API_URL=https://4ami-backend-prod.eba-5euwtfrt.us-east-1.elasticbeanstalk.com
NEXT_PUBLIC_FRONTEND_URL=https://your-app.amplifyapp.com
NODE_ENV=production
```

## Build Settings

- **Framework**: Next.js
- **Node.js version**: 18.x
- **Build command**: npm run build
- **Output directory**: .next

## Backend Integration

The frontend will connect to the existing backend at:
https://4ami-backend-prod.eba-5euwtfrt.us-east-1.elasticbeanstalk.com

All API calls will work exactly the same as before.
