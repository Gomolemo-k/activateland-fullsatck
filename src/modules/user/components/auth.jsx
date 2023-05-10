import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Logout from "./logout";
import Signup from "./signup";
import Login from "./login";

function Auth() {
  const [user, setUser] = useState(localStorage.getItem("token"));

  const root = document.getElementById('root');
  if (!root) {
    console.log('Element id=root not found')
    return null; // o mostra un missatge d'error
  }

  useEffect(() => {
    // Aquí pots actualitzar les dades del component fill basat en les dades actuals del pare
  }, [user]);

  return createRoot(root).render(
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Definició de la ruta arrel */}
        {!user ? (
          <Route path="/" element={<Navigate replace to="/login" />} />
        ) : (
          <Route path="/" element={<Navigate replace to="/dashboard" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default Auth;
