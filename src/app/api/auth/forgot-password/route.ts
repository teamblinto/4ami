import { NextRequest, NextResponse } from "next/server";
import { getApiUrl, getAuthHeaders } from "@/lib/config";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log("Attempting forgot password request for:", body.email);

    const response = await fetch(getApiUrl("/auth/forgot-password"), {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(body),
    });

    console.log("External API response status:", response.status);

    const data = await response.json();
    console.log("External API response data:", data);

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
