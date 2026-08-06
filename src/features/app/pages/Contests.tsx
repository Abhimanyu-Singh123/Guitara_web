import "../styles/Contests.css";
import { FaTrophy, FaClock, FaUsers, FaUser, FaEnvelope, FaPhone, FaMusic, FaInstagram, FaUpload } from "react-icons/fa";
import { useState, useEffect } from "react";
import { FaEye, FaHeart } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";


function Contests() {
    const [showForm, setShowForm] = useState(false);
    const [views, setViews] = useState<any>({});
    const [likes, setLikes] = useState<any>({});
    const [activeVideo, setActiveVideo] = useState<string | null>(null);
    const [displayViews, setDisplayViews] = useState<any>({});

    const winnersData = [
        { id: "rahul", name: "Rahul Sharma", song: "Tum Hi Ho Cover", video: "/videos/rahul.mp4", avatar: "/images/user1.jpg", month: "March 2026" },
        { id: "priya", name: "Priya Patel", song: "Channa Mereya Cover", video: "/videos/priya.mp4", avatar: "/images/user2.jpg", month: "March 2026" },
        { id: "arjun", name: "Arjun Verma", song: "Kesariya Acoustic", video: "/videos/arjun.mp4", avatar: "/images/user3.jpg", month: "Feb 2026" },
        { id: "neha", name: "Neha Kapoor", song: "Raabta Cover", video: "/videos/neha.mp4", avatar: "/images/user4.jpg", month: "Feb 2026" },
        { id: "rohit", name: "Rohit Singh", song: "Tum Mile Cover", video: "/videos/rohit.mp4", avatar: "/images/user5.jpg", month: "Jan 2026" },
        { id: "ananya", name: "Ananya Gupta", song: "Husn Cover", video: "/videos/ananya.mp4", avatar: "/images/user6.jpg", month: "Jan 2026" },
        { id: "karan", name: "Karan Mehta", song: "Apna Bana Le", video: "/videos/karan.mp4", avatar: "/images/user7.jpg", month: "Dec 2025" },
        { id: "simran", name: "Simran Kaur", song: "Tera Ban Jaunga", video: "/videos/simran.mp4", avatar: "/images/user8.jpg", month: "Dec 2025" },
        { id: "aman", name: "Aman Yadav", song: "Dil Diyan Gallan", video: "/videos/aman.mp4", avatar: "/images/user9.jpg", month: "Nov 2025" },
        { id: "isha", name: "Isha Jain", song: "Raataan Lambiyan", video: "/videos/isha.mp4", avatar: "/images/user10.jpg", month: "Nov 2025" },

    ];
    useEffect(() => {
        const savedViews = JSON.parse(localStorage.getItem("views") || "{}");
        const savedLikes = JSON.parse(localStorage.getItem("likes") || "{}");

        setViews(savedViews);
        setLikes(savedLikes);
    }, []);
    const handleWatch = (id: string, video: string) => {
        const newViews = { ...views, [id]: (views[id] || 0) + 1 };
        setViews(newViews);
        localStorage.setItem("views", JSON.stringify(newViews));

        setActiveVideo(video);
    };

    const handleLike = (id: string) => {
        const newLikes = { ...likes, [id]: (likes[id] || 0) + 1 };
        setLikes(newLikes);
        localStorage.setItem("likes", JSON.stringify(newLikes));
    };
    useEffect(() => {
        const interval = setInterval(() => {
            setDisplayViews((prev: any) => {
                const updated = { ...prev };

                winnersData.forEach((user) => {
                    const target = views[user.id] || 0;
                    const current = updated[user.id] || 0;

                    if (current < target) {
                        updated[user.id] = current + 1;
                    }
                });

                return updated;
            });
        }, 20);

        return () => clearInterval(interval);
    }, [views]);
    useEffect(() => {
        if (showForm) {
            document.body.classList.add("modal-open");
        } else {
            document.body.classList.remove("modal-open");
        }

        return () => {
            document.body.classList.remove("modal-open");
        };
    }, [showForm]);
    return (
        <div className="contests-page">
            <div className="contests-container">

                {/* HEADER */}
                <div className="contests-header">
                    <h1>Contests & Winners</h1>
                    <p>Showcase your skills and win amazing prizes</p>
                </div>

                {/* CONTEST CARD */}
                <div className="contest-card">

                    <div className="badge">
                        <FaTrophy /> ACTIVE CONTEST
                    </div>

                    <h2>Best Cover of "Kesariya"</h2>

                    <p className="reward">
                        <b className="winner">🏆 #Winner </b> will get on Creator Spotlight + ₹500
                    </p>

                    <div className="contest-info">
                        <span><FaClock /> 5 days remaining</span>
                        <span><FaUsers /> 127 participants</span>
                    </div>

                    <button className="submit-btn" onClick={() => setShowForm(true)}>
                        Submit Your Entry
                    </button>

                </div>

            </div>
            {showForm && (
                <div
                    className="modal-overlay"
                    onClick={() => setShowForm(false)}
            >
                    <div className="premium-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setShowForm(false)}>
                            <FaTimes />
                        </button>

                        <h2>🎸 Submit Your Entry</h2>

                        <form className="premium-form">

                            {/* NAME */}
                            <div className="input-group">
                                <FaUser />
                                <input type="text" required />
                                <label>Name</label>
                            </div>

                            {/* EMAIL */}
                            <div className="input-group">
                                <FaEnvelope />
                                <input type="email" required />
                                <label>Email</label>
                            </div>

                            {/* PHONE */}
                            <div className="input-group">
                                <FaPhone />
                                <input type="tel" required />
                                <label>Phone Number</label>
                            </div>

                            {/* SONG */}
                            <div className="input-group">
                                <FaMusic />
                                <select required defaultValue="">
                                    <option value=""></option>
                                    <option>Kesariya</option>
                                    <option>Husn</option>
                                </select>
                                <label>Select Song</label>
                            </div>

                            {/* SOCIAL */}
                            <div className="input-group">
                                <FaInstagram />
                                <input type="text" required />
                                <label>Instagram / Social ID</label>
                            </div>

                            {/* FILE */}
                            <div className="file-upload">
                                <FaUpload />
                                <input type="file" required />
                                <span>Upload your performance</span>
                            </div>

                            <button type="submit" className="premium-submit">
                                Submit Entry 🚀
                            </button>

                        </form>

                    </div>
                </div>
            )}
            <div className="winners-container">

                <div className="winners-header">
                    👑 Recent Winners
                </div>

                {winnersData.map((user, index) => (                    <div className="winner-card" key={user.id}>


                        {/* LEFT PART */}
                        <div className="winner-left">

                            {/* MEDAL / RANK */}
                            <div className={`rank-badge rank-${index + 1}`}>
                                {index === 0 && "🥇"}
                                {index === 1 && "🥈"}
                                {index === 2 && "🥉"}
                                {index > 2 && "⭐"}
                            </div>

                            <img src={user.avatar} className="avatar" />

                            <div>
                                <h3>
                                    {user.name}
                                    <span className="place-badge">
                                        {index === 0 && "1st Place"}
                                        {index === 1 && "2nd Place"}
                                        {index === 2 && "3rd Place"}
                                        {index > 2 && "Top 10"}
                                    </span>
                                </h3>

                                <p>{user.song}</p>

                                <div className="meta">
                                    <span className="view-counter">
                                        <FaEye /> {displayViews[user.id] || 0} views
                                    </span>
                                    <span
                                        className={`like-btn ${likes[user.id] ? "liked" : ""}`}
                                        onClick={() => handleLike(user.id)}
                                    >
                                        <FaHeart className="heart-icon" />
                                        {likes[user.id] || 0} likes
                                    </span>
                                    <span>📅 {user.month}</span>
                                </div>
                            </div>

                        </div>

                        {/* WATCH BUTTON */}
                        <button
                            className="watch-btn"
                            onClick={() => handleWatch(user.id, user.video)}
                        >
                            ▶ Watch
                        </button>

                    </div>
                ))}

            </div>
            {activeVideo && (
                <div className="video-modal" onClick={() => setActiveVideo(null)}>

                    {/* 🔥 BLUR BACKGROUND */}
                    <video
                        src={activeVideo}
                        autoPlay
                        muted
                        loop
                        className="video-bg"
                    />

                    {/* 🔥 MAIN REEL VIDEO */}
                    <div className="video-container" onClick={(e) => e.stopPropagation()}>
                        <video src={activeVideo} controls autoPlay className="main-video" />
                    </div>

                </div>
            )}

        </div>
    );
}

export default Contests;