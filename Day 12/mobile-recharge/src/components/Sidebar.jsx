import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-black text-white z-50
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Menu</h2>

          <nav className="flex flex-col gap-4">
            <Link
              to="/admin-login"
              onClick={onClose}
              className="text-blue-400 hover:text-white"
            >
              Admin
            </Link>

            <Link
              to="/user"
              onClick={onClose}
              className="text-blue-400 hover:text-white"
            >
              User
            </Link>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
