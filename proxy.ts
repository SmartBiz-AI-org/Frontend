import { NextResponse, type NextRequest } from "next/server";

export default async function proxy(request: NextRequest) {
    // Build the fully qualified URL to the local auth API
    const authUrl = new URL("/api/auth/get-session", request.nextUrl.origin);

    // Fetch the session from the Better-Auth API
    const response = await fetch(authUrl.toString(), {
        headers: {
            cookie: request.headers.get("cookie") || "",
        },
    });

    let sessionData = null;
    if (response.ok) {
        sessionData = await response.json().catch(() => null);
    }

    const session = sessionData?.session;
    const user = sessionData?.user;

    const isDashboard = request.nextUrl.pathname.startsWith("/dashboard");
    const isOnboarding = request.nextUrl.pathname.startsWith("/onboarding");

    // 1. Enforce Dashboard Protection
    if (isDashboard) {
        if (!session) {
            // Not logged in -> Go to login
            return NextResponse.redirect(new URL("/login", request.url));
        }
        if (!user?.onboardingCompleted) {
            // Logged in, but onboarding incomplete -> Go to /onboarding
            return NextResponse.redirect(new URL("/onboarding", request.url));
        }
    }

    // 2. Prevent returning to Onboarding once completed
    if (isOnboarding) {
        if (!session) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
        if (user?.onboardingCompleted) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/onboarding/:path*"],
};
