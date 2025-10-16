import { NextRequest, NextResponse } from 'next/server';
import { getApiUrl, getAuthHeaders } from '@/lib/config';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('Customer admin signup request:', body);

    // Forward the request to the external API
    const response = await fetch(getApiUrl('/auth/customer-admin-signup'), {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(body),
    });

    console.log('External API response status:', response.status);

    const data = await response.json();
    console.log('External API response data:', data);

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Customer admin signup proxy error:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
