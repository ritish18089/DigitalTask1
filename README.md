# LeadDesk Mini

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
- PostgreSQL
- Supabase

**ORM**
- Drizzle ORM

**Tools**
- VS Code
- Git
- GitHub
  
## 🏗️ System Architecture
<img src="https://github.com/ritish18089/DigitalTask1/blob/main/DigitalTask1.png" height="1000px" width="1000px">
The system architecture demonstrates the flow between the React frontend, Express backend API, and the Supabase PostgreSQL database, ensuring secure and scalable data management.

## 🔄 Project Workflow
<img src="https://github.com/ritish18089/DigitalTask1/blob/main/DigitalTask11.png" height="1000px" width="1000px">
The workflow begins with a prospect submitting their details via the Lead Capture Form on the Landing Page. The data is securely transmitted to the Express backend where it undergoes validation before being stored in the Supabase PostgreSQL database. Once stored, authorized administrators can log into the Admin Dashboard to search, view, and update the status of the new leads in real-time.

## 🖼️ Screenshots
### Landing Page
<p align="center"><img src="https://github.com/ritish18089/DigitalTask1/blob/main/1.png" height="1000px">

### Lead Form
<p align="center"><img src="https://github.com/ritish18089/DigitalTask1/blob/main/2.png" height="1000px">

### Admin Login
<p align="center"><img src="https://github.com/ritish18089/DigitalTask1/blob/main/3.png" height="1000px">

### Dashboard
<p align="center"><img src="https://github.com/ritish18089/DigitalTask1/blob/main/4.png" height="1000px">

### Search Leads
<p align="center"><img src="https://github.com/ritish18089/DigitalTask1/blob/main/5.png" height="1000px">

### Lead Status Update
<p align="center"><img src="https://github.com/ritish18089/DigitalTask1/blob/main/6.png" height="1000px">

### Dark Theme
<p align="center"><img src="https://github.com/ritish18089/DigitalTask1/blob/main/7.png" height="1000px">
  
### Mobile View
<p align="center"><img src="https://github.com/ritish18089/DigitalTask1/blob/main/8.png" height="1000px">

### Database
<p align="center"><img src="https://github.com/ritish18089/DigitalTask1/blob/main/9.png" height="1000px"> 

# 📚 Learning Outcomes

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

## ⚙️ Installation Steps

1. **Clone the repository:**
   ```bash
   git clone <YOUR_GITHUB_REPO_URL>
   cd leaddesk-mini
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add your database credentials and API keys.
4. **Run Database Migrations:**
   Execute the necessary Drizzle ORM commands to push your schema to the Supabase database.
   ```bash
   npx drizzle-kit push
   ```

# ▶️ How to Run

## Using Command Line

To start the development server:
```bash
npm install
npm run dev
```

For production builds:
```bash
npm run build
npm start
```

## Using VS Code

1. **Open the project:** Launch VS Code and open the project folder.
2. **Open Terminal:** Navigate to `Terminal > New Terminal` (or press `` Ctrl + ` ``).
3. **Install packages:** Type `npm install` and press Enter.
4. **Start the project:** Type `npm run dev` and press Enter. Open the provided localhost URL in your browser.

## 🌐 Deployment

**Frontend:**
Deployed on Netlify
**Backend:**
Deployed on Render
**Database:**
Hosted on Supabase

## 📦 Deliverables

| Resource | Link |
|----------|------|
| **Live Landing Page URL** | `[Insert Link Here]` |
| **Admin Dashboard URL** | `[Insert Link Here]` |
| **Public GitHub Repository** | `[Insert Link Here]` |

## 🚀 Future Enhancements

1. **Email Notifications:** Automated email alerts when a new lead is captured.
2. **Data Exporting:** Ability for admins to export leads to CSV or Excel formats.
3. **Analytics Dashboard:** Visual charts and graphs representing lead conversion rates over time.
4. **Multi-User Roles:** Role-based access control for different tiers of administrative users.
5. **Kanban Board View:** A drag-and-drop board for visually managing lead progression.
6. **Third-Party CRM Integrations:** Syncing capabilities with platforms like Salesforce or HubSpot.

## 👨‍💻 Project Done By

**Name:**
Ritish Kannur
**Project Name:**
LeadDesk Mini
**Training:**
Under the training in Full-stack Development by the Digital Heros

