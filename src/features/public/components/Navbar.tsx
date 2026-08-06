import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    return (
        <header className="navbar">

            {/* LOGO */}
            <div className="logo" onClick={() => navigate("/")}>
                <img src="/images/Newlogo.png" className="logo-img" alt="logo" />
            </div>

            {/* MENU */}
            <nav className="nav-menu">

                {/* 🔥 Scroll links (same UI behavior) */}
                <a
                    href="#promises"
                    onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
                    }}
                >
                    Home
                </a>
                <a
                    href="#plans"
                    onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" });
                    }}
                >
                    Opportunities
                </a>
                <a
                    href="#opportunities"
                    onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("opportunities")?.scrollIntoView({ behavior: "smooth" });
                    }}
                >
                    Plans
                </a>
                <a
                    href="#promises"
                    onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("promises")?.scrollIntoView({ behavior: "smooth" });
                    }}
                >
                    Promises
                </a>

                {/* 🔥 MAIN BUTTON */}
                <button className="btn-primary" onClick={() => navigate("/login")}>
                    Get Started
                </button>

            </nav>

        </header>
    );
}

export default Navbar;