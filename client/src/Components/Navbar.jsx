import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div>
            <div className="container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
                <Link
                    to="/dashboard"
                    className="text-gray-800 hover:text-blue-800 focus:border-b-2 focus:border-blue-500 mx-1.5 sm:mx-6"
                >
                    Dashboard
                </Link>

                <Link
                    to="/tasks"
                    className="text-gray-800 hover:text-blue-800 focus:border-b-2 focus:border-blue-500 mx-1.5 sm:mx-6"
                >
                    Tasks Management
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
