import { NextRequest, NextResponse } from "next/server";
import { getApiUrl } from "@/lib/config";

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization") || "";

    // Check if the request is multipart/form-data
    const contentType = request.headers.get("content-type") || "";
    const isMultipart = contentType.includes("multipart/form-data");

    if (isMultipart) {
      // Handle multipart/form-data (for file uploads)
      const formData = await request.formData();

      // Prepare headers for forwarding to backend
      const headers: Record<string, string> = {};

      // Don't set Content-Type - let fetch set it automatically with boundary
      if (authHeader) {
        headers["Authorization"] = authHeader.startsWith("Bearer ")
          ? authHeader
          : `Bearer ${authHeader}`;
      }

      // Only include ngrok header when targeting an ngrok URL
      const apiBaseUrl =
        process.env.NEXT_PUBLIC_API_BASE_URL ||
        "http://ami-backend-alb-1784045037.us-east-1.elb.amazonaws.com/api/v1";
      if (apiBaseUrl.includes("ngrok")) {
        headers["ngrok-skip-browser-warning"] = "true";
      }

      // Forward the FormData to the backend API
      const response = await fetch(getApiUrl("/projects"), {
        method: "POST",
        headers,
        body: formData,
      });

      const responseContentType = response.headers.get("content-type");
      const isJson =
        responseContentType && responseContentType.includes("application/json");
      const data = isJson
        ? await response.json()
        : { message: await response.text() };

      return NextResponse.json(data, { status: response.status });
    } else {
      // Handle JSON requests (fallback for other endpoints)
      const body = await request.json();

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (authHeader) {
        headers["Authorization"] = authHeader.startsWith("Bearer ")
          ? authHeader
          : `Bearer ${authHeader}`;
      }

      const apiBaseUrl =
        process.env.NEXT_PUBLIC_API_BASE_URL ||
        "http://ami-backend-alb-1784045037.us-east-1.elb.amazonaws.com/api/v1";
      if (apiBaseUrl.includes("ngrok")) {
        headers["ngrok-skip-browser-warning"] = "true";
      }

      const response = await fetch(getApiUrl("/projects"), {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });

      const responseContentType = response.headers.get("content-type");
      const isJson =
        responseContentType && responseContentType.includes("application/json");
      const data = isJson
        ? await response.json()
        : { message: await response.text() };

      return NextResponse.json(data, { status: response.status });
    }
  } catch (error: unknown) {
    console.error("Projects proxy error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error("Error details:", errorMessage, errorStack);
    return NextResponse.json(
      {
        message: "Internal server error",
        error: errorMessage,
      },
      { status: 500 },
    );
  }
}
