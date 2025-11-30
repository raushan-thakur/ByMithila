# 🛍️ ByMithila - Full Stack E-Commerce Platform

A modern, full-featured e-commerce platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js). ByMithila provides a complete shopping experience with user authentication, product management, shopping cart, payment processing, and order management.

**Live Link:** https://by-mithila.vercel.app/

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [API Endpoints](#-api-endpoints)
- [Environment Variables](#-environment-variables)
- [Scripts](#-scripts)
- [Deployment](#-deployment)
- [Authors](#-authors)

---

## ✨ Features

### 👤 User Features

- **User Authentication**
  - User registration with validation
  - Secure login with JWT tokens
  - Password reset via security question
  - Profile management (update name, email, password, address, phone)
- **Product Browsing**
  - Browse all products with pagination
  - View product details with images and descriptions
  - Search products by name or description
  - Filter products by category and price range
  - View related products
  - Category-based product listing
- **Shopping Cart**
  - Add/remove items from cart
  - Update item quantities
  - Real-time price calculations
  - Persistent cart state
- **Checkout & Payments**
  - Secure checkout process
  - Braintree payment gateway integration
  - Order placement and confirmation
- **Order Management**
  - View order history
  - Track order status
  - Order details with product information

### 🔐 Admin Features

- **Product Management**
  - Create, update, and delete products
  - Upload product images
  - Manage product categories, prices, and inventory
- **Category Management**
  - Create, update, and delete categories
  - Organize products by categories
- **Order Management**
  - View all orders
  - Update order status (Not Process, Processing, Shipped, Delivered, Cancel)
  - Track customer orders

---

## 🛠 Tech Stack

### Backend

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcrypt/bcryptjs
- **File Upload:** express-formidable
- **Payment Gateway:** Braintree
- **Utilities:** slugify, morgan, cors, dotenv

### Frontend

- **Framework:** React.js 18
- **Routing:** React Router DOM v6
- **State Management:** React Context API
- **HTTP Client:** Axios
- **UI Library:** Ant Design (antd)
- **Icons:** react-icons
- **Notifications:** react-toastify
- **Payment:** braintree-web-drop-in-react
- **Date Handling:** moment.js
- **Meta Tags:** react-helmet

---

## 📁 Project Structure

```
ByMithila/
├── client/                 # React frontend application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   │   ├── Form/      # Form components
│   │   │   ├── Layout/    # Layout components (Header, Footer, etc.)
│   │   │   └── Routes/    # Route protection components
│   │   ├── context/       # React Context (auth, cart, search)
│   │   ├── hooks/         # Custom React hooks
│   │   ├── pages/         # Page components
│   │   │   ├── Admin/     # Admin dashboard pages
│   │   │   ├── Auth/      # Authentication pages
│   │   │   └── user/      # User dashboard pages
│   │   └── styles/         # CSS stylesheets
│   └── package.json
│
├── config/                # Configuration files
│   └── db.js             # MongoDB connection
│
├── controllers/           # Route controllers
│   ├── authController.js      # Authentication logic
│   ├── categoryController.js  # Category CRUD operations
│   └── productController.js   # Product CRUD & payment logic
│
├── helpers/               # Helper functions
│   └── authHelper.js      # Password hashing utilities
│
├── middlewares/           # Express middlewares
│   └── authMiddleware.js  # JWT authentication & admin check
│
├── models/                # Mongoose schemas
│   ├── userModels.js      # User schema
│   ├── productModels.js   # Product schema
│   ├── categoryModels.js  # Category schema
│   └── orderModel.js      # Order schema
│
├── routes/                # API routes
│   ├── authRoute.js       # Authentication routes
│   ├── categoryRoutes.js  # Category routes
│   └── productsRoutes.js  # Product routes
│
├── server.js              # Express server entry point
└── package.json           # Backend dependencies
```

---

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ByMithila
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```env
   MONGO_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   BRAINTREE_MERCHANT_ID=your_braintree_merchant_id
   BRAINTREE_PUBLIC_KEY=your_braintree_public_key
   BRAINTREE_PRIVATE_KEY=your_braintree_private_key
   PORT=8080
   DEV_MOD=development
   ```

4. **Start the backend server**
   ```bash
   npm run server
   ```

### Frontend Setup

1. **Navigate to client directory**

   ```bash
   cd client
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

### Run Both (Development)

From the root directory:

```bash
npm run dev
```

---

## 🔌 API Endpoints

### Authentication Routes (`/api/v1/auth`)

| Method | Endpoint                 | Description                 | Auth Required |
| ------ | ------------------------ | --------------------------- | ------------- |
| POST   | `/register`              | Register a new user         | No            |
| POST   | `/login`                 | User login                  | No            |
| POST   | `/forgot-password`       | Reset password              | No            |
| GET    | `/user-auth`             | Verify user authentication  | Yes           |
| GET    | `/admin-auth`            | Verify admin authentication | Yes (Admin)   |
| PUT    | `/profile`               | Update user profile         | Yes           |
| GET    | `/orders`                | Get user orders             | Yes           |
| GET    | `/all-orders`            | Get all orders (admin)      | Yes (Admin)   |
| PUT    | `/order-status/:orderId` | Update order status         | Yes (Admin)   |

### Category Routes (`/api/v1/category`)

| Method | Endpoint                 | Description           | Auth Required |
| ------ | ------------------------ | --------------------- | ------------- |
| POST   | `/create-category`       | Create a new category | Yes (Admin)   |
| PUT    | `/update-category/:id`   | Update category       | Yes (Admin)   |
| GET    | `/get-category`          | Get all categories    | No            |
| GET    | `/single-category/:slug` | Get single category   | No            |
| DELETE | `/delete-category/:id`   | Delete category       | Yes (Admin)   |

### Product Routes (`/api/v1/product`)

| Method | Endpoint                     | Description              | Auth Required |
| ------ | ---------------------------- | ------------------------ | ------------- |
| POST   | `/create-product`            | Create a new product     | Yes (Admin)   |
| GET    | `/get-product`               | Get all products         | No            |
| GET    | `/get-product/:slug`         | Get single product       | No            |
| GET    | `/product-photo/:pid`        | Get product image        | No            |
| PUT    | `/update-product/:pid`       | Update product           | Yes (Admin)   |
| DELETE | `/delete-product/:pid`       | Delete product           | Yes (Admin)   |
| POST   | `/product-filters`           | Filter products          | No            |
| GET    | `/product-count`             | Get product count        | No            |
| GET    | `/product-list/:page`        | Get paginated products   | No            |
| GET    | `/search/:keyword`           | Search products          | No            |
| GET    | `/related-product/:pid/:cid` | Get related products     | No            |
| GET    | `/product-category/:slug`    | Get products by category | No            |
| GET    | `/braintree/token`           | Get payment token        | No            |
| POST   | `/braintree/payment`         | Process payment          | Yes           |

---

## 🔐 Environment Variables

### Required Variables

```env
# Database
MONGO_URL=mongodb://localhost:27017/bymithila
# or
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/bymithila

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here

# Braintree Payment Gateway
BRAINTREE_MERCHANT_ID=your_merchant_id
BRAINTREE_PUBLIC_KEY=your_public_key
BRAINTREE_PRIVATE_KEY=your_private_key

# Server
PORT=8080
DEV_MOD=development
```

---

## 📜 Scripts

### Backend Scripts

- `npm start` - Start the production server
- `npm run server` - Start the development server with nodemon
- `npm run client` - Start the React development server
- `npm run dev` - Run both backend and frontend concurrently

### Frontend Scripts (in `client/` directory)

- `npm start` - Start the React development server
- `npm run build` - Build for production
- `npm test` - Run tests

---

## 🚢 Deployment

The application is deployed on Vercel. The backend and frontend are configured to work together in a single deployment.

### Deployment Steps

1. Build the React frontend: `cd client && npm run build`
2. Deploy to Vercel (or your preferred platform)
3. Ensure environment variables are set in your deployment platform
4. Configure MongoDB Atlas connection string
5. Set up Braintree sandbox/production credentials

---

## 👥 Authors

- **Raushan Thakur**

---

## 📝 License

This project is licensed under the MIT License.

---

## 🎯 Key Features Summary

✅ JWT-based authentication  
✅ Role-based access control (User/Admin)  
✅ Product CRUD operations  
✅ Category management  
✅ Shopping cart functionality  
✅ Payment integration (Braintree)  
✅ Order management system  
✅ Product search and filtering  
✅ Image upload and storage  
✅ Responsive design  
✅ Secure password hashing

---

## 📞 Support

For issues, questions, or contributions, please open an issue in the repository.

---

**Built with ❤️ using the MERN Stack**
