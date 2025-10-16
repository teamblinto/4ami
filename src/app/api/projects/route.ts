import { NextRequest, NextResponse } from 'next/server';
import { getApiUrl, getAuthHeaders } from '@/lib/config';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const authHeader = request.headers.get('authorization') || '';

    const response = await fetch(getApiUrl('/projects'), {
      method: 'POST',
      headers: getAuthHeaders(authHeader),
      body: JSON.stringify(body),
    });

    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');
    const data = isJson ? await response.json() : { message: await response.text() };

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Projects proxy error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}


