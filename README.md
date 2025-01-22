# Todo API

A simple RESTful API for managing Todos. This project is built with Node.js, Express, and Prisma ORM, with a PostgreSQL database.

## Features
- Create, read, update, and delete todos
- Swagger API documentation for easy API reference
- Deployed on Render for public access

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (v7 or higher)
- PostgreSQL

### Installation
1. Clone the repository:
   git clone https://github.com/<username>/todo-api.git


Set up environment variables: Create a .env file in the root directory and add the following:
    DATABASE_URL=your_postgresql_connection_string

Initialize Prisma:
    npx prisma generate
    npx prisma migrate dev --name init

Development:
    npm run dev

Production:
    npm run build
    npm start


API Endpoints


| Method | Endpoint       | Description                   |
|--------|----------------|-------------------------------|
| POST   | `/todos`       | Create a new Todo             |
| GET    | `/todos`       | Retrieve all Todos            |
| PUT    | `/todos/:id`   | Update a Todo by ID           |
| DELETE | `/todos/:id`   | Delete a Todo by ID           |
