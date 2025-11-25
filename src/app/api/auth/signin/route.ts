import { NextRequest, NextResponse } from "next/server";
import { getApiUrl, getAuthHeaders } from "@/lib/config";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const backendUrl = getApiUrl("/auth/signin");

    const response = await fetch(backendUrl, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(body),
    });

    const contentType = response.headers.get("content-type");
    let data;
    
    if (contentType?.includes("application/json")) {
      data = await response.json();
    } else {
      const text = await response.text();
      data = { message: text || "Invalid response from backend" };
    }

    // Forward Set-Cookie (if backend issues a session cookie) so browser stores it on our domain
    const setCookie = response.headers.get("set-cookie");
    const nextResponse = NextResponse.json(data, { status: response.status });
    if (setCookie) {
      nextResponse.headers.set("Set-Cookie", setCookie);
    }
    return nextResponse;
  } catch (error) {
    console.error("Signin proxy error:", error instanceof Error ? error.message : "Unknown error");
    
    return NextResponse.json(
      { 
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
        details: "Check server logs for more information"
      },
      { status: 500 },
    );
  }
}
