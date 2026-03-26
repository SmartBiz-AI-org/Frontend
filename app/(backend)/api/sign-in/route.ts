import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { emailAddress, password } = body;

    if (!emailAddress || !password) {
      return NextResponse.json(
        { error: "Email address and password are required." },
        { status: 400 }
      );
    }

    const response = await auth.api.signInEmail({
      body: {
        email: emailAddress,
        password,
        rememberMe: true,
      },
      headers: request.headers,
      asResponse: true,
    });

    return response;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Sign-in failed. Please check your credentials.";
    return NextResponse.json({ error: message }, { status: 401 });
  }
}
