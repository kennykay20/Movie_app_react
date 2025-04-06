# MOvie App

- The Movie App is a React-based web application that allows users to browse movies, mark their favorites, and manage authentication using JWT. The frontend is built with React.js, TailwindCSS, and CSS, while it interacts with two APIs:

1. Authentication & Authorization API - Handles user login and signup, returning JWT tokens.

2. The Movie Database (TMDb) API - Fetches movie data (images, titles, etc.) from TMDb API.

🚀 Features

🔑 User Authentication (Login & Signup) via JWT-based API.

🎥 Movie Listing Page displaying movies fetched from TMDb.

⭐ Favorite Movies - Users can select favorite movies, stored in state and displayed on a separate page.

🎨 Modern UI with TailwindCSS and standard CSS.

⚡ Responsive Design for mobile and desktop.

# 🛠️ Technologies Used

. React.js - Frontend framework

. TailwindCSS & CSS - Styling

. React Router - Navigation

. JWT Authentication - Secure login/signup

. TMDb API - Fetches movie data

# 🔧 Installation & Setup

- Prerequisites

- Ensure you have the following installed:

- Node.js (>=18.x)

- npm or yarn

# Clone the Movie Repository

git clone https://github.com/kennykay20/Movie_app_react.git
cd movie_app_react

- Install Dependencies
  npm install # or yarn install

# Run The App

npm run dev

- The app should now be running on http://localhost:5173

🔑 Authentication Flow

1. User signs up or logs in via the authentication API.

2. On successful login, a JWT token is returned and stored.

3. The token is used to authenticate subsequent requests.

🖥️ Movie Page

1. Fetches movie data from TMDb API.

2. Displays a grid of movies with images & titles.

3. Clicking on a favorite icon adds the movie to the Favorite Page.

4. Make sure you register on this website: https://www.themoviedb.org to fetch movies, it's a free website, it will send you an activation key, you active the key on your email, then navigate after login succesfully, to the settings on their page, and Click on API, after that you fill a form with any information they requested, like i said it's free, and it will give you an API_KEY and a token, you use that KEY, inside the ApiContext.jsx page, for the MovieAPI_KEY cos that API_KEY I have might have expired...

❤️ Favorite Page

1. Displays all the movies marked as favorite.

2. Uses React state to track favorite selections.

# 🚀 Deployment

# To deploy the app:

- npm run build

- Then, host the build/ folder on Netlify, Vercel, Firebase Hosting e.t.c.

### Auth API

# auth-rbac-api_c#

## Overview

The auth-rbac-api_c# project is an authentication and role-based access control (RBAC) API built with C# and ASP.NET Core. It provides secure authentication and authorization features, allowing users to register, log in, and access resources based on their roles and permissions.

## Features

- User registration with password hashing.
- JWT-based authentication.
- Role-based access control (RBAC).
- S3 bucket for Image uploads
- API endpoints for managing users, roles, resources, and permissions.
- Secure and scalable architecture with .NET 8.0.

## Technologies Used

- C# (.NET 8.0)
- ASP.NET Core
- Entity Framework Core (EF Core)
- PostgreSQL
- JWT Authentication
- Docker, Docker-compose (for containerization)

## Setup

### Prerequisites

- .NET 8.0 SDK
- PostgreSQL (for database)
- Docker (optional, if you want to run the app in a container)

### Running the Application Locally

1. Clone this repository:
   ```bash
   git clone https://github.com/kennykay20/auth-rbac-api.git
   ```
2. Navigate to the directory ``` cd auth-rbac-api_csharp

3. Set up the PostgreSQL database:

- Make sure you have a running PostgreSQL instance.
- Create a database for the app or modify the appsettings.json to use an existing database.
- Run the migrations to set up the schema.

4. run dotnet build to build and dotnet run to start the app, or run dotnet run to do both actions

### Running with Docker

## To run the application using Docker, follow these steps:

1. Build the Docker image:

- docker compose build

2. Run the application:

- docker compose up

- The app will be available at http://localhost:5284

## API Endpoints

- Authentication Endpoints
- POST /api/v1/authentication/register - Register a new user.
- body { "FirstName", "LastName", "Email", "Password"}
- POST /api/v1/authentication/login - Log in with credentials and receive a JWT token.
- body {"Email", "Password"}

# Example request for register

- POST /api/v1/authentication/register
  Content-Type: application/json

{
"FirstName": "test1",
"LastName": "test2",
"Email": "test@gmail.com",
"Password": "Securepassword123"
}

# Example response

{
"Success": true,
"Status": 201,
"Message": "New User added successfully, activate your account",
"Data": "user-data without password in return"
}

- The message refers you to update and validate your account with an OTP sent to your email within 10mins, without that you cannot login as an active user.

# Example request for login

- POST /api/v1/authentication/login
  Content-Type: application/json

{
"Email": "test@gmail.com",
"Password": "Securepassword123"
}

# Example response

{
"Success": true,
"Status": 200,
"Message": "Login successfully",
"AccessToken": "your-jwt-access-token-here",
"RefreshToken": "your-jwt-refresh-token-here",
}

# 📜 License

This project is licensed under the MIT License.

# 🤝 Contributing

Pull requests are welcome! If you have any suggestions, feel free to open an issue.

# 📩 Contact

For inquiries, reach out via:

- GitHub: kennykay20

- Email: kennyoluwadamilare20@gmail.com

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available.
