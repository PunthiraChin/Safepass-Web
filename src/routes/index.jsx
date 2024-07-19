import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CustomerRedirectLogin from "../features/authentication/components/CustomerRedirectLogin";
import ProtectedRoute from "../features/authentication/components/ProtectedRoute";
import RedirectLogin from "../features/authentication/components/RedirectLogin";
import AdminEventPage from "../pages/AdminEventPage";
import UserPage from "../pages/UserPage";
const MainContainer = lazy(() => import("../layouts/MainContainer"));
const AdminHomepage = lazy(() => import("../pages/AdminHomepage"));
const CheckoutPage = lazy(() => import("../pages/CheckoutPage"));
const EventPage = lazy(() => import("../pages/EventPage"));
const Homepage = lazy(() => import("../pages/Homepage"));
const ProfilePage = lazy(() => import("../pages/UserPage"));
const TransactionPage = lazy(() => import("../pages/TransactionPage"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainContainer />,
    children: [
      {
        path: "/",
        element: (
          <RedirectLogin>
            <Homepage />
          </RedirectLogin>
        ),
      },
      {
        path: "/event/:eventId",
        element: (
          <RedirectLogin>
            <EventPage />
          </RedirectLogin>
        ),
      },
      {
        path: "/event/:eventId/checkout",
        element: (
          <ProtectedRoute>
            <RedirectLogin>
              <CheckoutPage />
            </RedirectLogin>
          </ProtectedRoute>
        ),
      },
      {
        path: "/event/:eventId/transaction/:txnId",
        element: (
          <ProtectedRoute>
            <RedirectLogin>
              <TransactionPage />
            </RedirectLogin>
          </ProtectedRoute>
        ),
      },
      {
        path: "/user",
        element: (
          <ProtectedRoute>
            <RedirectLogin>
              <UserPage profile={true} />
            </RedirectLogin>
          </ProtectedRoute>
        ),
      },
      {
        path: "/user/transactions",
        element: (
          <ProtectedRoute>
            <RedirectLogin>
              <UserPage profile={false} />
            </RedirectLogin>
          </ProtectedRoute>
        ),
      },

      {
        path: "/admin",
        element: (
          <ProtectedRoute>
            <CustomerRedirectLogin>
              <AdminHomepage />
            </CustomerRedirectLogin>
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/event",
        element: (
          <ProtectedRoute>
            <CustomerRedirectLogin>
              <AdminEventPage />
            </CustomerRedirectLogin>
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/event/:eventId",
        element: (
          <ProtectedRoute>
            <CustomerRedirectLogin>
              <AdminEventPage />
            </CustomerRedirectLogin>
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <Homepage />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
