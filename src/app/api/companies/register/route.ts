import { NextRequest, NextResponse } from 'next/server';
import { getApiUrl, getAuthHeaders } from '@/lib/config';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Get the authorization header from the incoming request
    const authHeader = request.headers.get('authorization');
    
    console.log('Forwarding company registration request with auth header:', authHeader ? 'Present' : 'Not present');
    console.log('Company registration data:', body);
    
    // Forward the request to the external API
    const response = await fetch(getApiUrl('/api/v1/companies/register'), {
      method: 'POST',
      headers: getAuthHeaders(authHeader || undefined),
      body: JSON.stringify(body),
    });

    const data = await response.json();
    
    console.log('External API response:', { status: response.status, data });
    
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Company registration proxy error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
