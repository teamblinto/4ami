import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Get the authorization header from the incoming request
    const authHeader = request.headers.get('authorization');
    
    // Prepare headers for the external API
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    // Add authorization header if present
    if (authHeader) {
      headers['Authorization'] = authHeader;
    }
    
    console.log('Forwarding invitation request with headers:', headers);
    
    // Forward the request to the external API
    const response = await fetch('https://870556b6f0ea.ngrok-free.app/api/v1/users/invite', {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    const data = await response.json();
    
    console.log('External API response:', { status: response.status, data });
    
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('User invitation proxy error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
