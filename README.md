# React Base App

A robust starting point for building modern web applications with React. This project is configured with key technologies to provide a solid foundation for development:

- Authentication is handled using **Clerk**, offering secure and easy-to-integrate user management.
- The user interface is built with **Mantine**, providing a suite of accessible and customizable React components.
- State management is efficiently managed with **Zustand**, a fast and scalable bearbones state-management solution.
- Client-side navigation is powered by **React Router**, enabling dynamic and seamless page transitions.
- API interactions are simplified with **Axios**, a promise-based HTTP client.
- Styling is streamlined using **Tailwind CSS**, a utility-first CSS framework, processed with **PostCSS**.
- The project is bundled using **Webpack**, a powerful module bundler, and modern JavaScript features are compiled using **Babel**.

This base app aims to accelerate the setup of new React projects by providing pre-configured tools and libraries essential for many modern web applications.

## Features

- User Authentication (Clerk)
- Modern UI Components (Mantine)
- State Management (Zustand)
- Client-Side Routing (React Router)
- API Communication (Axios)
- Styling (Tailwind CSS)
- Asset Bundling (Webpack)

## Setup

To get started with this project, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or yarn install
    # or pnpm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root directory and add necessary environment variables. The following environment variables are used in this project:

    ```env
    # Required for Clerk authentication
    CLERK_PUBLISHABLE_KEY=your_publishable_key

    # Optional branding and feature flags
    REACT_APP_BRAND_NAME=Your App Brand Name
    REACT_APP_LOGO_URL=your_logo_url
    REACT_APP_PROJECTS_LABEL=Projects # Default: Projects
    REACT_APP_EDIT_PROJECTS_LABEL=Project # Default: Project
    REACT_APP_PROJECTS_ROUTE=project # Default: project
    REACT_APP_ENABLE_PROJECTS=false # Default: false
    REACT_APP_KNOWLEDGE_BASE_LABEL=Knowledge Bases # Default: Knowledge Bases
    REACT_APP_EDIT_KNOWLEDGE_BASE_LABEL=Knowledge Base # Default: Knowledge Base
    REACT_APP_KNOWLEDGE_BASE_ROUTE=knowledge # Default: knowledge
    REACT_APP_ENABLE_KNOWLEDGE_BASES=false # Default: false
    REACT_APP_ENABLE_HISTORY=false # Default: false
    REACT_APP_ENABLE_CHATS=false # Default: false

    # Add other environment variables as needed
    ```

## Available Scripts

In the project directory, you can run:

- `npm start`: Runs the app in development mode.
- `npm run build`: Builds the app for production to the `dist` folder.
- `npm run analyze`: Builds the app and analyzes the bundle size.

## Technologies Used

- [React](https://react.dev/) ([Docs](https://react.dev/learn))
- [Clerk](https://clerk.com/) ([Docs](https://clerk.com/docs))
- [Mantine](https://mantine.dev/) (Core, Hooks, Notifications) ([Docs](https://mantine.dev/guides/install/))
- [Zustand](https://zustand-bearbose.pmnd.rs/) ([Docs](https://zustand-bearbose.pmnd.rs/getting-started/introduction))
- [React Router DOM](https://reactrouter.com/) ([Docs](https://reactrouter.com/en/main/start/overview))
- [Axios](https://axios-http.com/) ([Docs](https://axios-http.com/docs/intro))
- [Tailwind CSS](https://tailwindcss.com/) ([Docs](https://tailwindcss.com/docs))
- [Webpack](https://webpack.js.org/) ([Docs](https://webpack.js.org/concepts/))
- [Babel](https://babeljs.io/) ([Docs](https://babeljs.io/docs/))
- [PostCSS](https://postcss.org/) ([Docs](https://postcss.org/docs/))

## Contributing

Contributions are welcome! Please fork the repository and create a pull request.

## License

This project is licensed under the ISC License.
