import { Link } from '@inertiajs/react';
import { FaHome } from "react-icons/fa";

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
            
            <div>
                <Link href="/">
                    <FaHome className="text-5xl text-gray-500" />
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div>

        </div>
    );
}