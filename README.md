# Notes API

A simple RESTful API for user authentication and note management, built with Node.js, Express, and MongoDB.

## Features

- User signup and signin with JWT authentication
- Create, read, update, and delete notes (CRUD)
- Each note is associated with a user
- Protected note routes (authentication required)

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- MongoDB instance (local or cloud)

### Installation

1. Clone the repository:

```sh
git clone <repository-url>
cd create_api_endpoints
```

2. Create a .env file in the root directory with the following variables:

```sh
PORT=PORT3000
JWT_SECRET_KEY=your_jwt_secret
TOKEN_HEADER_KEY=your_token_header_key
MONGO_URL="your_mongodb_connection_string"
```

**API Endpoints**<br/>

**User Routes**

- POST /user/signup
- Register a new user.
- **Body**: { "username": "string", "email": "string", "password": "string" }

- POST /user/signin
  Login an existing user.
  **Body**: { "email": "string", "password": "string" }

**Note Routes (Protected)** <br/>
All note routes require an Authorization: Bearer <token> header.

- GET /note/
  Get all notes for the authenticated user.

- POST /note/
  Create a new note.
  **Body**: { "title": "string", "description": "string" }

- PUT /note/:id
  Update a note by ID.
  **Body**: { "title": "string", "description": "string" }

- DELETE /note/:id
  Delete a note by ID.

**Environment Variables**

- PORT - Port number to run the server
- JWT_SECRET_KEY - Secret key for JWT signing
- TOKEN_HEADER_KEY - Header key for token (used in /user/validateToken)
- MONGO_URL - MongoDB connection string
