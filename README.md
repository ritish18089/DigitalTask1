# LeadDesk Mini - 🌟 Simplifying Lead Management with Full-Stack Innovation

## 📖 Project Overview
LeadDesk Mini is a lightweight, high-performance Full Stack Lead Management application designed to streamline the process of capturing and managing potential client inquiries. It solves the critical business problem of scattered prospect data by providing a centralized, unified platform where sales teams can instantly view, track, and update lead statuses in real-time, ultimately accelerating the sales pipeline and improving conversion rates.

## ✨ Features
- Responsive Landing Page
- Lead Capture Form
- Client-side Validation
- Server-side Validation
- PostgreSQL Database
- Supabase Integration
- Admin Login
- Admin Dashboard
- Search Leads
- Update Lead Status
- Dark & Light Theme
- Responsive UI
- REST API Integration

## 🛠️ Technology Stack

**Frontend**
- React
- TypeScript
- Vite
- Tailwind CSS

**Backend**
- Node.js
- Express.js

**Database**
- Supabase

**ORM**
- Drizzle ORM

**Tools**
- VS Code
- Git
- GitHub
  
## 🏗️ System Architecture
<img src="https://github.com/ritish18089/DigitalTask1/blob/main/Leaddesk1.png" height="1000px" width="1000px">
The system architecture demonstrates the flow between the React frontend, Express backend API, and the Supabase PostgreSQL database, ensuring secure and scalable data management.

## 🔄 Project Workflow
<img src="https://github.com/ritish18089/DigitalTask1/blob/main/Leaddesk2.png" height="1000px" width="1000px">
The workflow begins with a prospect submitting their details via the Lead Capture Form on the Landing Page. The data is securely transmitted to the Express backend where it undergoes validation before being stored in the Supabase PostgreSQL database. Once stored, authorized administrators can log into the Admin Dashboard to search, view, and update the status of the new leads in real-time.

## 🖼️ Screenshots
### 🏠 Landing Page
<p align="center"><img src="https://github.com/ritish18089/DigitalTask1/blob/main/1.png" height="1000px">

### 📝 Lead Form
<p align="center"><img src="https://github.com/ritish18089/DigitalTask1/blob/main/2.png" height="1000px">

### 🔐 Admin Login
<p align="center"><img src="https://github.com/ritish18089/DigitalTask1/blob/main/3.png" height="1000px">

### 📊 Admin Dashboard
<p align="center"><img src="https://github.com/ritish18089/DigitalTask1/blob/main/4.png" height="1000px">

### 🔍 Search Leads
<p align="center"><img src="https://github.com/ritish18089/DigitalTask1/blob/main/5.png" height="1000px">

### ✏️ Lead Status Update
<p align="center"><img src="https://github.com/ritish18089/DigitalTask1/blob/main/6.png" height="1000px">

### 🌙 Dark Theme
<p align="center"><img src="https://github.com/ritish18089/DigitalTask1/blob/main/7.png" height="1000px">
  
### 📱 Mobile View
<p align="center"><img src="https://github.com/ritish18089/DigitalTask1/blob/main/8.png" height="1000px">

## 📚 Learning Outcomes

1. **Full-Stack Integration:** Gained practical experience connecting a modern React frontend with a robust Node.js/Express backend.
2. **TypeScript Proficiency:** Enhanced type safety and developer experience across the entire stack using TypeScript.
3. **Advanced State Management:** Mastered managing application state, including global theme toggling (Dark/Light mode).
4. **Form Handling & Validation:** Implemented robust client-side validation using React Hook Form and Zod.
5. **Database Design & Management:** Designed efficient database schemas and managed relational data using PostgreSQL.
6. **ORM Implementation:** Utilized Drizzle ORM for type-safe database queries and migrations.
7. **Authentication Flows:** Built secure login mechanisms and protected administrative routes.
8. **Responsive UI Development:** Crafted accessible and responsive interfaces using Tailwind CSS.
9. **API Development:** Designed and implemented RESTful API endpoints for CRUD operations.
10. **Deployment Strategies:** Prepared and configured applications for modern cloud hosting environments (Netlify, Render, Supabase).

## Installation Steps
- Ensure Node.js (v18 or later) and npm are installed on your system.
- Clone or download the LeadDesk Mini repository.
- Open a terminal and navigate to the project directory.
- Install all required project dependencies.
- Create a .env file in the project root and configure your environment variables (Supabase/PostgreSQL database credentials).
- Verify that your Supabase PostgreSQL database is running and accessible.
- Run the database migration (if required) to create the necessary tables.
- Start the development server.
- Open your browser and access the application using the local development URL.

## How to run
1. Open Command Prompt, PowerShell, or Terminal.
2. Clone the project repository:
```bash
git clone https://github.com/ritish18089/DigitalTask1.git
```
3. Navigate to the project directory:
```bash
cd Digital-Task1
```
4. Install all required dependencies:
```bash
npm install
```
5. Create a .env file and configure your Supabase/PostgreSQL database credentials.
6. Start the development server:
```bash
npm run dev
```
7. Open your web browser and visit:
```bash
http://localhost:5000
```
8. The LeadDesk Mini application is now ready to use.

## 🌐 Deployment
- **Frontend:** Deployed on Netlify
- **Backend:** Deployed on Render
- **Database:** Hosted on Supabase

## 🔐 Authentication Approach

- **bcrypt password hashing:** Admin passwords are automatically hashed via `bcryptjs` with a secure salt round before being stored in the database, preventing plain-text password exposure.
- **JWT generation:** Upon a successful login with matching credentials, the server signs and issues a JSON Web Token (JWT) containing the user's ID and role, valid for 24 hours.
- **JWT verification:** Every protected API route utilizes a custom JWT middleware that intercepts the incoming request, parses the Bearer token from the `Authorization` header, and verifies its signature against the `JWT_SECRET`.
- **Protected routes:** Endpoints for retrieving, searching, updating, and deleting leads are fully protected. Unauthenticated requests are rejected with a `401 Unauthorized` status.
- **Login flow:** The user enters their credentials on the `/admin/login` page. The React client posts this data to the Express backend. If verified, the backend returns a JWT which the frontend stores in `localStorage`, followed by a redirect to the Admin Dashboard.
- **Logout flow:** When the admin clicks Logout, the JWT is immediately removed from `localStorage`, and the application redirects the user back to the login page, fully terminating the session.

## 🗄️ Data Model

The PostgreSQL database (hosted on Supabase) consists of two primary tables managed by Drizzle ORM:

### 1. `leads`
Stores all prospect inquiries captured from the Landing Page.
- **Columns:** `id` (Primary Key), `name`, `email`, `budget`, `message`, `status` (defaults to NEW), `createdAt`, and `updatedAt`.
- **Purpose:** Acts as the primary CRM data source for the Admin Dashboard.
<p align="center"><img src="https://github.com/ritish18089/DigitalTask1/blob/main/Screenshot%202026-07-27%20175654.png" height="1000px"> 

### 2. `admin_users`
Stores authorized administrative accounts capable of managing leads.
- **Columns:** `id` (Primary Key), `username` (Unique), `email` (Unique), `password_hash` (bcrypt hashed), `role`, and `createdAt`.
- **Purpose:** Provides secure, role-based access to the dashboard.
<p align="center"><img src="https://github.com/ritish18089/DigitalTask1/blob/main/Screenshot%202026-07-27%20175705.png" height="1000px"> 
  
*Relationship:* Currently, there are no strict foreign key relationships between `leads` and `admin_users` as they operate independently (Leads are generated by public visitors, while Admin Users manage them).

## 📦 Deliverables

| Resource | Link |
|----------|------|
| **Live Landing Page URL** |https://leaddesk-backend-8dwt.onrender.com/ |
| **Admin Dashboard URL** | https://leaddesk-backend-8dwt.onrender.com/admin/dashboard |
| **Public GitHub Repository** | https://github.com/ritish18089/DigitalTask1 |
| **Loom Walkthrough Video** | |

## 🚀 Future Enhancements

1. **Email Notifications:** Automated email alerts when a new lead is captured.
2. **Data Exporting:** Ability for admins to export leads to CSV or Excel formats.
3. **Analytics Dashboard:** Visual charts and graphs representing lead conversion rates over time.
4. **Multi-User Roles:** Role-based access control for different tiers of administrative users.
5. **Kanban Board View:** A drag-and-drop board for visually managing lead progression.
6. **Third-Party CRM Integrations:** Syncing capabilities with platforms like Salesforce or HubSpot.

## 👨‍💻  Project Done By:
- **Name:** Ritish Kannur
- **Project Name:** LeadDesk Mini
- **Training:** Under the training in Full-stack Development by the Digital Heros
