# DevPulse API

A simple issue tracking REST API built with **Node.js, Express, TypeScript, and PostgreSQL (NeonDB/pg Pool)**.  
It supports authentication, role-based access control, and full CRUD operations for issues.

---

# 🚀 Live URL


---

# 📌 Features

- User authentication (JWT)
- Role-based access control
  - Maintainer (full access)
  - Contributor (limited access)
- Create issues (bug / feature request)
- View all issues with filtering & sorting
- View single issue with reporter info
- Update issues (permission-based rules)
- Delete issues (maintainer only)
- Secure password storage (hashed)
- PostgreSQL relational schema design

---

# 🛠 Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL (NeonDB)
- pg (Pool)
- JWT (jsonwebtoken)
- bcryptjs
- dotenv

---

# ⚙️ Setup Instructions

## 1. Clone Repository

```bash
git clone https://github.com/Mosharrof-Hosen-Munna/DevPlulse.git
cd devpulse
