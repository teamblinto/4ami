import { NextRequest, NextResponse } from "next/server";
import { getApiUrl, getAuthHeaders } from "@/lib/config";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization") || "";
    const { searchParams } = new URL(request.url);
    
    // Forward query parameters (page, limit, etc.)
    const queryString = searchParams.toString();
    const endpoint = `/users${queryString ? `?${queryString}` : ''}`;

    console.log("=== Users GET Proxy ===");
    console.log("Endpoint:", endpoint);
    console.log("Auth header present:", !!authHeader);

    const response = await fetch(getApiUrl(endpoint), {
      method: "GET",
      headers: getAuthHeaders(authHeader),
    });

    console.log("Backend response status:", response.status);

    const contentType = response.headers.get("content-type");
    const isJson = contentType && contentType.includes("application/json");
    const data = isJson
      ? await response.json()
      : { message: await response.text() };

    console.log("Backend response data:", data);

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Users GET proxy error:", error);
    return NextResponse.json(
      { 
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const authHeader = request.headers.get("authorization");

    const response = await fetch(getApiUrl("/users"), {
      method: "POST",
      headers: getAuthHeaders(authHeader || undefined),
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Users proxy error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
