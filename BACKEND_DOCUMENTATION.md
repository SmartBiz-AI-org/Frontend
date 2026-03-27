# SmartBiz AI Backend Documentation

This document provides technical details for the **SmartBiz AI backend**, covering the AI engine, payment processing, database schema, and server actions.

## AI Sales Agent (Claude Tool Use)

The AI assistant uses **Anthropic Claude (Haiku-4-5)** to interact with customers. It is equipped with tools to browse products and initiate purchases.

### Core AI Tools
- `get_products`: Lists all active products for the specific SME.
- `search_products`: Searches for products by name or description.
- `create_invoice_request`: Generates a real invoice and returns a secure payment URL.
    - **Schema**: Requires `customerName`, `customerEmail`, and `items` (array of `{ description, quantity, rate }`).

## Payment & Invoicing Flow

SmartBiz AI integrates with **Interswitch** for secure web-redirect payments.

### The Payment Lifecycle
1. **Initiation**: The AI (or SME via dashboard) triggers `create_invoice_request`.
2. **Redirect**: The customer visits `/pay/[invoiceId]`, which generates Interswitch parameters and auto-submits to the gateway.
3. **Verification**: Interswitch redirects back to `/api/payment/verify`. 
4. **Completion**:
    - **Success**: Customer redirected to `/store/[slug]/success`.
    - **Failure/Cancel**: Customer redirected back to the store with an error modal.
5. **Invoicing**: A PDF is generated and sent via **SendGrid** (Email) and **Twilio** (WhatsApp).

## Database Schema (Prisma)

| Model | Description | Key Fields |
|-------|-------------|------------|
| `Sme` | Business profile | `slug`, `businessName`, `aiTone`, `whatsapp` |
| `Product` | Product catalog | `name`, `price`, `stock`, `status` |
| `Invoice` | Billing records | `invoiceNumber`, `totalAmount`, `items (JSON)`, `status` |
| `Transaction` | Payment history | `paymentRef`, `status`, `invoiceId` |
| `ChatSession` | Persistence | `customerEmail`, `messages (JSON)` |

## Server Actions Reference

| Action | File | Usage |
|--------|------|-------|
| `sendPublicChatMessage` | `publicChatActions.ts` | Customer storefront chat logic |
| `createPublicInvoice` | `publicInvoiceActions.ts` | Server-side invoice instantiation |
| `getPublicPaymentParams`| `paymentActions.ts` | Public payment parameter generation |
| `getSme` / `updateSme` | `smeActions.ts` | SME profile management |
| `getProducts` | `productActions.ts` | Dashboard product management |

## 🛠️ Third-Party Integrations
- **Payments**: Interswitch Web Redirect.
- **AI**: Anthropic Claude SDK.
- **WhatsApp**: Twilio Sandbox API.
- **Email**: SendGrid / Resend.

---