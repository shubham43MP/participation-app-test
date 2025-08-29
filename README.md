# 🔋 Fullstack Challenge – Participation Form & Dashboard

This is a **fullstack web application** built as part of the coding challenge.  
It includes a **Next.js** and a **Node.js + Prisma backend** with a PostgreSQL database.

The app provides a form to collect participation data, displays the data in a table with percentage calculations, and visualizes it using charts.

---

## 🖥️ Tech Stack

**Frontend (client):**

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- Chart.js

**Backend (api):**

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL

**Dev Tools:**

- pnpm
- Docker + docker-compose
- ESLint + Prettier
- Husky (git hooks)

---

## 🌐 Features

- 🔐 **Form Submission**: Users can submit participation details via a structured form
- 📋 **Data Table**: View all submitted entries with percentage distribution
- 📈 **Chart Visualization**: Graph representation of participation data
- 🚦 **Validation & Errors**: Returns structured JSON error messages for invalid data
- 🧪 **Testing Ready**: Support for adding unit/integration tests

---

## 📁 Project Structure

```
├── api/                  # Backend service
│   ├── prisma/           # Prisma schema & migrations
│   ├── src/              # API source code
│   │   ├── services/
│   │   ├── routes/
│   │   ├── controllers/
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json

├── client/               # Frontend service
│   ├── app/              # Next.js app router
│   ├── components/
│   ├── public/
│   ├── package.json
│   └── next.config.ts

├── docker-compose.yml    # Multi-service setup
├── pnpm-workspace.yaml   # Monorepo setup
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file inside both **api/** and **client/**:

**api/.env**

```
DATABASE_URL="postgresql://user:user_password@localhost:5433/user_database?schema=public"
PORT=8000
```

**client/.env**

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 🚀 Running the App

### 1️⃣ Clone the repo

```bash
git clone <your-repo-url>
cd fullstack-challenge
```

### 2️⃣ Install dependencies

At the root of the project:

```bash
pnpm install
```

Inside api/ setup Prisma:

```bash
cd api
pnpm add -D prisma
pnpm add @prisma/client
pnpm prisma migrate dev --name init
pnpm prisma generate
```

### 3️⃣ Run with Docker (recommended)

```bash
docker-compose up
```

### 4️⃣ Run manually with pnpm workspaces

Run both frontend & backend together:

```bash
pnpm run dev
```

Run individually:

Start backend:

```bash
pnpm --filter api dev
```

Start frontend:

```bash
pnpm --filter client dev
```

App will be running at:  
👉 Frontend: `http://localhost:3000`  
👉 Backend: `http://localhost:8000`

---

## 📜 License

MIT
