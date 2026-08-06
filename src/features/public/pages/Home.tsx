
import Ticker from "../components/Ticker";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import StreakSection from "../components/StreakSection";
import Features from "../components/Features";
import Cards from "../components/Cards";
import HeroCTA from "../components/HeroCTA";
import FeaturesPlus from "../components/FeaturesPlus";
import Footer from "../components/Footer";

function Home() {
    return (
        <div className="home-page" >
            
            <Ticker />
            <Navbar />

            <div className="nav-divider top-divider"></div>

            {/* 🔥 HOME */}
            <section id="home">
                <Hero />
            </section>

            <div className="nav-divider bottom-divider"></div>

            {/* 🔥 STREAK (AS IT IS — DON'T TOUCH) */}
            <StreakSection />

            {/* 🔥 OPPORTUNITIES → Creator Platform */}
            <section id="plans">
                <Features />
            </section>

            {/* 🔥 PLANS → Electric Cards */}
            <section id="opportunities">
                <Cards />
            </section>

            <HeroCTA />

            <section id="promises">
                <FeaturesPlus />
            </section>

            <Footer />
        </div>
    );
}

export default Home;