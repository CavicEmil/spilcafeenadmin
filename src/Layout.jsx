import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

export default function Layout() {
    const location = useLocation();
    const dolphinView = location.pathname === '/dolphins';
    
    return (
        <div className="flex flex-col min-h-screen">
            {!dolphinView && <Header />}
            <main className="grow"> 
                <Outlet />
            </main>
            <Footer />
        </div>
     )
}