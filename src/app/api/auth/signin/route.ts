import { NextRequest, NextResponse } from 'next/server';
import { getApiUrl, getAuthHeaders } from '@/lib/config';

// Static credentials for user dashboard
const STATIC_CREDENTIALS = {
  email: 'user@4ami.com',
  password: 'Admin@123456',
  role: 'USER',
  firstName: 'John',
  lastName: 'Doe'
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Check static credentials first
    if (email === STATIC_CREDENTIALS.email && password === STATIC_CREDENTIALS.password) {
      return NextResponse.json({
        success: true,
        token: 'static-user-token-' + Date.now(),
        user: {
          id: 'static-user-1',
          email: STATIC_CREDENTIALS.email,
          role: STATIC_CREDENTIALS.role,
          firstName: STATIC_CREDENTIALS.firstName,
          lastName: STATIC_CREDENTIALS.lastName
        }
      }, { status: 200 });
    }

    // If not static credentials, try the original API
    const response = await fetch(getApiUrl('/api/v1/auth/signin'), {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(body),
    });

    const data = await response.json();
    
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
