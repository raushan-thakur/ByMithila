# 🛍️ ByMithila – Frontend

Modern React-based E-Commerce Frontend Application

**Live Link:** https://by-mithila.vercel.app/

---

## ✨ Features

### User Features

- JWT-based authentication (login, register, password reset)
- Product browsing with search, filters, and categories
- Shopping cart with persistent state
- Braintree payment integration
- User dashboard (profile, orders)

### Admin Features

- Product & category management (CRUD)
- Order management with status updates
- User management dashboard

### UI/UX

- Fully responsive design
- Ant Design components
- Toast notifications
- Loading states & error handling

---

## ⚙️ Tech Stack

- **React.js** (v18.2.0) - UI Framework
- **React Router DOM** (v6.21.1) - Routing
- **React Context API** - State Management
- **Axios** (v1.6.5) - HTTP Client
- **Ant Design** (v5.14.0) - UI Components
- **Braintree Web Drop-in** - Payment Gateway
- **React Toastify** - Notifications
- **React Helmet** - SEO

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v14+)
- Backend API server running

### Installation

```bash
cd client
npm install
```

### Environment Setup

Create `.env` file:

```env
REACT_APP_API=http://localhost:8080
```

### Run Development Server

```bash
npm start
```

App runs at `http://localhost:3000`

---

## 📜 Scripts

- `npm start` - Development server
- `npm run build` - Production build
- `npm test` - Run tests

---

## 📁 Project Structure

```
src/
├── components/     # Reusable components (Layout, Form, Routes)
├── context/        # React Context (auth, cart, search)
├── hooks/          # Custom hooks
├── pages/          # Page components (Admin, Auth, user)
└── styles/         # CSS stylesheets
```

---

## 🔄 State Management

Uses React Context API for global state:

- **Auth Context** - User authentication & JWT token
- **Cart Context** - Shopping cart state (persisted in localStorage)
- **Search Context** - Search keyword & results

---

## 🛣️ Key Routes

**Public:** `/`, `/product/:slug`, `/categories`, `/cart`, `/search`, `/login`, `/register`

**User:** `/dashboard/user`, `/dashboard/user/orders`, `/dashboard/user/profile`

**Admin:** `/dashboard/admin/*` (products, categories, orders, users)

---

## 🔌 API Integration

All API calls use `REACT_APP_API` environment variable:

```javascript
axios.get(`${process.env.REACT_APP_API}/api/v1/...`);
```

JWT token automatically added to requests via auth context.

---

## 📦 Build & Deployment

```bash
npm run build
```

Deploy the `build/` folder to your hosting service. Update `REACT_APP_API` for production.

---

## 👥 Authors

**Raushan Thakur**

---

**Built with ❤️ using React.js**
