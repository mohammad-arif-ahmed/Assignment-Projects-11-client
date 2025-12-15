
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; // Import icons

const Footer = () => {
    return (
        <footer className="footer footer-center p-10 bg-neutral text-neutral-content mt-12">
            <aside>
                <h3 className="text-2xl font-bold">ContestHub</h3>
                <p>Providing the best platform for contests since 2024.</p>
                <p>Copyright © 2024 - All right reserved by ContestHub</p>
            </aside>
            <nav>
                <div className="grid grid-flow-col gap-4">
                    <a href="#" className="text-2xl"><FaFacebook /></a>
                    <a href="#" className="text-2xl"><FaTwitter /></a>
                    <a href="#" className="text-2xl"><FaInstagram /></a>
                </div>
            </nav>
        </footer>
    );
};

export default Footer;