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

Prerequisites:

- Visual Studio Code

Ensure you have the following installed:

- dotnet
  Extension on your VsCode:
- C# Dev Kit

- Clone the Auth Api Repository
  git clone https://github.com/kennykay20/auth-rbac-api.git
  cd auth-rbac-api

# Run The App

dotnet run

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
