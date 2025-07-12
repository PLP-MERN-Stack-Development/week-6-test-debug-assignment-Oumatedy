```
# MERN Bug Tracker

A full-stack MERN (MongoDB, Express, React, Node.js) application to create, update, track, and manage bugs/issues in projects. This project emphasizes **testing** and **debugging** best practices for both backend and frontend to ensure application reliability.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Debugging Techniques](#debugging-techniques)
- [Error Handling](#error-handling)
- [Testing Approach and Coverage](#testing-approach-and-coverage)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Report Bugs:** Users can submit new bugs with a title, description, and status.
- **View Bugs:** List all reported bugs with their details.
- **Update Bugs:** Change the status of bugs (open, in-progress, resolved).
- **Delete Bugs:** Remove bugs from the system.
- **Robust Testing:** Unit and integration tests for backend and frontend.
- **Error Handling:** Graceful error handling on both server and client.
- **Debugging Tools:** Console logs, Chrome DevTools, Node.js inspector, and React error boundaries integrated.

---

## Tech Stack

- **Frontend:** React, Axios, React Testing Library, Jest
- **Backend:** Node.js, Express, MongoDB, Mongoose, Jest, Supertest
- **Testing:** Jest, Supertest, React Testing Library
- **Debugging:** Console logs, Chrome DevTools, Node.js Inspector, React Error Boundaries

---

## Project Structure

```
mern-bug-tracker/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── tests/
│   │   ├── unit/
│   │   └── integration/
│   ├── config/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── tests/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

---

## Installation

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB (local or cloud instance)
- pnpm or npm installed globally

### Steps

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/mern-bug-tracker.git
   cd mern-bug-tracker
   ```

2. Setup backend:

   ```
   cd backend
   pnpm install
   ```

3. Setup frontend:

   ```
   cd ../frontend
   pnpm install
   ```

4. Create a `.env` file in the backend folder (optional if using default MongoDB URI):

   ```
   MONGO_URI=mongodb://localhost:27017/bugtracker
   PORT=5000
   ```

---

## Running the Application

### Backend

Start the backend server with:

```
cd backend
pnpm run dev
```

> **Note:** If `dev` script is not defined, use `pnpm start`.

The server runs on `http://localhost:5000`.

### Frontend

Start the frontend development server with:

```
cd frontend
pnpm start
```

The React app runs on `http://localhost:3000`.

---

## Testing

### Backend Tests

- Run unit and integration tests for backend:

```
cd backend
pnpm test
```

- Tests cover:
  - Validation helper functions (unit tests)
  - API routes (integration tests)
  - Mocked database calls using Jest mocks

### Frontend Tests

- Run frontend component and service tests:

```
cd frontend
pnpm test
```

- Tests cover:
  - React components (form validation, UI rendering)
  - Service API calls with mocked Axios
  - UI behavior under different states (empty list, errors)

---

## Debugging Techniques

- **Console Logs:** Used throughout backend and frontend to trace variable values and flow.
- **Chrome DevTools:** Inspect React component state, props, and network requests.
- **Node.js Inspector:** Run backend with `node --inspect server.js` and debug via Chrome DevTools.
- **React Error Boundaries:** Capture and display UI errors gracefully without crashing the app.

---

## Error Handling

- **Backend:** Centralized Express error handling middleware captures errors and returns JSON responses with appropriate status codes.
- **Frontend:** React ErrorBoundary component wraps the app to catch runtime errors and display fallback UI.

---

## Testing Approach and Coverage

- **Backend:**
  - Unit tests for utility functions (e.g., input validation).
  - Integration tests for REST API endpoints using Supertest.
  - Mocking database interactions to isolate tests.
- **Frontend:**
  - Unit tests for React components focusing on user interactions and validation.
  - Integration tests for API service calls and UI updates.
  - Rendering tests for different UI states (empty, error, loaded).

This ensures critical parts of the application are covered and bugs are caught early.

---

## Contributing

Contributions are welcome! Please:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

---

## License

This project is licensed under the MIT License.

---

## Contact

For questions or feedback, please contact:

- Tedy Ouma - oumatedy@gmail.com

---

**Happy bug tracking and debugging! 🐞🚀**
```