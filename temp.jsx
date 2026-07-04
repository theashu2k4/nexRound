import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

function Navbar() {
  return (
    <nav className="w-full border-b border-gray-100 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* LEFT SECTION */}
        <div className="flex items-center gap-10">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-green-500 flex items-center justify-center text-white font-bold text-lg">
              i
            </div>

            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Interview<span className="text-green-500">Recap</span>
              </h1>
            </div>
          </Link>

          {/* NAV LINKS */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              to="/explore"
              className="text-gray-700 hover:text-green-500 font-medium transition"
            >
              Experiences
            </Link>

            <Link
              to="/guidance"
              className="text-gray-700 hover:text-green-500 font-medium transition"
            >
              AI Guidance
            </Link>

            <Link
              to="/mock-interviews"
              className="text-gray-700 hover:text-green-500 font-medium transition"
            >
              Mock Interviews
            </Link>

            <Link
              to="/companies"
              className="text-gray-700 hover:text-green-500 font-medium transition"
            >
              Companies
            </Link>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="hidden md:flex items-center bg-gray-100 rounded-xl px-4 py-2 w-[320px]">
          <FiSearch className="text-gray-500 text-lg" />

          <input
            type="text"
            placeholder="Search companies, roles..."
            className="bg-transparent outline-none px-3 text-sm w-full"
          />
        </div>

        {/* RIGHT SECTION */}
        <div className="hidden md:flex items-center gap-4">
          {/* SHARE EXPERIENCE BUTTON */}
          <Link
            to="/share"
            className="border border-green-500 text-green-500 px-5 py-2 rounded-xl font-medium hover:bg-green-50 transition"
          >
            Share Experience
          </Link>

          {/* LOGIN */}
          <Link
            to="/login"
            className="text-gray-700 font-medium hover:text-green-500 transition"
          >
            Login
          </Link>

          {/* REGISTER */}
          <Link
            to="/register"
            className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl font-medium transition"
          >
            Register
          </Link>
        </div>

        {/* MOBILE MENU */}
        <button className="md:hidden text-3xl text-gray-700">
          <HiOutlineMenuAlt3 />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
