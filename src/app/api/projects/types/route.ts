import { NextRequest, NextResponse } from 'next/server';
import { getApiUrl, getAuthHeaders } from '@/lib/config';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization') || '';

    const response = await fetch(getApiUrl('/projects/types'), {
      method: 'GET',
      headers: getAuthHeaders(authHeader),
    });

    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');
    const data = isJson ? await response.json() : { message: await response.text() };

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Project types proxy error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
