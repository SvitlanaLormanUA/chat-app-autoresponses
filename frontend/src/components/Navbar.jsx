import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <div className="navbar-flex">
          <div className="navbar-logo-container">
            <Link to="/" className="navbar-logo-link">
              <div className="navbar-logo-icon">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="navbar-logo-text">Chatty</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/settings" className="navbar-btn navbar-btn-small">
              <Settings className="w-4 h-4" />
              <span className="hidden-sm">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link to="/profile" className="navbar-btn navbar-btn-small">
                  <User className="size-5" />
                  <span className="hidden-sm">Profile</span>
                </Link>

                <button className="navbar-btn" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden-sm">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
