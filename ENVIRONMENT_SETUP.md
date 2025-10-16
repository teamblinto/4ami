# Environment Configuration Setup

## How to Configure Your Backend API URL

### Step 1: Create Environment File

Create a file named `.env.local` in your project root directory with the following content:

```env
# Backend API Configuration
NEXT_PUBLIC_API_BASE_URL=https://870556b6f0ea.ngrok-free.app
API_BASE_URL=https://870556b6f0ea.ngrok-free.app
```

### Step 2: Update Your API URL

When your ngrok URL changes, simply update the URLs in `.env.local`:

```env
# Example: New ngrok URL
NEXT_PUBLIC_API_BASE_URL=https://new-ngrok-url.ngrok-free.app
API_BASE_URL=https://new-ngrok-url.ngrok-free.app
```

### Step 3: Restart Your Development Server

After updating the `.env.local` file, restart your Next.js development server:

```bash
npm run dev
# or
yarn dev
```

## How It Works

1. **Configuration File**: `src/lib/config.ts` contains all API configuration
2. **Environment Variables**: The app reads from `.env.local` file
3. **Centralized Management**: All API routes use the same configuration
4. **Easy Updates**: Change URL in one place, applies everywhere

## Files That Use This Configuration

- `src/app/api/auth/signin/route.ts`
- `src/app/api/auth/customer-admin-signup/route.ts`
- `src/app/api/verify-email/route.ts`
- `src/app/api/users/invite/route.ts`

## Benefits

- ✅ **Single Source of Truth**: Update URL in one place
- ✅ **Environment-Specific**: Different URLs for dev/staging/production
- ✅ **Secure**: Environment variables are not committed to git
- ✅ **Easy Maintenance**: No need to search and replace across files
