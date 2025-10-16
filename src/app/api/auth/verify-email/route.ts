import { NextRequest, NextResponse } from 'next/server';
import { getApiUrl, getAuthHeaders } from '@/lib/config';

// Fix Next.js export configuration
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    
    if (!token) {
      return NextResponse.json(
        { message: 'Token is required' },
        { status: 400 }
      );
    }

    console.log('Fetching verification data for token:', token);
    const externalUrl = `${getApiUrl('/auth/verify-email')}/${token}`;
    console.log('External API URL:', externalUrl);

    // Forward the request to the external API
    const response = await fetch(externalUrl, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    // console.log('External API response status:', response);
    // console.log('External API response headers:', Object.fromEntries(response.headers.entries()));
      console.log(response)

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const textResponse = await response.text();
      console.log('Non-JSON response from external API:', textResponse);
      return NextResponse.json(
        { message: 'Invalid response format from verification service' },
        { status: 500 }
      );
    }

    let data;
    try {
      data = await response.json();
      console.log('External API response data:', data);
    } catch (jsonError) {
      console.error('Error parsing JSON response:', jsonError);
      return NextResponse.json(
        { message: 'Invalid JSON response from verification service' },
        { status: 500 }
      );
    }
    
    // Handle different response statuses
    if (response.status === 400) {
      return NextResponse.json(
        { message: data.message || 'Invalid verification token' },
        { status: 400 }
      );
    }
    
    if (response.status === 404) {
      return NextResponse.json(
        { message: 'Verification token not found' },
        { status: 404 }
      );
    }
    
    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || 'Verification failed' },
        { status: response.status }
      );
    }
    
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Email verification proxy error:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
