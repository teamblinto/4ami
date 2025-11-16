import { NextRequest, NextResponse } from "next/server";
import { getApiUrl, getAuthHeaders } from "@/lib/config";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const backendUrl = getApiUrl("/auth/signin");

    console.log("=== API Proxy Debug ===");
    console.log("Backend URL:", backendUrl);
    console.log("Environment:", process.env.NODE_ENV);
    console.log("API Base URL from env:", process.env.NEXT_PUBLIC_API_BASE_URL);
    console.log("Login attempt for:", body.email);

    const response = await fetch(backendUrl, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(body),
    });

    console.log("Backend response status:", response.status);

    const contentType = response.headers.get("content-type");
    let data;
    
    if (contentType?.includes("application/json")) {
      data = await response.json();
    } else {
      const text = await response.text();
      console.log("Non-JSON response:", text);
      data = { message: text || "Invalid response from backend" };
    }

    console.log("Backend response data:", data);

    // Forward Set-Cookie (if backend issues a session cookie) so browser stores it on our domain
    const setCookie = response.headers.get("set-cookie");
    const nextResponse = NextResponse.json(data, { status: response.status });
    if (setCookie) {
      nextResponse.headers.set("Set-Cookie", setCookie);
    }
    return nextResponse;
  } catch (error) {
    console.error("=== Proxy Error ===");
    console.error("Error type:", error instanceof Error ? error.constructor.name : typeof error);
    console.error("Error message:", error instanceof Error ? error.message : String(error));
    console.error("Full error:", error);
    
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
