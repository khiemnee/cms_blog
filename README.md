# CMS Blog API

A feature-rich Content Management System (CMS) API built with Node.js, TypeScript, PostgreSQL (via Prisma ORM), and Redis caching. It supports user authentication, role-based access control, post & comment management, and more.

## 🚀 Features

- ✅ User registration and login with hashed passwords
- 🔐 JWT-based authentication and route protection
- 🧑‍💼 Role-based access control (Admin, Editor, User)
- 📝 Full CRUD for Posts, Comments, Categories
- 🔍 Filtering, Searching, Sorting, and Pagination
- 📈 View counter per post (using Redis)
- ⚡ Redis Caching for better performance
- 🛠️ Built with TypeScript & Prisma ORM
- ☁️ Deployed on Render

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT (JSON Web Tokens), bcrypt
- **Caching**: Redis
- **Deployment**: Render
- **Testing**: Postman

## 📂 Project Structure

cms-blog-api/
├── src/
│ ├── controllers/
│ ├── middlewares/
│ ├── routes/
│ ├── services/
│ ├── utils/
│ └── index.ts
├── prisma/
│ └── schema.prisma
├── models/
│ └── prisma/ (Prisma client export)
├── .env
├── package.json
└── README.md

## 📦 Installation

```bash
# Clone repo
git clone https://github.com/khiemnee/cms-blog.git
cd cms-blog

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run migrations (if schema updated)
npx prisma migrate deploy

# Start server (in dev mode)
npm run dev
