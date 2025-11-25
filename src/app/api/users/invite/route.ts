import { NextRequest, NextResponse } from "next/server";
import { getApiUrl, getAuthHeaders } from "@/lib/config";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Get the authorization header from the incoming request
    const authHeader = request.headers.get("authorization");

    // Forward the request to the external API
    const response = await fetch(getApiUrl("/users/invite"), {
      method: "POST",
      headers: getAuthHeaders(authHeader || undefined),
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("User invitation proxy error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
