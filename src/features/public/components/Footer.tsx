function Footer() {
    return (
        <footer className="guitara-footer">

            <div className="guitara-footer-container">

                {/* BRAND */}
                <div className="guitara-footer-brand">
                    <h2 className="guitara-footer-logo">
                        <img src="/images/Newlogo.png" alt="Guitara Logo" />
                    </h2>

                    <p>
                        Learn guitar at your own pace with expert-led video lessons and song tutorials.
                    </p>

                    <div className="guitara-footer-socials">
                        <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
                        <a href="#"><i className="fa-brands fa-instagram"></i></a>
                        <a href="#"><i className="fa-brands fa-twitter"></i></a>
                        <a href="#"><i className="fa-brands fa-youtube"></i></a>
                    </div>
                </div>

                {/* QUICK LINKS */}
                <div className="guitara-footer-links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#courses">Courses</a></li>
                        <li><a href="#Opportunities">Opportunities</a></li>
                        <li><a href="#promises">Promises</a></li>
                    </ul>
                </div>

                {/* COURSES */}
                <div className="guitara-footer-links special">
                    <h3>Courses</h3>
                    <ul>
                        <li>Beginner Level (Free)</li>
                        <li>Intermediate Level (Coming Soon)</li>
                        <li>Advanced Level (Coming Soon)</li>
                    </ul>
                </div>

                {/* CONTACT */}
                <div className="guitara-footer-contact">
                    <h3>Contact Us</h3>

                    <p><i className="fa-solid fa-envelope"></i> support@guitara.com</p>
                    <p><i className="fa-solid fa-phone"></i> +91 98765 43210</p>
                    <p><i className="fa-solid fa-location-dot"></i> Mumbai, Maharashtra, India</p>
                </div>

            </div>

            {/* BOTTOM BAR */}
            <div className="guitara-footer-bottom">
                <p>© 2026 Guitara. All rights reserved.</p>

                <div className="guitara-footer-policy">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                </div>
            </div>

        </footer>
    );
}

export default Footer;