import { logout, loadUser } from '../utils/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';


export default function Header() {
    const user = loadUser();
    const location = useLocation();
    const navigate = useNavigate();
    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="sticky top-0 bg-white z-10">
            <div className="relative flex items-center justify-between px-4 py-2">
                <div className="absolute left-[10%] top-[16px] ">
                <img
                    src={logo}
                    alt="Logo"
                    className="w-[160px] h-auto rounded-full object-cover"
                />
                </div>
                <nav className="flex items-center gap-6 ml-auto mt-[16px] mr-[10%]">
                    {user ? (
                        <>
                            <Link
                                to="/dashboard"
                                className={`font-sans font-medium text-[var(--font-size-accent)] px-4 py-2 rounded-full transition-colors 
                                    ${
                                        isActive('/dashboard')
                                            ? '!text-[var(--color-primary-white)] bg-[var(--color-primary-red)]'
                                            : 'bg-[var(--color-primary-white)] text-[var(--color-primary-black)] border border-[var(--color-primary-grey)] hover:bg-[var(--color-primary-red)] hover:text-[var(--color-primary-white)]'
                                    }`}
                            >
                                Manage Games
                            </Link>
                            <Link
                                to="/import"
                                className={`font-sans font-medium text-[var(--font-size-accent)] px-4 py-2 rounded-full transition-colors 
                                    ${
                                        isActive('/import')
                                            ? 'bg-[var(--color-primary-red)] !text-[var(--color-primary-white)]'
                                            : 'bg-[var(--color-primary-white)] text-[var(--color-primary-black)] border border-[var(--color-primary-grey)] hover:bg-[var(--color-primary-red)] hover:text-[var(--color-primary-white)]'
                                    }`}
                            >
                                Import
                            </Link>
                        </>
                    ) : (
                        <>
                            <span className="font-sans font-medium text-[var(--font-size-accent)] px-4 py-2 rounded-full text-[var(--color-primary-grey)] cursor-not-allowed bg-[var(--color-primary-white)] border border-[var(--color-primary-grey)] ">
                                Manage Games
                            </span>
                            <span className="font-sans font-medium text-[var(--font-size-accent)] px-4 py-2 rounded-full text-[var(--color-primary-grey)] cursor-not-allowed bg-[var(--color-primary-white)] border border-[var(--color-primary-grey)] ">
                                Import
                            </span>
                        </>
                    )}
                </nav>
                {user ? (
                    <div className="flex items-center gap-4 m-lauto mr-[5%] mt-[16px] font-sans font-medium text-[var(--font-size-accent)]">
                        <span>Hello, {user.username}</span>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 rounded-full transition-colors bg-[var(--color-primary-white)] text-[var(--color-primary-black)] border border-[var(--color-primary-grey)] hover:bg-[var(--color-primary-red)] hover:text-[var(--color-primary-white)] cursor-pointer"
                        >
                            Logout
                        </button>
                    </div>
                ) : null}
            </div>
            <div className="h-px bg-primary-grey"></div>
        </header>
    );
}