import Slider from "./Slider";

function Hero() {
    return (
        <section className="hero">

            {/* 🔥 Background Video */}
            <div className="hero-video">
                <video autoPlay muted loop playsInline>
                    <source src="/images/hero-sec-video.mp4" type="video/mp4" />
                </video>
            </div>
            {/* LEFT CONTENT */}
            <div className="hero-left">
                <h1 className="brand">
                    Guitara
                    <span className="brand-line"></span>
                </h1>
                <h2>
                    Master the Guitar<br></br>
                    <span>Your Way, Your Pace</span>
                </h2>

                <p>
                India's First Creator-Powered Learning Website<br></br>Offering Viral Song Lessons, Trend-Based Skills, and On-Demand Learning
                for India.<br></br>
                Start free today, Upgrade always on the way.
                </p>

                <button className="btn-secondary">
                    Grow with Guitara
                </button>
            </div>

            {/* RIGHT SLIDER */}
            <div className="hero-right">
                <Slider />
            </div>

            {/* Badge */}
            <div className="students-badge">
                10k+ Students Learning
            </div>
        </section>
        
    );
    
}

export default Hero;