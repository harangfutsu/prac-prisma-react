# ContactManager

A modern, responsive contact management web application built with **Preact**, **React Router v7**, **Zustand**, and **Tailwind CSS v4**.

---

## ✨ Features

- 🔐 **Authentication** — Register & Login with JWT-based sessions
- 📋 **Contact List** — View all contacts with search and sort (A–Z / Z–A)
- ➕ **Add Contact** — Create new contacts with name, email, phone, company, job title, and notes
- ✏️ **Edit Contact** — Update any existing contact details
- 🗑️ **Delete Contact** — Remove contacts with a confirmation prompt
- 📱 **Fully Responsive** — Optimized for both desktop and mobile
- 🎨 **Emerald Design System** — Consistent green-500 → emerald-600 → teal-700 palette throughout

---

## 🛠️ Tech Stack

| Layer | Library / Tool |
|---|---|
| UI Framework | [Preact](https://preactjs.com/) (React-compatible) |
| Routing | [React Router v7](https://reactrouter.com/) |
| State Management | [Zustand v5](https://github.com/pmndrs/zustand) |
| HTTP Client | [Axios](https://axios-http.com/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Build Tool | [Vite](https://vitejs.dev/) |

---

## 📁 Project Structure

```
src/
├── app.jsx              # Root router with layout nesting
├── main.jsx             # App entry point
├── index.css            # Global styles
│
├── pages/
│   ├── Login.jsx        # Sign-in page
│   ├── Register.jsx     # Sign-up page
│   ├── Contact.jsx      # Contact list page
│   └── Entry.jsx        # Add / Edit contact form
│
├── layouts/
│   ├── AuthLayout.jsx   # Wraps Login & Register routes
│   └── ContactLayout.jsx# Wraps Contact & Entry routes (auth guard)
│
├── hooks/
│   ├── useLogin.js      # Login form logic + navigation
│   └── useRegister.js   # Register form logic
│
├── store/
│   ├── userStore.js     # Auth state (currentUser, login, logout)
│   └── contactStore.js  # Contacts state (CRUD, filters, loading)
│
└── services/
    └── api/
        ├── axios.js     # Axios instance with base URL + interceptors
        ├── contact.js   # Contact API calls (GET, POST, PATCH, DELETE)
        └── user.js      # Auth API calls (login, register)
```

---

## 🚦 Routes

| Path | Page | Auth Required |
|---|---|---|
| `/` | → Redirects to `/login` | — |
| `/login` | Login | No |
| `/register` | Register | No |
| `/contact` | Contact List | ✅ Yes |
| `/contact/entry` | Add Contact | ✅ Yes |
| `/contact/update/:id` | Edit Contact | ✅ Yes |

---

## ⚙️ Getting Started

### Prerequisites
- Node.js ≥ 18
- A running backend API (see [Environment Variables](#environment-variables))

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd contact-manager-react

# Install dependencies
npm install
# or
yarn install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=http://localhost:3000
```

Replace the URL with your backend API base URL.

### Running Locally

```bash
npm run dev
```

App will be available at `http://localhost:5173`.

### Building for Production

```bash
npm run build
```

Output goes to the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

---

## 🔌 API Endpoints Used

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/user/login` | Login user |
| `POST` | `/user/register` | Register new user |
| `GET` | `/contact` | Get all contacts |
| `GET` | `/contact/:id` | Get contact by ID |
| `POST` | `/contact` | Create new contact |
| `PATCH` | `/contact/:id` | Update contact |
| `DELETE` | `/contact/:id` | Delete contact |

> Requests to `/contact` endpoints are automatically sent with a Bearer token from the auth store.

---

## 🎨 Design

All pages use a unified **green-500 → emerald-600 → teal-700** gradient palette:

- **Auth pages** (Login, Register) — Full gradient background with a glassmorphism white card
- **App pages** (Contact, Entry) — Light `gray-50` background with sticky gradient navbar and white cards

---

## 📄 License

MIT
