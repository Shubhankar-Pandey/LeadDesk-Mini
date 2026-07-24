# LeadDesk Mini

A full-stack Lead Management application built as part of the **Digital Heroes Training Task**.

The application allows visitors to submit business enquiries through a public lead form, while authenticated administrators can view and manage all submitted leads.

---

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- TypeScript

### Database
- PostgreSQL
- Prisma ORM

### Authentication
- JWT (JSON Web Token)
- bcrypt
- HttpOnly Cookies

---

# Features

## Public User

- Submit a lead
- Client-side validation
- Server-side validation
- Stores lead in PostgreSQL

## Admin

- Sign Up
- Sign In
- Protected Dashboard
- View all submitted leads
- Change lead status
- Sign Out

---

# Data Model

The application uses two database models.

## Admin

Stores administrator accounts.

| Field | Type | Description |
|-------|------|-------------|
| id | Int | Primary Key |
| name | String | Admin name |
| email | String | Unique email |
| password | String | bcrypt hashed password |
| createdAt | DateTime | Account creation time |

---

## Lead

Stores all submitted leads.

| Field | Type | Description |
|-------|------|-------------|
| id | Int | Primary Key |
| name | String | Customer name |
| email | String | Customer email |
| budgetFrom | Int | Minimum budget |
| budgetTo | Int | Maximum budget |
| message | String | Project requirement |
| status | Enum | Lead status |
| createdAt | DateTime | Submission time |
| updatedAt | DateTime | Automatically updated |

---

## Lead Status Enum

```text
New
Contacted
Closed
```

Every newly created lead is assigned the default status:

```text
New
```

---

# Authentication Approach

Authentication is implemented using **JWT + HttpOnly Cookies**.

## Sign Up

1. User submits name, email and password.
2. Inputs are validated using Zod.
3. Password is hashed using bcrypt.
4. Admin account is stored in PostgreSQL.

---

## Sign In

1. Email and password are validated.
2. Password is verified using bcrypt.
3. A JWT is generated containing:

```json
{
  "email": "...",
  "userId": 1
}
```

4. JWT is stored inside an **HttpOnly Cookie**.

Cookie configuration:

- HttpOnly
- SameSite = Strict
- Secure in production
- Expiry = 2 hours

---

## Protected Routes

The middleware:

- Reads JWT from cookies
- Verifies token
- Checks expiration
- Extracts userId
- Allows request to continue

Protected endpoints:

```
GET    /api/v1/meCall
GET    /api/v1/lead
PUT    /api/v1/lead/:id
GET    /api/v1/signout
```

---

# API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/v1/signup | Register Admin |
| POST | /api/v1/signin | Login |
| GET | /api/v1/signout | Logout |

---

## Leads

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/v1/lead | Create Lead |
| GET | /api/v1/lead | Get All Leads |
| PUT | /api/v1/lead/:id | Update Lead Status |

---

# Project Flow

## Public User

```
Landing Page
      │
      ▼
Fill Lead Form
      │
      ▼
Validation
      │
      ▼
Backend API
      │
      ▼
PostgreSQL
```

---

## Admin

```
Login
   │
   ▼
JWT Generated
   │
   ▼
Stored in HttpOnly Cookie
   │
   ▼
Protected Dashboard
   │
   ├── View Leads
   ├── Search Leads
   └── Change Status
```

---

# Environment Variables

## Backend

```env
DATABASE_URL=

JWT_SECRET=

FRONTEND_URL=

PORT=
```

## Frontend

```env
VITE_BASE_URL=
```

---

# Running Locally

## Backend

```bash
cd Backend

npm install

npx prisma generate

npx prisma migrate dev

npm run dev
```

---

## Frontend

```bash
cd Frontend

npm install

npm run dev
```

---

# Deployment

The project consists of:

- Frontend
- Backend
- PostgreSQL Database

The frontend communicates with the backend through REST APIs, and authentication is maintained using secure HttpOnly cookies.

---

# Loom Walkthrough

The Loom video demonstrates the complete application flow:

1. Submit a new lead from the landing page.
2. Verify the lead is stored in the database.
3. Log in as an administrator.
4. Access the protected dashboard.
5. View all submitted leads.
6. Change a lead status from **New** to **Contacted** or **Closed**.
7. Sign out.

---

# Author

Shubhankar Pandey

Built for **Digital Heroes Training Task**.