# Angular Job Tracker Frontend

![Angular](https://img.shields.io/badge/Angular-17.x-red) ![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue) ![JWT](https://img.shields.io/badge/Auth-JWT-green) ![Docker](https://img.shields.io/badge/Deployable-Docker-blue)

## 🔍 Project Overview

This is the **frontend application** for the **Job Tracking Portal**, developed using **Angular 17.x**. It enables users to:

- 🔐 Register and log in securely using **JWT-based authentication**
- 🔎 Search for jobs with advanced filtering options
- 📄 View detailed job descriptions
- 📌 Track the status of their job applications

This application is part of a comprehensive, cloud-native solution, integrating seamlessly with a Spring Boot backend and deployable via Docker and Kubernetes.

## 🚀 Tech Stack & Features

- **Angular 17.x** – Modern, scalable frontend framework
- **TypeScript 4.x** – Strongly typed programming language
- **JWT Authentication** – Secure user authentication and authorization
- **Angular Material** – Responsive and accessible UI components
- **Reactive Forms** – Robust form handling and validation
- **RxJS** – Reactive programming for asynchronous data streams
- **Docker** – Containerization for consistent deployment environments

## 🌐 Related Repositories

| Layer        | Repository                                             |
|--------------|---------------------------------------------------------|
| Backend      | [Spring Boot API](https://github.com/arunjimmanuel/spring-boot-demo-app)                |
| Deployment   | [Kubernetes Deployment](https://github.com/arunjimmanuel/angular-spring-kubernetes-deployment) |

## 📦 How to Run

### 💻 Run Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/arunjimmanuel/angular-demo-app.git
   cd angular-demo-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure the API Base URL**:
   Update the backend URL in the Angular environment file:
   ```ts
   // src/environments/environment.ts
   export const environment = {
     production: false,
     apiBaseUrl: 'http://localhost:8080/api'
   };
   ```

4. **Run the application**:
   ```bash
   npm start
   ```

   The application will be accessible at `http://localhost:4200/`.

### 🐳 Run with Docker

1. **Build the Docker image**:
   ```bash
   docker build -t angular-job-tracker .
   ```

2. **Run the Docker container**:
   ```bash
   docker run -p 4200:80 angular-job-tracker
   ```

   The application will be accessible at `http://localhost:4200/`.

## 🔐 Authentication Endpoints

- `POST /auth/signup` – Register a new user
- `POST /auth/login` – Authenticate user and receive JWT
- Use the JWT token in the `Authorization` header for protected routes:
  ```
  Authorization: Bearer <token>
  ```

## 🧠 Sample Features

- **Job Listings**: Browse and search for available jobs
- **Job Details**: View comprehensive information about a specific job
- **Application Tracking**: Monitor the status of your job applications
- **User Profile**: Manage personal information and preferences

## ☁️ Deployment

This frontend application is designed for deployment in various environments:

- **Local Development**: Using Angular CLI or Docker
- **Cloud Deployment**: Integrated with Kubernetes for scalable deployment
- **CI/CD Pipelines**: Compatible with popular CI/CD tools for automated deployment

## 📈 SEO Keywords for Discovery

`Angular 17`, `Job Tracker Frontend`, `Angular Material UI`, `JWT Authentication`, `Dockerized Angular App`, `Cloud-Native Angular Application`, `Angular Kubernetes Deployment`, `Angular Reactive Forms`, `RxJS`, `TypeScript Angular Project`

## 👤 Author

**Arun Jaya Immanuel**  
🔗 [LinkedIn](https://www.linkedin.com/in/arunimmanuel/)  
💼 Full Stack Developer | Angular | Spring Boot | Kubernetes | Docker | Cloud Solutions

---

If you find this project helpful, feel free to ⭐ the repository and explore the full-stack ecosystem!
