import crypto from "crypto";

/**
 * Interswitch Helper Functions for Security Headers
 */

const clientId = process.env.INTERSWITCH_CLIENT_ID;
const clientSecret = process.env.INTERSWITCH_CLIENT_SECRET;

/**
 * Generates the InterswitchAuth security headers required for many Interswitch APIs.
 * This includes Timestamp, Nonce, Signature, and Authorization.
 */
export function getInterswitchAuthHeaders(method: string, url: string) {
    if (!clientId || !clientSecret) {
        throw new Error("Interswitch credentials not found");
    }
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const nonce = crypto.randomBytes(16).toString("hex");
    const signatureData = `${method.toUpperCase()}&${encodeURIComponent(url)}&${timestamp}&${nonce}&${clientId}&${clientSecret}`;
    const signature = crypto.createHash("sha512").update(signatureData).digest("base64");
    const authHeaderValue = `InterswitchAuth ${Buffer.from(clientId).toString("base64")}`;

    console.log("[PAYMENT] Generated InterswitchAuth headers for:", url);

    return {
        "Authorization": authHeaderValue,
        "Timestamp": timestamp,
        "Nonce": nonce,
        "Signature": signature,
        "SignatureMethod": "SHA512",
    };
}