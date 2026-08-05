# Client

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.10.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


Here is the complete README.md file without fragmentation:

## Location: `/home/claude/esic-platform/README.md`
```markdown
# ESIC STEM LAB Digital Platform

> Electronics & Software Innovation Center — Chuka University

A full-stack digital platform for STEM education, innovation, and research management.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Angular 21 + Tailwind CSS v3 |
| Backend | NestJS 11 + Swagger |
| Database | PostgreSQL 16 + Prisma ORM |
| Auth | JWT + RBAC (Admin / Staff / User) |
| Infra | Docker Compose + Nginx |

## Quick Start (Development)

### 1. Start infrastructure
```bash
docker compose -f docker-compose.dev.yml up -d
```

### 2. Backend setup
```bash
cd backend
cp .env.example .env      # edit DATABASE_URL and JWT_SECRET
npm install
npx prisma migrate dev    # run migrations
npm run seed              # seed initial data
npm run start:dev         # start API on :3000
```

### 3. Frontend setup
```bash
cd frontend
npm install
ng serve                  # start on :4200
```

### 4. Open in browser
- **Frontend:** http://localhost:4200
- **API Docs (Swagger):** http://localhost:3000/api/docs
- **API Base URL:** http://localhost:3000/api/v1

## Production Deployment

```bash
# 1. Set your .env values
cp .env.example .env

# 2. Build and launch all services
docker compose up -d --build

# 3. Run migrations inside the API container
docker compose exec api npx prisma migrate deploy

# 4. Seed the database
docker compose exec api npm run seed
```

Services exposed:
- **Nginx (public):** http://localhost:80
- **API (internal via nginx):** http://localhost/api/
- **Swagger:** http://localhost/api/docs

## API Endpoints

### Public (no auth)
- `GET /api/v1/programs` — All programs
- `GET /api/v1/events` — Published events
- `GET /api/v1/projects` — Published projects
- `GET /api/v1/resources` — Public resources
- `GET /api/v1/gallery` — Gallery
- `GET /api/v1/announcements` — Announcements
- `GET /api/v1/team` — Team members
- `GET /api/v1/partners` — Partners
- `POST /api/v1/contact` — Submit contact message

### Authenticated (JWT required)
- `POST /api/v1/events/:id/register` — Register for event
- `POST /api/v1/submissions` — Submit a project
- `GET /api/v1/submissions/mine` — My submissions
- `GET /api/v1/users/me/events` — My event registrations

### Admin / Staff
- `POST /api/v1/programs` — Create program
- `POST /api/v1/events` — Create event
- `GET /api/v1/submissions` — All submissions
- `PATCH /api/v1/submissions/:id/review` — Review submission
- `GET /api/v1/contact` — View contact messages
- `GET /api/v1/users` — All users

## Project Structure

```
esic-platform/
├── backend/                  # NestJS API
│   ├── src/
│   │   ├── auth/             # JWT auth module
│   │   ├── users/            # User management
│   │   ├── programs/         # STEM programs
│   │   ├── projects/         # Projects + submissions
│   │   ├── events/           # Events + registrations
│   │   ├── resources/        # Learning resources
│   │   ├── partners/         # Partners
│   │   ├── gallery/          # Media gallery
│   │   ├── announcements/    # News & announcements
│   │   ├── team/             # Team members
│   │   ├── contact/          # Contact messages
│   │   ├── common/           # Guards, decorators, DTOs
│   │   └── prisma/           # Database service
│   └── prisma/
│       ├── schema.prisma     # Database schema
│       └── seed.ts           # Initial data seed
├── frontend/                 # Angular app
│   └── src/app/
│       ├── core/             # Services, guards, interceptors
│       ├── shared/           # Navbar, footer components
│       └── features/         # Page components (home, programs, etc.)
├── nginx/                    # Nginx reverse proxy config
├── docker-compose.yml        # Production compose
├── docker-compose.dev.yml    # Development (DB + Redis only)
└── .env.example
```

```
