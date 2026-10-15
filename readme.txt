# Employee Management System (EMS)

A full-stack Employee Management System built with a **Django REST Framework** backend and a **React (Vite)** frontend. This platform allows organizations to manage employees, departments, projects, and user profiles through a clean, responsive interface.

---

## Features Completed

### Backend (`emsapiproj`)
- **Database Architecture & Migrations:**
  - `Department`: Manage organizational departments (`DepartmentName`).
  - `Employee`: Manage employee records and department associations.
  - `Project`: Track company projects.
  - `UserDetails`: Extended user metadata and profile details.
- **RESTful API:** Serializers and views configured for CRUD operations across models.
- **Admin Panel:** Models registered in Django Admin for quick back-office management.
- **API Testing:** Postman workspace configurations included.

### Frontend (`ems-frontend`)
- **Authentication & Overview:** Login screen (`Login.jsx`), central `Dashboard.jsx`, and global `Navbar.jsx`.
- **Employee Management:** Full CRUD functionality (`EmployeeList.jsx`, `EmployeeForm.jsx`, and `employeeService.js`).
- **Department Management:** Full CRUD functionality (`DepartmentList.jsx`, `DepartmentForm.jsx`, and `departmentService.js`).
- **Projects & User Details:** Read/list views implemented (`ProjectList.jsx`, `UserDetailsList.jsx`).
- **Modular API Layer:** Centralized API configuration (`api.js`) with modular service files.

---

## Tech Stack

- **Frontend:** React, Vite, JavaScript (ES6+), ESLint
- **Backend:** Python 3.13, Django, Django REST Framework
- **Tools:** Postman, Git

---

## Project Structure

```text
Employee-Management-System/
├── ems-frontend/               # React + Vite client application
│   ├── public/                 # Static assets
│   └── src/
│       ├── assets/             # Images and icons
│       ├── components/         # Reusable UI components (Navbar)
│       ├── pages/              # Page views (Dashboard, Login, Lists, Forms)
│       ├── services/           # API communication layer (api, employee, department)
│       ├── App.jsx             # Main application router
│       └── main.jsx            # React DOM entry point
└── emsapiproj/                 # Django REST API project
    ├── apibackendapp/          # Core application (models, views, serializers, urls)
    ├── emsapiproj/             # Project settings and root URL configurations
    └── manage.py               # Django CLI utility
