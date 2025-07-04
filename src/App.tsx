// App.tsx
// Root component of the application
// Wraps the router and provides top-level layout/styling

import AppRouter from "./router/Router";

export default function App() {
  return (
    <div className="px-4">
      <AppRouter />
    </div>
  );
}
