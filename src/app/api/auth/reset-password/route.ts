import { NextRequest, NextResponse } from 'next/server';
import { getApiUrl, getAuthHeaders } from '@/lib/config';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log('Attempting password reset with token');
    
    const response = await fetch(getApiUrl('/auth/reset-password'), {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(body),
    });

    console.log('External API response status:', response.status);

    const data = await response.json();
    console.log('External API response data:', data);

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

