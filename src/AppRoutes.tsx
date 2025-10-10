import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/layout";
import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import { UserProfilePage } from "./pages/UserProfilePage";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import { ManageRestaurantPage } from "./pages/ManageRestaurantPage";
import { SearchPage } from "./pages/SearchPage";
import { DetailsPage } from "./pages/DetailsPage";
import { OrderStatusPage } from "./pages/OrderStatusPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <Layout showHero>
            <HomePage />
          </Layout>
        }
      />
      <Route
        path='/auth-callback'
        element={<AuthCallbackPage />}
      />
      <Route
        path='/search/:city'
        element={
          <Layout>
            <SearchPage />
          </Layout>
        }
      />
      <Route
        path='/detail/:restaurantId'
        element={
          <Layout>
            <DetailsPage />
          </Layout>
        }
      />
      <Route element={<ProtectedRoute />}>
        <Route
          path='/user-profile'
          element={
            <Layout>
              <UserProfilePage />
            </Layout>
          }
        />
        <Route
          path='/order-status'
          element={
            <Layout>
              <OrderStatusPage />
            </Layout>
          }
        />
        <Route
          path='/manage-restaurant'
          element={
            <Layout>
              <ManageRestaurantPage />
            </Layout>
          }
        />
      </Route>

      <Route
        path='*'
        element={<Navigate to={"/"} />}
      />
    </Routes>
  );
};
