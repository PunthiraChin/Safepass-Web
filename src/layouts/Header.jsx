import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginModalContext } from "../contexts/LoginModalContext";
import { AuthContext } from "../features/authentication/contexts/AuthContext";
import useAuthContext from "../hooks/useAuthContext";

export default function Header() {
  const navigate = useNavigate();
  const { authUser, setAuthUser, login, logout, isAuthUserLoading } =
    useAuthContext();
  const { isLoginModalOpen, setIsLoginModalOpen } =
    useContext(LoginModalContext);
  const handleClickLogin = () => {
    setIsLoginModalOpen(true);
  };

  return (
    <header className="w-screen bg-neutral-800 shadow-lg shadow-neutral-900 fixed z-50">
      <div className="navbar bg-neutral-800">
        <div className="flex-1">
          <Link
            to="/"
            className="text-teal-500 btn btn-ghost text-2xl font-semibold tracking-wider"
          >
            SAFEPASS
          </Link>
        </div>
        <div className="flex-none gap-2">
          {/* <div className="form-control">
            <input
              type="text"
              placeholder="Search Event"
              className="input input-bordered w-24 md:w-auto"
            />
          </div> */}

          {authUser ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar bg-teal-500 text-xl text-white font-semibold"
              >
                {authUser.email[0].toUpperCase()}
              </div>

              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="/user" className="justify-between">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/user/transactions" className="justify-between">
                    Transaction History
                  </Link>
                </li>
                <li>
                  <button onClick={logout}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <button
              onClick={handleClickLogin}
              className="bg-teal-500 px-4 py-2 mx-4 text-white rounded-lg"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
