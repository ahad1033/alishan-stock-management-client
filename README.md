# Alishan — Stock Management Web Application (Frontend)

Alishan is a modern, role-based stock management web application built with **React 19**, **Redux Toolkit**, **Tailwind CSS**, and **Vite**. This project serves as the frontend of a MERN stack solution, designed to streamline inventory control, invoice processing, expense tracking, and financial analytics in a structured and scalable way.

> ⚠️ This is the **frontend** codebase only. The backend (Express + MongoDB) is maintained separately.

---

## 🚀 Features Overview

### 👤 User Roles

- **Admin**
  - Create, update, and delete users (Admin, Stock Manager, Accountant)
  - Full access to all dashboard features
- **Stock Manager**
  - Manage product stock (add/deduct)
  - View product and stock-related data
- **Accountant**
  - Manage invoices, expenses, collections
  - Cannot access stock or employee management

### 📦 Products & Stock Management

- Add, edit, and delete products
- Add new stock entries by date
- Deduct stock using invoice number (confirmation required)
- View complete stock history

### 🧾 Invoice & Customer Management

- Create invoices with customer selection
- Download and print invoice as PDF format
- Auto-calculates total, due, and paid amounts
- Updates customer profile with:
  - Total Purchase
  - Total Paid
  - Total Due

### 👥 Employee Management

- Create, update, delete employees
- View employee salary history (if salary is issued via expenses)

### 💸 Expense & Cash Flow Tracking

- Categorized expense creation
- Tracks:
  - Total Revenue
  - Total Expense
  - Current Balance
- Salary category links expense to employee
- Full expense history view

### 💰 Collections

- Add collection against customer dues
- View collection history
- Automatically updates customer due and balance

### 📊 Analytics Dashboard

- Last 15 days revenue and sales trends
- Recent expense list
- Summary of:
  - Total Revenue
  - Total Expenses
  - Total Customers

---

## 🛠 Tech Stack

| Tech                  | Description                           |
| --------------------- | ------------------------------------- |
| **React 19**          | UI Framework                          |
| **Redux Toolkit**     | Global state management               |
| **React Router 7**    | Client-side routing                   |
| **Tailwind CSS v4**   | Utility-first CSS framework           |
| **ShadCN + Radix UI** | Accessible and styled components      |
| **React Hook Form**   | Form handling and validation          |
| **Yup**               | Schema-based form validation          |
| **Recharts**          | Visual data representation (charts)   |
| **Redux Persist**     | Persistent Redux state across reloads |
| **JWT Decode**        | Token decoding for auth               |
| **React Hot Toast**   | Notifications                         |
| **Date-fns**          | Date utilities                        |
| **Lodash**            | Utility functions                     |

---

## 📁 Project Structure

```bash
src/
│
├── components/        # Reusable UI components
├── redux/             # Redux slices (auth, product, stock, etc.)
├── hooks/             # Custom React hooks
├── layouts/           # Dashboard and page layouts
├── pages/             # Route-based pages
├── routes/            # Route definitions and role-based access
├── utils/             # Utility functions (auth, token, etc.)
└── App.jsx            # Main app component



## 📊 Dashboard Access control

| Feature / Role   | Admin | Stock Manager | Accountant |
| ---------------- | :---: | :-----------: | :--------: |
| Manage Users     |   ✔️  |       ❌     |      ❌    |
| View Products    |   ✔️  |       ✔️     |      ✔️    |
| Manage Stock     |   ✔️  |       ✔️     |      ❌    |
| Create Invoices  |   ✔️  |       ❌     |      ✔️    |
| Manage Expenses  |   ✔️  |       ❌     |      ✔️    |
| View Collections |   ✔️  |       ❌     |      ✔️    |
| Manage Employees |   ✔️  |       ❌     |      ❌    |
| Access Analytics |   ✔️  |       ❌     |      ❌    |


# Clone the frontend repository
git clone https://github.com/ahad1033/alishan-stock-management-client
cd alishan-frontend

# Install dependencies
yarn install

# Start development server
yarn dev
```
