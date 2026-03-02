# EduFlow LMS

## Overview
EduFlow is a Learning Management System built with Angular 17 (frontend) + Spring Boot 3.2.5 (backend) + PostgreSQL. It features JWT authentication with access/refresh tokens, RBAC (Student/Teacher/Admin), teacher approval workflow, course management, assignments with grading, and messaging.

## Architecture
- **Frontend**: Angular 17, served on port 5000 with dev server proxy to backend
- **Backend**: Spring Boot 3.2.5 with Java 19, running on port 8080
- **Database**: PostgreSQL (Replit built-in), managed via Flyway migrations
- **Auth**: JWT (HS512) with access tokens (1h) and refresh tokens (7d)

## Project Structure
```
backend/
  src/main/java/com/eduflow/
    config/          - SecurityConfig, CORS
    controller/      - AuthController, AdminController, CourseController, etc.
    entity/          - JPA entities (User, Profile, Course, Assignment, etc.)
    repository/      - Spring Data JPA repositories
    security/        - JwtAuthFilter, JwtUtil
    service/         - AuthService, AdminService, CourseService, etc.
  src/main/resources/
    application.yml
    db/migration/V1__init_schema.sql
frontend/
  src/app/
    admin/           - Admin dashboard, approvals, user management
    auth/            - Login, register components
    core/            - Guards (AuthGuard, RoleGuard), interceptors (JWT), services
    shared/          - Landing page, shared module
    student/         - Student dashboard, courses, assignments
    teacher/         - Teacher dashboard, course management, grading
  proxy.conf.js      - Dev server proxy (bypasses HTML requests for SPA routing)
start.sh             - Startup script (both servers)
```

## Key Configuration
- Admin seed user: `admin@local.test` / `Admin123!`
- Proxy: `/auth`, `/api`, `/swagger-ui`, `/v3` routes proxied to port 8080 (HTML requests bypass to SPA)
- CORS: Configurable via `CORS_ALLOWED_ORIGINS` env var (defaults to wildcard without credentials)
- JWT secret: Configurable via `JWT_SECRET` env var
- Database URL: Auto-configured from Replit's `PGHOST`, `PGPORT`, `PGDATABASE` env vars in start.sh

## Roles & Permissions
- **Student**: Browse courses, enroll, submit assignments, view grades, messaging
- **Teacher**: Create courses, manage assignments, grade submissions (requires admin approval)
- **Admin**: Approve/block teachers, manage all users, view all courses

## Running
Workflow command: `bash start.sh` - starts both Spring Boot backend and Angular dev server
