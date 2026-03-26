import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, emailAddress, password } = body;

    if (!fullName || !emailAddress || !password) {
      return NextResponse.json(
        { error: "Full name, email address, and password are required." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long." },
        { status: 400 }
      );
    }

    if (!/[a-z]/.test(password)) {
      return NextResponse.json(
        { error: "Password must include at least one lowercase letter." },
        { status: 400 }
      );
    }

    if (!/[A-Z]/.test(password)) {
      return NextResponse.json(
        { error: "Password must include at least one uppercase letter." },
        { status: 400 }
      );
    }

    if (!/\d/.test(password)) {
      return NextResponse.json(
        { error: "Password must include at least one number." },
        { status: 400 }
      );
    }

    if (!/[\W_]/.test(password)) {
      return NextResponse.json(
        { error: "Password must include at least one special character." },
        { status: 400 }
      );
    }

    const result = await auth.api.signUpEmail({
      body: {
        name: fullName,
        email: emailAddress,
        password,
      },
    });

    return NextResponse.json({ message: "Sign-up successful", token: result.token }, { status: 201 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Sign-up failed. Please try again.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
