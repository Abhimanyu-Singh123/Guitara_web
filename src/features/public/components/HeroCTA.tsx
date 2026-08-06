import { useAuthNavigation } from "../../../hooks/useAuthNavigation";

function HeroCTA() {
    const { goToLogin } = useAuthNavigation();

    return (
        <section className="hero-container">

            <div className="hero-content">

                <div className="pill-badge">
                    <span className="sparkle">✨</span> Start Your Journey Today
                </div>

                <h1 className="hero-heading">
                    Why Wait? Your Guitar Journey <br />
                    <span className="highlight">Starts Here, Right Now</span>
                </h1>

                <p className="subtext">
                    Sign in with Google and access 20+ free beginner lessons instantly.<br />
                    No strings attached, just pure learning.
                </p>

                <button
                    id="promises"
                    className="cta-button advanced"
                    onClick={goToLogin}
                >
                    <span className="emoji">▶️</span>
                    <b>Start Learning Free</b>
                </button>

            </div>

        </section>
    );
}

export default HeroCTA;