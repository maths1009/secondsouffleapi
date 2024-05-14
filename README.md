# SecondSouffleAPI

🌟SecondSouffleAPI is an API for SecondSouffle, a fictional fashion company that specializes in creating products from recycled materials. Visit the [SecondSouffle website](https://www.secondsouffle.com) to learn more about our mission and products.

## About

📝 SecondSouffleAPI is developed using Node.js and Express. It serves as the backend for the SecondSouffle platform, providing endpoints for managing products, users, and orders.

## Prerequisites

🔧 Before running the application, make sure you have the following installed:

- Node.js (version 20.9.4)
- npm (version 10.1.0)
- MariaDB

You'll also need to set up a `.env` file with the necessary environment variables. Rename the `.env-sample` file to `.env` and fill in the required information, including database connection details. The SQL file for the database is provided, and the connection information is stored in the `.env` file.

## Installation

⚙️ Clone the GitHub repository:

```bash
git clone https://github.com/yourusername/SecondSouffleAPI.git
```

📦 Install dependencies:

```bash
npm install
```

## Usage

🚀 To start the application:

```bash
npm start
```

🔨 To build the application:

```bash
npm run build
```

🔧 To run the application in development mode with automatic restarts (using Nodemon):

```bash
npm run dev
```

👷Run test

```bash
npm run test
```

🌐 The application by default runs on port 3000.

## Informations

### Formatting

📚 The project uses Prettier for code formatting with a specific sort order. Prettier helps maintain a consistent code style across the project, making it easier to read and understand the codebase.
To format the code using Prettier, run the following command:

```bash
npm run format
```

### ORM and Database

🔒 The project uses Prisma as an ORM to interact with the database. Prisma provides a type-safe way to interact with the database, making it easier to write queries and manage the database schema.

### Authentication

🔐 The project uses JWT (JSON Web Tokens) for authentication. When a user logs in, a JWT is generated and sent to the client. The client must include this token in the headers of each request to access protected routes.

## Contributing

🤝 As of now, there are no contributors to this project.

## Technologies Used

🛠️ - Node.js (version 20.9.0)
🚀 - Express (version 4.19.2)
💻 - TypeScript (version 5.4.5)
🔒 - Prisma (version 5.13.0)

---

Feel free to contribute to the project by submitting issues or pull requests. Thank you for your interest in SecondSouffleAPI!
