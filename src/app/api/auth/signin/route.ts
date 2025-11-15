import { NextRequest, NextResponse } from "next/server";
import { getApiUrl, getAuthHeaders } from "@/lib/config";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log("Attempting external API login for:", body.email);

    const response = await fetch(getApiUrl("/auth/signin"), {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(body),
    });

    console.log("External API response status:", response.status);
    console.log(
      "External API response headers:",
      Object.fromEntries(response.headers.entries()),
    );

    const data = await response.json();
    console.log("External API response data:", data);

    // Forward Set-Cookie (if backend issues a session cookie) so browser stores it on our domain
    const setCookie = response.headers.get("set-cookie");
    const nextResponse = NextResponse.json(data, { status: response.status });
    if (setCookie) {
      nextResponse.headers.set("Set-Cookie", setCookie);
    }
    return nextResponse;
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
