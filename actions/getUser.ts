"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

/**
 * Server action to retrieve the logged-in user details.
 * Can be called from Server Components or Client Components.
 */
export async function getUser() {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });
        
        return session?.user || null;
    } catch (error) {
        console.error("Error retrieving user session:", error);
        return null;
    }
}
