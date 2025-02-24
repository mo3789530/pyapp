import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import NotFoundPage from "./pages/404/index";


const ROUTES = import.meta.glob(
  '/src/pages/**/index.tsx',
  { import: 'default', eager: true }
);


const routes = Object.keys(ROUTES).map((route) => {
  const path = route
    .replace(/\/src\/pages|index|\.tsx$/g, '')
    .replace(/\[\.{3}.+\]/, '*') // Dynamic segments
    .replace(/\[(.+)\]/, ':$1') // Parameterized routes
    .toLowerCase();

  const Component = ROUTES[route] as React.ComponentType;

  return { path, element: <Component /> };
});


// Add a fallback 404 route
routes.push({
  path: '*', // Matches all paths not defined above
  element: <NotFoundPage />,
});

const router = createBrowserRouter(routes);


export default router;