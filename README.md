# eComAdminPanel 🛍️
[![React](https://img.shields.io/badge/React-v18.2.0-blue?style=flat-square&logo=react)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.8.3-blue?style=flat-square&logo=typescript)]()
[![Vite](https://img.shields.io/badge/Vite-v7.0.0-blue?style=flat-square&logo=vite)]()
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.1.10-blue?style=flat-square&logo=tailwindcss)]()
[![License](https://img.shields.io/badge/License-Unlicensed-red?style=flat-square)]()



## Description 📝
eComAdminPanel is a comprehensive admin dashboard for managing an e-commerce system. It provides full control over essential data, including products, categories, brands, coupons, blogs, orders, and customers. Built with TypeScript, React, Redux Toolkit, and Shadcn-UI, it offers a modern and responsive interface for efficient e-commerce management.



## Table of Contents 📍
- [Features](#features-)
- [Tech Stack](#tech-stack-)
- [Installation](#installation-)
- [Usage](#usage-)
- [Project Structure](#project-structure-)
- [API Reference](#api-reference-)
- [Contributing](#contributing-)
- [License](#license-)
- [Important Links](#important-links-)
- [How to use](#how-to-use)
- [Footer](#footer-)



## Features ✨
- **Dashboard Overview**: Provides a summary of key e-commerce metrics. 📊
- **Product Management**: Create, update, and delete products. 📦
- **Category Management**: Organize products into categories. 📂
- **Brand Management**: Manage product brands. 🏷️
- **Coupon Management**: Create and manage discount coupons. 🎟️
- **Blog Management**: Create, update, and delete blog posts. ✍️
- **Order Management**: View and manage customer orders. 🛒
- **Customer Management**: Manage customer accounts. 🧑‍💼
- **Authentication**: Secure admin authentication using Redux Toolkit.
- **Drag and Drop Interface**: Utilizes `@dnd-kit` for intuitive drag and drop functionality in various components.



## Tech Stack 💻
- **Frontend**: 
	- React
	- TypeScript
	- Redux Toolkit
	- Redux Persist
	- Shadcn-UI
	- Tailwind CSS
	- React Hook Form
	- Zod Validation
	- @dnd-kit
- **Bundler**: Vite



## Installation 🛠️
1.  **Clone the repository**:
    ```bash
    git clone https://github.com/KariMuhammad/eComAdminPanel
    cd eComAdminPanel
    ```

2.  **Install dependencies**:
    ```bash
    npm install # or yarn install or pnpm install
    ```

3.  **Environment Variables**:
	  Create a `.env` file if needed and configure any necessary environment variables. The project likely uses environment variables for API keys, database connections, etc.

4.  **Run the development server**:
    ```bash
    npm run dev # or yarn dev or pnpm dev
    ```



## Usage 🚀
1.  **Start the Development Server**:
    - Run `npm run dev` to start the development server.
    - Open your browser and navigate to the address provided (typically `http://localhost:3000`).

2.  **Access the Admin Dashboard**:
    - Navigate to the admin login page (e.g., `/auth/sign-in`).
    - Enter your credentials to access the dashboard.

3.  **Manage Data**:
    - Use the sidebar navigation to access different sections such as Products, Categories, Brands, etc.
    - Perform CRUD (Create, Read, Update, Delete) operations on various data entities using the provided UI components.
    - Use forms and modals for data input and confirmation.



## How to use 💡
This project is designed as an admin dashboard for e-commerce systems. It's designed to provide comprehensive control over the management of various e-commerce functions through a user-friendly web interface.



### Use Cases:
*   **E-commerce Platform Management:** Managing product listings, categories, brands, and promotions.
*   **Content Management:** Creating and updating blog posts to engage customers.
*   **Customer Relationship Management:** Managing customer accounts, orders, and support.
*   **Data-driven Insights:** Tracking key metrics like revenue, growth rate, and churn rate.



### Getting Started:
1.  Clone and install all dependencies
2.  Import it into your own project for admin panel, for better and more accurate information contact the developer or project owner for set up to work according the api's, etc.



## Project Structure 📂
```

eComAdminPanel/
├── .eslintcache
├── .github/
├── .gitignore
├── README.md
├── components.json
├── eslint.config.js
├── index.html
├── node_modules/
├── package-lock.json
├── package.json
├── public/
├── src/
│   ├── App.css
│   ├── App.tsx
│   ├── apis/
│   ├── app/
│   ├── assets/
│   ├── components/
│   ├── constants/
│   ├── context/
│   ├── hooks/
│   ├── interfaces/
│   ├── layouts/
│   ├── lib/
│   ├── main.tsx
│   ├── pages/
│   ├── providers/
│   ├── schemas/
│   ├── shared/
│   ├── types/
│   └── vite-env.d.ts
├── tailwind.config.ts
├── tsconfig.app.json
├── tsconfig.json
└── vite.config.ts
```

Key directories and files:

-   **src/apis/**: Contains the API service definitions for making HTTP requests.
-   **src/app/redux/**: Includes Redux Toolkit setup for state management, including slices for authentication, customers, products, etc.
-   **src/components/**: Reusable React components.
-   **src/constants/**: Defines constant values such as API base URLs and initial states.
-   **src/layouts/**: Defines main and authentication layouts.
-   **src/pages/**: Contains page components for different routes, such as authentication, dashboard, products, categories, etc.
-   **src/types/**: Defines TypeScript types used throughout the application.



## API Reference 📚
The project uses `axios` for making API calls. The `src/apis/index.ts` file configures an `axiosInstance` with interceptors for handling token expiration and unauthorized access. API service functions are defined in the `src/apis/services` directory.

Example of Axios configuration:

```typescript
import axios from "axios";
import store from "@/app/redux/store";
import { authActions } from "@/app/redux/features/auth";
import { API_BASE_URL } from "@/constants";
import { toast } from "sonner";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check for token expired error (customize as needed)
    if (
      error.response &&
      (error.response.status === 401 ||
        error.response.data?.message?.toLowerCase().includes("token expired") ||
        error.response.data?.message?.toLowerCase().includes("unauthorized") ||
        error.response.data?.error?.toLowerCase().includes("token expired") ||
        error.response.data?.error?.toLowerCase().includes("unauthorized"))
    ) {
      // Dispatch logout action to clear auth state
      store.dispatch(authActions.logout());

      // Show user-friendly message
      toast.error("Session expired. Please sign in again.");

      // Use a more reliable way to navigate
      setTimeout(() => {
        window.location.href = "/auth/sign-in";
      }, 100);
    }
    return Promise.reject(error);
  }
);

```



## Contributing 🤝
Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive messages.
4.  Submit a pull request.



## License 📝
This project has no specified license. All rights are reserved.



## Important links 🔗
-   **Repository**: [https://github.com/KariMuhammad/eComAdminPanel](https://github.com/KariMuhammad/eComAdminPanel)
-   **Live Demo**: No live demo link available. Add it if it exists.
-   **Profile Links**: No profile link available. Add it if it exists.



## Footer 🦶
-   Repository: [eComAdminPanel](https://github.com/KariMuhammad/eComAdminPanel)
-   Author: KariMuhammad
-   Contact: No contact information available

⭐️ Like, fork, raise issues and contribute to the project!
