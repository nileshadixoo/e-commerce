import React, { lazy } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes, Navigate } from "react-router";
import Navbar from "./components/Navbar";
import AddProducts from "./screens/AddProducts";
import EditProducts from "./screens/EditProducts";

// code splitting
const Home = lazy(() => import("./screens/Home"));
const Cart = lazy(() => import("./screens/Cart"));
const SearchPage = lazy(() => import("./screens/SearchPage"));
const Login = lazy(() => import("./screens/Login"));
const Register = lazy(() => import("./screens/Register"));
const AdminDashboard = lazy(() => import("./screens/AdminDashboard"));
const AdminProtectedRoutes = lazy(() =>
  import("./components/AdminProtectedRoutes")
);
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));

const App = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register />} />
        <Route
          path="/cart"
          element={<Cart/>}
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              {" "}
              <SearchPage />
            </ProtectedRoute>
          }
        />
        // admin Routes
        <Route
          path="/dashboard"
          element={
            <AdminProtectedRoutes>
              {" "}
              <AdminDashboard />
            </AdminProtectedRoutes>
          }
        />
        <Route
          path="/dashboard/add"
          element={
            <AdminProtectedRoutes>
              {" "}
              <AddProducts />
            </AdminProtectedRoutes>
          }
        />
        <Route
          path="/dashboard/:productId"
          element={
            <AdminProtectedRoutes>
              <EditProducts />
            </AdminProtectedRoutes>
          }
        />
      </Routes>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
};

export default App;
