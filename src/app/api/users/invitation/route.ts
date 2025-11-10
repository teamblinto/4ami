import { NextRequest, NextResponse } from 'next/server';
import { getApiUrl, getAuthHeaders } from '@/lib/config';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const invitationCode = searchParams.get('invitationCode');

    if (!invitationCode) {
      return NextResponse.json(
        { message: 'Invitation code is required' },
        { status: 400 }
      );
    }

    const authHeader = request.headers.get('authorization') || '';

    const response = await fetch(
      getApiUrl(`/users/invitation?invitationCode=${encodeURIComponent(invitationCode)}`),
      {
        method: 'GET',
        headers: getAuthHeaders(authHeader),
      }
    );

    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');
    const data = isJson ? await response.json() : { message: await response.text() };

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Invitation proxy error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

