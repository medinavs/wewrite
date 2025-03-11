// Layout.js
import { Outlet } from 'react-router-dom';
import { Navbar } from '../ui/Navbar';

export function Layout() {
    return (
        <div className="min-vh-100 d-flex flex-column bg-light">
            <header>
                <Navbar />
            </header>
            <main className="flex-grow-1 py-4 px-3 px-md-4 px-lg-5">
                <Outlet />
            </main>
            <footer className="py-4 border-top bg-white">
                <div className="container-lg mx-auto px-3 px-md-4 px-lg-5 text-center text-muted small">
                    © 2025 WeWrite. All rights reserved.
                </div>
            </footer>
        </div>
    );
}