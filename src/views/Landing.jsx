import { loadUser } from '../utils/auth';
import Login from '../components/Login';
import { Link } from 'react-router-dom';

export default function Landing() {
  const user = loadUser();

  return (
    <div className="max-w-md mx-auto">
      {user ? (
        <div className="bg-primary-grey p-8 rounded-lg text-center">
          <h2 className="text-primary-red text-header font-semibold mb-4">
            Welcome, {user.username}!
          </h2>
          <p className="text-primary-black">
            You are now logged in to the Spilcafeen admin panel.
          </p>
        </div>
      ) : (
        <div className="relative min-h-screen">
          <div className="flex flex-col h-full">
            <div className="flex-grow">
              <Login />
            </div>
            <div className="p-4 self-end">
              <Link to="/dolphins" className="text-primary-red hover:underline">
                Don't mind me
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}