# React Frontend for Flask Blog API

This is the frontend part of a simple blog application built with React and TypeScript. It communicates with a Flask backend via a REST API.

## Features

- Display a list of articles with titles, authors, and timestamps  
- View full article detail  
- User login with JWT authentication  
- Admin dashboard for creating, editing, and deleting articles  
- Axios interceptor for automatic JWT token injection  
- Tailwind CSS for styling  

## Technologies Used

- React (Vite)  
- TypeScript  
- React Router  
- Axios  
- Tailwind CSS  

## Project Structure

```
react-frontend/
├── src/
│   ├── api/               # Axios instance with JWT interceptor
│   ├── components/        # Reusable components (ArticleCard, ArticleList, LoginForm)
│   ├── pages/             # Route-level views (Home, Login, Admin, etc.)
│   ├── main.tsx           # Application entry point
│   └── ...
├── index.html
├── vite.config.ts
└── package.json
```

## Setup

1. Clone this repository  
2. Navigate to the project directory:  
   ```bash
   cd react-frontend
   ```
3. Install dependencies:  
   ```bash
   npm install
   ```
4. Run the development server:  
   ```bash
   npm run dev
   ```

The frontend will be available at [http://localhost:5173](http://localhost:5173) by default. Make sure the Flask backend is running at [http://localhost:5050](http://localhost:5050).

## Configuration

- JWT tokens are stored in `localStorage`  
- Axios sends the token automatically via an interceptor in `src/api/axios.ts`  

## Notes

- The project uses protected API routes. Only authenticated users with a valid JWT can create, update or delete articles.  
- Admin features are not restricted on the frontend but rely on backend authorization.  

## Repository

This project is hosted on GitHub:  
[https://github.com/krapetcz/simple-blog-react-frontend](https://github.com/krapetcz/simple-blog-react-frontend)
