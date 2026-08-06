import { useAuthNavigation } from "../../../hooks/useAuthNavigation";
function FeaturesPlus() {
    const { goToLogin } = useAuthNavigation();

    return (
        <>
            {/* FEATURES GRID */}
            <section className="features">

                <div className="features-grid">

                    {[
                        { icon: "🎧", title: "Your Musical Journey Awaits", text: "Transform your passion into skill. Every great guitarist started exactly where you are now.", color: "orange" },
                        { icon: "⏳", title: "Learn at Your Own Pace", text: "No pressure, no deadlines. Progress through lessons designed for YOUR success.", color: "green" },
                        { icon: "🎖️", title: "Master Real Songs", text: "Play the songs you love from day one. Build confidence with every chord you learn.", color: "purple" },
                        { icon: "🛡️", title: "Join a Community of Learners", text: "You're not alone. Thousands of students are learning alongside you every day.", color: "red" },
                        { icon: "🚨", title: "100% Free to Start", text: "No credit card required. No hidden fees. Just pure learning, completely free.", color: "yellow" },
                        { icon: "♾️", title: "Unlock Your Potential", text: "The guitar you've always dreamed of playing is just a sign-in away. Take the first step today.", color: "blue" },
                    ].map((item, i) => (
                        <div key={i} className={`card ${item.color}`}>
                            <span>{item.icon}</span>
                            <h3>{item.title}</h3>
                            <p>{item.text}</p>
                        </div>
                    ))}

                </div>
            </section>

            {/* CTA SECTION */}
            <section className="guitara-cta-section">

                <div className="guitara-wrapper">

                    <div className="guitara-main-card">
                        <h1>
                            "The best time to start was yesterday.
                            <span>The second best time is now."</span>
                        </h1>

                        <p>Don't let another day go by wishing you could play. Take action now.</p>

                        <button className="guitara-cta-btn" onClick={goToLogin}>
                             Yes, I'm Ready to Start
                        </button>
                    </div>

                    <div className="guitara-stats">

                        <div className="guitara-stat-box">
                            <h2 className="guitara-stat-orange">10K+</h2>
                            <p>Active Students</p>
                        </div>

                        <div className="guitara-stat-box">
                            <h2 className="guitara-stat-green">20+</h2>
                            <p>Video Lessons</p>
                        </div>

                        <div className="guitara-stat-box">
                            <h2 className="guitara-stat-purple">30+</h2>
                            <p>Songs Covered</p>
                        </div>

                        <div className="guitara-stat-box">
                            <h2 className="guitara-stat-blue">FREE</h2>
                            <p>Beginner Access</p>
                        </div>

                    </div>

                </div>

            </section>
        </>
    );
}

export default FeaturesPlus;