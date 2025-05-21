## Overview
The **Employee Directory** backend is a Node.js application built using the Express framework. It provides a RESTful API for managing employees and user authentication. The backend is designed to handle CRUD operations for employees, user authentication, and token-based authorization. It also includes middleware for error handling and access control.

---

## Packages Used
The following packages are used in this project:

- **express**: A web framework for building APIs.
- **cors**: Middleware for enabling Cross-Origin Resource Sharing.
- **cookie-parser**: Middleware for parsing cookies.
- **dotenv**: For managing environment variables.
- **jsonwebtoken**: For generating and verifying JWT tokens.
- **bcrypt**: For hashing passwords.
- **mongoose**: For interacting with MongoDB.
- **nodemon**: For automatically restarting the server during development.
- **json2csv**: For exporting employee data to CSV format.

---

## Environment Variables
The application uses a `.env` file to manage sensitive information. Below are the required environment variables:

- `PORT`: The port on which the server runs.
- `CORS_ORIGIN`: Allowed origins for CORS.
- `MONGO_URI`: MongoDB connection string.
- `ACCESS_TOKEN_SECRET`: Secret key for signing access tokens.
- `ACCESS_TOKEN_EXPIRE`: Expiration time for access tokens.
- `REFRESH_TOKEN_SECRET`: Secret key for signing refresh tokens.
- `REFRESH_TOKEN_EXPIRE`: Expiration time for refresh tokens.
- `COOKIE_SECURE`: Whether cookies should be secure (set to `true` in production).

---

## API Routes and Methods

### Authentication Routes (`/api/users`)
1. **POST `/`**: Register a new user.
2. **POST `/login`**: Log in a user and issue access and refresh tokens.
3. **POST `/logout`**: Log out a user (requires access token).
4. **POST `/refresh-token`**: Rotate the refresh token to issue a new access token.

### Admin Routes (`/api/employees`)
1. **GET `/`**: Retrieve all employees (requires access token).
2. **GET `/:id`**: Retrieve a specific employee by ID (requires access token).
3. **POST `/`**: Create a new employee (requires admin privileges).
4. **PUT `/:id`**: Update an employee's details by ID (requires admin privileges).
5. **DELETE `/:id`**: Delete an employee by ID (requires admin privileges).
6. **GET `/export`**: Export all employee data to a CSV file (requires admin privileges).

### Frontend Routes (`/users`)
1. **GET `/signup`**: Serve the signup page (static file).
2. **GET `/login`**: Serve the login page (static file).
3. **GET `/dashboard`**: Serve the dashboard page (static file).
4. **404 Handling**: Any undefined frontend route will return a 404 page.

---

## Error Handling
The application uses a centralized error-handling middleware. Custom errors are represented using the `ApiError` class, and generic errors return a 500 status code with a standard response.

---

## How to Run the Project
1. Clone the repository.
2. Navigate to the `backend` directory.
3. Install dependencies using `npm install`.
4. Create a `.env` file in the `backend` directory and configure the environment variables.
5. Start the server in development mode using `npm run dev`.

---

## Future Improvements
- Implement a frontend using React or another modern framework.
- Add unit and integration tests for the backend.
- Enhance the error-handling mechanism with more detailed logs.
- Add role-based access control for more granular permissions.

