# Open Chat Kit - School Demo App

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

## 📋 Table of Contents

- [**Overview**](#overview)
- [**Built With**](#built-with)
- [**Features**](#features)
- [**Tech Stack**](#tech-stack)
  - [Frontend](#frontend)
  - [Build Tools & Utilities](#build-tools--utilities)
  - [Backend & Deployment](#backend--deployment)
- [**Prerequisites**](#prerequisites)
- [**Getting Started**](#getting-started)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Install Dependencies](#2-install-dependencies)
  - [3. Set Up Environment Variables](#3-set-up-environment-variables)
  - [4. Running the Application](#4-running-the-application)
    - [Development Mode (Webpack Dev Server)](#development-mode-webpack-dev-server)
    - [Production Mode (Docker)](#production-mode-docker)
- [**Available Scripts**](#available-scripts)
- [**Dockerization Details**](#dockerization-details)
- [**Environment Variables Reference**](#environment-variables-reference)
- [**Contributing**](#contributing)
- [**License**](#license)

## 📝 Overview

Open Chat Kit: School Demo App is a robust, full-stack template designed to accelerate the development of modern web applications. It provides a comprehensive starting point by integrating key technologies and best practices, allowing developers to focus on building features rather than boilerplate setup. This template is particularly well-suited for educational applications or platforms requiring user management, rich UIs, and scalable state management.

The application leverages React for a dynamic user interface, Clerk for secure authentication, Mantine for UI components, Zustand for state management, and Tailwind CSS for styling. The backend and deployment are containerized using Docker and Nginx, ensuring consistency across different environments.

### ✨ Key Benefits

| Benefit                  | Description                                                                                          |
| ------------------------ | ---------------------------------------------------------------------------------------------------- |
| 🔑 **Authentication**    | Secure, pre-configured user management using Clerk, saving significant setup time.                   |
| 🧩 **Modern UI**         | Built with Mantine UI for a rich set of accessible and customizable React components out-of-the-box. |
| 🔄 **State Management**  | Efficient and scalable global state managed by Zustand, simplifying complex state interactions.      |
| 🚀 **Rapid Development** | Pre-configured with Webpack, Babel, Tailwind CSS, and PostCSS for an optimized development workflow. |
| 🐳 **Containerized**     | Docker and Nginx setup ensures consistent environments from development to production.               |
| ⚙️ **Configurable**      | Easily customizable through environment variables for branding, feature flags, and API keys.         |
| 🛣️ **Routing**           | Client-side routing handled by React Router for seamless single-page application (SPA) navigation.   |

## Built With

This project is built with a modern and robust set of technologies:

<p align="left">
  <a href="https://react.dev/" target="_blank"><img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"></a>
  <a href="https://www.typescriptlang.org/" target="_blank"><img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"></a>
  <a href="https://clerk.com/" target="_blank"><img src="https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white" alt="Clerk"></a>
  <a href="https://mantine.dev/" target="_blank"><img src="https://img.shields.io/badge/Mantine_UI-339AF0?style=for-the-badge&logo=mantine&logoColor=white" alt="Mantine UI"></a>
  <a href="https://zustand-bearbose.pmnd.rs/" target="_blank"><img src="https://img.shields.io/badge/Zustand-777777?style=for-the-badge" alt="Zustand"></a>
  <a href="https://tailwindcss.com/" target="_blank"><img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS"></a>
  <a href="https://webpack.js.org/" target="_blank"><img src="https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=webpack&logoColor=black" alt="Webpack"></a>
  <a href="https://babeljs.io/" target="_blank"><img src="https://img.shields.io/badge/Babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=black" alt="Babel"></a>
  <a href="https://www.docker.com/" target="_blank"><img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker"></a>
  <a href="https://www.nginx.com/" target="_blank"><img src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white" alt="Nginx"></a>
  <a href="https://nodejs.org/" target="_blank"><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"></a>
</p>

## Features

- **User Authentication:** Secure and easy-to-integrate user management powered by [Clerk](https://clerk.com/).
- **Modern UI Components:** A rich set of accessible and customizable React components from [Mantine UI](https://mantine.dev/).
- **State Management:** Efficient and scalable state management with [Zustand](https://zustand-bearbose.pmnd.rs/).
- **Client-Side Routing:** Seamless page transitions and navigation handled by [React Router](https://reactrouter.com/).
- **API Communication:** Simplified HTTP requests using [Axios](https://axios-http.com/).
- **Utility-First Styling:** Flexible and maintainable styling with [Tailwind CSS](https://tailwindcss.com/).
- **Module Bundling:** Optimized asset bundling via [Webpack](https://webpack.js.org/).
- **Dockerized Environment:** Consistent development and deployment environments using [Docker](https://www.docker.com/) and [Nginx](https://www.nginx.com/).
- **Environment Configuration:** Easy management of application settings through `.env` files.
- **Google Analytics Integration:** Optional integration for tracking user interactions.

## Tech Stack

### Frontend

- **React:** A JavaScript library for building user interfaces.
- **Clerk:** Handles user authentication and management.
- **Mantine UI:** Provides a comprehensive set of React components.
- **Zustand:** A small, fast, and scalable bearbones state-management solution.
- **React Router DOM:** Enables client-side routing.
- **Axios:** A promise-based HTTP client for API interactions.
- **Tailwind CSS:** A utility-first CSS framework for styling.
- **PostCSS:** A tool for transforming CSS with JavaScript plugins.

### Build Tools & Utilities

- **Webpack:** A static module bundler for modern JavaScript applications.
- **Babel:** A JavaScript compiler for using next-generation JavaScript today.
- **dotenv:** Loads environment variables from a `.env` file.
- **prop-types:** Runtime type checking for React props.
- **react-ga4:** Google Analytics 4 integration for React.
- **react-textarea-autosize:** A React component that automatically adjusts textarea height.

### Backend & Deployment

- **Docker:** Containerization platform for building, shipping, and running applications.
- **Nginx:** A high-performance web server, reverse proxy, and load balancer.
- **docker-compose:** A tool for defining and running multi-container Docker applications.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (or [Yarn](https://yarnpkg.com/) / [pnpm](https://pnpm.io/))
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/) (usually included with Docker Desktop)

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd <your-repository-directory>
```

### 2. Install Dependencies

```bash
npm install
# or
# yarn install
# or
# pnpm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of your project. You can copy the example from `docker-compose.yml` or the section below and populate it with your actual keys and preferences.

```env
# Required for Clerk authentication
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

# Optional branding and feature flags (defaults are shown if not set or different from current README)
REACT_APP_BRAND_NAME="Your App Brand Name"
REACT_APP_LOGO_URL=your_logo_url
REACT_APP_PROJECTS_LABEL="Projects"
REACT_APP_EDIT_PROJECTS_LABEL="Project"
REACT_APP_PROJECTS_ROUTE="project"
REACT_APP_ENABLE_PROJECTS=false
REACT_APP_KNOWLEDGE_BASE_LABEL="Knowledge Bases"
REACT_APP_EDIT_KNOWLEDGE_BASE_LABEL="Knowledge Base"
REACT_APP_KNOWLEDGE_BASE_ROUTE="knowledge"
REACT_APP_ENABLE_KNOWLEDGE_BASES=false
REACT_APP_ENABLE_CHATS=false
REACT_APP_CHAT_ROUTE="c" # Ensure this matches your desired route if enabled
REACT_APP_ENABLE_HISTORY=false
REACT_APP_GOOGLE_ANALYTICS_ENABLE=false
REACT_APP_GOOGLE_ANALYTICS_CODE="" # Your Google Analytics G-XXXXXXXXXX code

# Add other environment variables as needed
```

**Note:** The `CLERK_PUBLISHABLE_KEY` is essential for authentication to work. Obtain this from your [Clerk Dashboard](https://dashboard.clerk.com/).

### 4. Running the Application

#### Development Mode (Webpack Dev Server)

This method is ideal for development as it provides hot reloading and detailed error messages.

```bash
npm start
```

The application will be available at `http://localhost:4000` (or the port specified in `webpack.config.js`).

#### Production Mode (Docker)

This method builds a production-ready Docker image and runs it using Docker Compose. This is how the application would typically be deployed.

1.  **Build the Docker image:**
    This command uses the `Dockerfile` to build your application image.

    ```bash
    docker build -t open-chat-kit-school-demo .
    ```

2.  **Run using Docker Compose:**
    This command reads the `docker-compose.yml` file to configure and run your application container, including setting up environment variables and port mappings.
    ```bash
    docker-compose up
    ```
    Alternatively, to run in detached mode:
    ```bash
    docker-compose up -d
    ```

The application will be served by Nginx and available at `http://localhost:4000` (as per `docker-compose.yml` and `nginx.conf` port configurations).

## Available Scripts

In the project directory, you can run the following scripts:

- `npm start`: Runs the app in development mode using `webpack-dev-server`.
- `npm run build`: Builds the app for production to the `dist` folder.
- `npm run analyze`: Builds the app for production and opens the webpack bundle analyzer to inspect bundle sizes.

## Dockerization Details

The project includes a multi-stage `Dockerfile`:

- **Stage 1 (Builder):**
  - Uses a `node:lts-alpine` base image.
  - Sets `NODE_OPTIONS` to increase memory for the Node.js process.
  - Copies `package.json` and `package-lock.json` and installs dependencies.
  - Copies the entire application source code.
  - Runs `npm run build` to create a production build in the `/app/dist` directory.
- **Stage 2 (Serve):**
  - Uses an `nginx:stable-alpine` base image.
  - Copies the built application from the builder stage (`/app/dist`) to Nginx's webroot (`/usr/share/nginx/html`).
  - Copies a custom `nginx.conf` to configure Nginx to serve the React application, including handling client-side routing.
  - Exposes port `4000`.
  - Starts Nginx in the foreground.

The `docker-compose.yml` file defines the `app` service:

- Builds the Docker image using the `Dockerfile` in the current context.
- Maps port `4000` of the host to port `4000` of the container.
- Defines various environment variables that are passed to the application at runtime. These are crucial for features like Clerk authentication and customizing UI labels and routes.

The `nginx.conf` file configures Nginx to:

- Listen on port `4000`.
- Serve static files from `/usr/share/nginx/html`.
- Use `try_files` to ensure that all routes are directed to `index.html`, which is necessary for single-page applications using client-side routing.

## Environment Variables Reference

The application uses the following environment variables. These can be set in a `.env` file at the project root or directly in your `docker-compose.yml` or deployment environment.

| Variable                              | Description                                                  | Default (from README) | Required |
| ------------------------------------- | ------------------------------------------------------------ | --------------------- | -------- |
| `CLERK_PUBLISHABLE_KEY`               | Your publishable API key from Clerk.                         |                       | Yes      |
| `REACT_APP_BRAND_NAME`                | The brand name for your application.                         | "Your App Brand Name" | No       |
| `REACT_APP_LOGO_URL`                  | URL for your application's logo.                             |                       | No       |
| `REACT_APP_PROJECTS_LABEL`            | Label for the "Projects" section/feature.                    | "Projects"            | No       |
| `REACT_APP_EDIT_PROJECTS_LABEL`       | Label for editing a single "Project".                        | "Project"             | No       |
| `REACT_APP_PROJECTS_ROUTE`            | Base route for the "Projects" feature.                       | "project"             | No       |
| `REACT_APP_ENABLE_PROJECTS`           | Set to `true` to enable the "Projects" feature.              | `false`               | No       |
| `REACT_APP_KNOWLEDGE_BASE_LABEL`      | Label for the "Knowledge Bases" section/feature.             | "Knowledge Bases"     | No       |
| `REACT_APP_EDIT_KNOWLEDGE_BASE_LABEL` | Label for editing a single "Knowledge Base".                 | "Knowledge Base"      | No       |
| `REACT_APP_KNOWLEDGE_BASE_ROUTE`      | Base route for the "Knowledge Bases" feature.                | "knowledge"           | No       |
| `REACT_APP_ENABLE_KNOWLEDGE_BASES`    | Set to `true` to enable the "Knowledge Bases" feature.       | `false`               | No       |
| `REACT_APP_ENABLE_CHATS`              | Set to `true` to enable the "Chats" feature.                 | `false`               | No       |
| `REACT_APP_CHAT_ROUTE`                | Base route for the "Chats" feature.                          | "c"                   | No       |
| `REACT_APP_ENABLE_HISTORY`            | Set to `true` to enable history-related features.            | `false`               | No       |
| `REACT_APP_GOOGLE_ANALYTICS_ENABLE`   | Set to `true` to enable Google Analytics.                    | `false`               | No       |
| `REACT_APP_GOOGLE_ANALYTICS_CODE`     | Your Google Analytics Measurement ID (e.g., `G-XXXXXXXXXX`). | ""                    | No       |

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1.  **Fork the repository.**
2.  **Create a new branch** for your feature or bug fix:
    ```bash
    git checkout -b feature/your-feature-name
    # or
    git checkout -b fix/your-bug-fix-name
    ```
3.  **Make your changes** and commit them with clear, descriptive messages.
4.  **Push your changes** to your forked repository:
    ```bash
    git push origin feature/your-feature-name
    ```
5.  **Create a Pull Request** against the main repository's `main` branch.

Please ensure your code adheres to the project's coding standards and includes tests where applicable.

## License

This project is licensed under the **ISC License**. See the [LICENSE](LICENSE) file for more details (if one exists, otherwise state it is ISC).
A `LICENSE` file with the ISC license text should be created if it doesn't already exist.
