# SmartBiz AI - The AI-Powered Commerce Assistant

SmartBiz AI is a customizable, AI-driven platform that empowers Small and Medium Enterprises (SMEs) to deploy branded storefronts with intelligent sales agents. Customers can browse products, ask questions, and complete secure payments entirely within a natural chat conversation.

## 🚀 Key Features

- **🤖 AI Sales Agent**: Powered by Claude, this agent handles product discovery, tool-use for inventory, and automated invoicing.
- **📊 SME Dashboard**: A complete business command center for managing products, tracking revenue, and monitoring transactions.
- **💳 Secure Payments**: Seamless Interswitch Web Redirect integration for trusted, frictionless checkouts.
- **📄 Automated Invoicing**: Instant PDF generation and delivery via Email and Telegram.

## 📚 Documentation

For detailed technical guides, please refer to the specialized documentation:
- [Main Project Documentation](./project_documentations/SmartBiz_AI_Documentation.md)
- [Frontend Documentation](./project_documentations/FRONTEND_DOCUMENTATION.md)
- [Backend Documentation](./project_documentations/BACKEND_DOCUMENTATION.md)
- [UX/UI Documentation](./project_documentations/SmartBiz_UX_UI_Documentation.md)
- [Product PDF Overview](./project_documentations/SmartBI%20AI%20PDF.pdf)

- **[Frontend Documentation](./FRONTEND_DOCUMENTATION.md)**: UI architecture, routing, and component organization.
- **[Backend Documentation](./BACKEND_DOCUMENTATION.md)**: AI Tool Use, Payment Lifecycle, and Database Schema.


## 🛠️ Getting Started

### Prerequisites
- Node.js 20+
- Supabase Account (PostgreSQL)
- Anthropic API Key (Claude)
- Interswitch Sandbox Credentials

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd smartbiz-ai
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env` and fill in your credentials:
   ```bash
   cp .env.example .env
   ```

4. **Initialize the Database**:
   Push the Prisma schema to your Supabase instance:
   ```bash
   npx prisma db push
   ```

### Running Locally

```bash
# Start the Next.js development server
npm run dev

# Open the Prisma Studio (GUI for your database)
npm run db:studio
```

Open [http://localhost:3000](http://localhost:3000) to view the landing page.

---

