import "../../app/styles/CreatorSpotlight.css";
import { Star, Award, TrendingUp } from "lucide-react";
import { useState } from "react";

const CreatorSpotlight = () => {
    const creatorsData = [
        {
            id: "rahul",
            name: "Rahul Sharma",
            bio: "Fingerstyle guitarist • Winner March 2026 • Teaching guitar for 5+ years",
            avatar: "/images/user1.jpg",
            instagram: "https://instagram.com/rahulsguitar",
            youtube: "https://youtube.com/@RahulGuitarTutorials",
            video: "/videos/rahul.mp4",
            followers: "12.5K",
            videos: 45
        },
        {
            id: "priya",
            name: "Priya Patel",
            bio: "Acoustic covers specialist • Winner March 2026 • Bollywood enthusiast",
            avatar: "/images/user2.jpg",
            instagram: "https://instagram.com/priya_plays_guitar",
            youtube: "https://youtube.com/@PriyaGuitarCovers",
            video: "/videos/priya.mp4",
            followers: "8.2K",
            videos: 32
        },

        // बाकी 8 भी same pattern 👇
        {
            id: "arjun",
            name: "Arjun Verma",
            bio: "Acoustic guitarist • Feb Winner • Live performer",
            avatar: "/images/user3.jpg",
            instagram: "#",
            youtube: "#",
            video: "/videos/arjun.mp4",
            followers: "9.1K",
            videos: 28
        },
        {
            id: "neha",
            name: "Neha Kapoor",
            bio: "Melodic covers • Feb Winner • Singer & Guitarist",
            avatar: "/images/user4.jpg",
            instagram: "#",
            youtube: "#",
            video: "/videos/neha.mp4",
            followers: "7.4K",
            videos: 22
        },
        {
            id: "rohit",
            name: "Rohit Singh",
            bio: "Fingerstyle expert • Jan Winner",
            avatar: "/images/user5.jpg",
            instagram: "#",
            youtube: "#",
            video: "/videos/rohit.mp4",
            followers: "11K",
            videos: 35
        },
        {
            id: "ananya",
            name: "Ananya Gupta",
            bio: "Soft covers • Jan Winner",
            avatar: "/images/user6.jpg",
            instagram: "https://instagram.com/mihika__",
            youtube: "#",
            video: "/videos/ananya.mp4",
            followers: "6.9K",
            videos: 20
        },
        {
            id: "karan",
            name: "Karan Mehta",
            bio: "Live guitarist • Dec Winner",
            avatar: "/images/user7.jpg",
            instagram: "#",
            youtube: "#",
            video: "/videos/karan.mp4",
            followers: "10K",
            videos: 30
        },
        {
            id: "simran",
            name: "Simran Kaur",
            bio: "Acoustic vibes • Dec Winner",
            avatar: "/images/user8.jpg",
            instagram: "#",
            youtube: "#",
            video: "/videos/simran.mp4",
            followers: "8.8K",
            videos: 26
        },
        {
            id: "aman",
            name: "Aman Yadav",
            bio: "Bollywood covers • Nov Winner",
            avatar: "/images/user9.jpg",
            instagram: "https://instagram.com/guitarwithaman",
            youtube: "#",
            video: "/videos/aman.mp4",
            followers: "7.9K",
            videos: 21
        },
        {
            id: "isha",
            name: "Isha Jain",
            bio: "Melody queen • Nov Winner",
            avatar: "/images/user10.jpg",
            instagram: "#",
            youtube: "#",
            video: "/videos/isha.mp4",
            followers: "9.5K",
            videos: 27
        }
    ];
    const [activeVideo, setActiveVideo] = useState<string | null>(null);
    const getFollowers = (id: string) => {
        const seed = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
        const value = (seed % 10) + 5 + (seed % 3) * 0.1;
        return value.toFixed(1) + "K";
    };
    return (
        
        <div className="creator-container">

            {/* TOP HEADING */}
            <div className="creator-header">
                <h1>Creator Spotlight</h1>
                <p>Supporting talented guitarists who deserve recognition</p>
            </div>

            {/* MISSION CARD */}
            <div className="creator-card">

                <div className="icon-box">
                    <Star size={28} />
                </div>

                <div className="card-bhaiya">
                    <h2>Our Mission</h2>
                    <p>
                        We help talented guitar creators grow their audience on social media.
                        Many amazing musicians struggle to get discovered despite their incredible skills.
                        Through our platform, we spotlight contest winners and give them the visibility they deserve.
                    </p>

                    <div className="tags">
                        <span className="tag">
                            <Award size={16} /> Only contest winners featured
                        </span>

                        <span className="tag">
                            <TrendingUp size={16} /> Helping creators grow
                        </span>
                    </div>
                </div>

            </div>
            <div className="creator-grid">
                {creatorsData.map(user => (
                    <div className="creator-card2" key={user.id}>

                        <div className="top-row">
                            <img src={user.avatar} className="creator-avatar" />
                            <span className="creator-badge">✨ Contest Winner</span>
                        </div>

                        <h2>{user.name}</h2>
                        <p className="bio">{user.bio}</p>

                        <div className="creator-stats">
                            <div>
                                <b>{getFollowers(user.id)}</b>
                                <span>Followers</span>
                            </div>
                            <div>
                                <b>{user.videos}</b>
                                <span>Videos</span>
                            </div>
                        </div>

                        {/* INSTAGRAM */}
                        <a href={user.instagram} target="_blank" className="social-row">
                            <div className="left">
                                <i className="ri-instagram-fill insta"></i>
                                <div>
                                    <b>@{user.instagram.split("/").pop()}</b>
                                    <span>Instagram</span>
                                </div>
                            </div>
                            <i className="ri-external-link-line"></i>
                        </a>

                        {/* YOUTUBE */}
                        <a href={user.youtube} target="_blank" className="social-row yt-hover">
                            <div className="left">
                                <i className="ri-youtube-fill yt"></i>
                                <div>
                                    <b>{user.name} Channel</b>
                                    <span>YouTube</span>
                                </div>
                            </div>
                            <i className="ri-external-link-line"></i>
                        </a>

                        <button className="creator-watch-btn"
                            onClick={() => setActiveVideo(user.video)}
                        >
                            ⭐ Watch Best Video
                        </button>

                    </div>
                    
                ))}
            </div>
            {activeVideo && (
                <div className="video-modal" onClick={() => setActiveVideo(null)}>
                    <div className="video-container" onClick={(e) => e.stopPropagation()}>
                        <video src={activeVideo} controls autoPlay />
                    </div>
                </div>
            )}
        </div>
        
        
    );
};

export default CreatorSpotlight;