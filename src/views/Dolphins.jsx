import { Link } from 'react-router-dom';
import dolphins from '../assets/dolphins.png';
import figma from '../assets/figma.png';
import code from '../assets/code.png'


export default function Dolphins() {
    return (
<div className="min-h-screen flex items-center justify-center bg-primary-white p-4">
    <div className="text-center bg-secondary-grey p-8 rounded-lg shadow-lg max-w-2xl ">
        <img
          src={dolphins}
          alt="Team Dolphins"
          className="w-full max-w-md mx-auto mb-6"
        />
        <p className="text-primary-red text-header text-xl font-semibold mb-4 ">
          🦄Julia  |🐬Maja |🦭Emil
        </p>
        <div className="mt-6 text-primary-black">
          <h2 className="text-subheader text-4xl mb-2">Welcome fellow young students!</h2>
          <p className="text-body text-xl">
            We wish you a wonderful (presentation) experience!
          </p>
        <div className="flex justify-center gap-8 mt-4">
            <a href="https://www.figma.com/proto/c2vcJFC3CVWSG0tPZIcUZA/Prototype?page-id=0%3A1&node-id=227-457&viewport=2546%2C1794%2C0.63&t=L0yAgkoJ0q8U3MuS-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=372%3A3302" target="_blank" rel="noopener noreferrer">
                <img src={figma} className="w-16 h-auto p-2" alt="Figma Prototype" />
            </a>
            <Link to="/">
                <img src={code} className="w-16 h-auto p-2 mt-6" alt="Code" />
            </Link>
        </div>
        </div>
    </div>
</div>
    )
} 