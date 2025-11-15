import { NextRequest, NextResponse } from "next/server";
import { getApiUrl, getAuthHeaders } from "@/lib/config";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization") || "";

    const response = await fetch(getApiUrl("/models"), {
      method: "GET",
      headers: getAuthHeaders(authHeader),
    });

    const contentType = response.headers.get("content-type");
    const isJson = contentType && contentType.includes("application/json");
    const data = isJson
      ? await response.json()
      : { message: await response.text() };

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Models proxy error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization") || "";
    const body = await request.json();

    const response = await fetch(getApiUrl("/models"), {
      method: "POST",
      headers: getAuthHeaders(authHeader),
      body: JSON.stringify(body),
    });

    const contentType = response.headers.get("content-type");
    const isJson = contentType && contentType.includes("application/json");
    const data = isJson
      ? await response.json()
      : { message: await response.text() };

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Models POST proxy error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
