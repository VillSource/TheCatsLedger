# TheCatsLedger Web (LINE Mini App)

A modern debt recording & bill-splitting LINE Mini App built with:
- **React 19 + TypeScript + Vite**
- **TanStack Query v5 + TanStack Router**
- **Kubb v5** (Automated typed client & query hooks generator from OpenAPI spec)
- **Tailwind CSS v4** + Modern mobile UI components (shadcn-inspired)
- **LINE LIFF SDK (`@line/liff`)** for authentication and `shareTargetPicker`

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
cd web
pnpm install
```

### 2. Environment Variables Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Update `.env` with your values:
- `VITE_LIFF_ID`: Your LINE LIFF ID from [LINE Developers Console](https://developers.line.biz/).
- `VITE_API_BASE_URL`: URL to your ASP.NET backend (default: `https://localhost:7216`).

*(Note: During local dev without a LIFF ID, the app automatically runs in local mock mode so you can test all screens and logic).*

### 3. Generate Typed Hooks via Kubb
Whenever `Villsource.TheCatsLedger/api.json` or the OpenAPI spec changes:
```bash
pnpm generate
```
This reads `../Villsource.TheCatsLedger/api.json` and outputs typed React Query hooks to `src/api/generated/`.

### 4. Run Development Server
```bash
pnpm dev
```
Open [http://localhost:5173](http://localhost:5173).

### 5. Build for Production / CI/CD
```bash
pnpm build
```

---

## 📱 Features & Routes

| Path | Screen | API Endpoint | Description |
|---|---|---|---|
| `/create-bill` | **Create Bill** | `POST /bills` | Form with emoji selection, name, amount & notes. On submit, triggers `liff.shareTargetPicker` to send a LINE Flex Message to debtor chats. |
| `/my-bills` | **My Bills** | `GET /bills` | Lists all bills created by the current user with total summary card. |
| `/bills-to-pay` | **Bills to Pay** | `GET /bills?billToPay=true` | Lists all bills shared with you by friends. Shows payment status badges. |
| `/bills/$billId` | **Bill Detail** | `GET /bills/{billId}` & `GET /payments/{userId}` | **Role-based view:**<br/>• **Owner:** Displays "Share Again to LINE Chat" (`shareTargetPicker`).<br/>• **Debtor:** Fetches and displays owner's payment method (PromptPay / Bank account number with copy button). |
| `/settings` | **Payment Settings** | `POST /payments` | Configure your default payment method (PromptPay, Bank name, account number, account holder name). |

---

## 🔐 Authentication
The app initializes the LINE LIFF SDK on launch, obtains the LINE ID Token via `liff.getIDToken()`, and attaches it automatically to all backend API requests via the `Authorization: Bearer <token>` header interceptor.
