import { useState, useMemo, useEffect } from "react";
import "../styles/lessons.css"; // agar alag css file bana rahe ho

const Lessons = () => {
    const [reactions, setReactions] = useState(() => {
        const saved = localStorage.getItem("lessonReactions");
        return saved ? JSON.parse(saved) : {};
    });
    useEffect(() => {
        localStorage.setItem("lessonReactions", JSON.stringify(reactions));
    }, [reactions]);
    const handleReaction = (title: string, type: "like" | "dislike") => {
        setReactions((prev: any) => {
            const current = prev[title] || { like: 0, dislike: 0, user: null };

            let newLike = current.like;
            let newDislike = current.dislike;

            // toggle logic
            if (type === "like") {
                if (current.user === "like") {
                    newLike--;
                    return { ...prev, [title]: { like: newLike, dislike: newDislike, user: null } };
                }
                if (current.user === "dislike") newDislike--;
                newLike++;
            } else {
                if (current.user === "dislike") {
                    newDislike--;
                    return { ...prev, [title]: { like: newLike, dislike: newDislike, user: null } };
                }
                if (current.user === "like") newLike--;
                newDislike++;
            }

            return {
                ...prev,
                [title]: {
                    like: newLike,
                    dislike: newDislike,
                    user: type
                }
            };
        });
    };
    const [activeIndex, setActiveIndex] = useState(-1);
    const [videoUrl, setVideoUrl] = useState("");
    

    const lessonsData = [
        {
            title: "Tum Hi Ho",
            artist: "Arijit Singh",
            level: "Beginner",
            duration: "07:55",
            image: "/images/tumhiho.png",
            video: "/videos/tumhiho.mp4"
        },
        {
            title: "Raabta",
            artist: "Arijit Singh",
            level: "Beginner",
            duration: "07:37",
            image: "/images/raabta.jpeg",
            video: "/videos/raabta.mp4"
        },
        {
            title: "Kesariya",
            artist: "Arijit Singh",
            level: "Beginner",
            duration: "06:23",
            image: "/images/kesariya.jpg",
            video: "/videos/kesariya.mp4"
        },
        {
            title: "Husn",
            artist: "Anuv Jain",
            level: "Intermediate",
            duration: "04:12",
            image: "/images/husn.jpeg",
            video: "/videos/husn.mp4"
        },
        {
            title: "Majboor",
            artist: "Sheheryar Rehan & Zoha Waseem",
            level: "Intermediate",
            duration: "03:16",
            image: "/images/majboor.jpeg",
            video: "/videos/majboor.mp4"
        },
        {
            title: "Tum Tak",
            artist: "AR Rahman",
            level: "Intermediate",
            duration: "04:36",
            image: "/images/tumtak.jpg",
            video: "/videos/tumtak.mp4"
        },
        {
            title: "Chaudhary",
            artist: "Amit Trivedi",
            level: "Beginner",
            duration: "03:22",
            image: "/images/chaudhary.jpeg",
            video: "/videos/chaudhary.mp4"
        },
        {
            title: "Qayde Se",
            artist: "Arijit Singh",
            level: "Intermediate",
            duration: "06:31",
            image: "/images/qaydese.jpeg",
            video: "/videos/qaydese.mp4"
        },
        {
            title: "Raanjhan",
            artist: "Parampara Tandon",
            level: "Beginner",
            duration: "03:05",
            image: "/images/raanjhan.jpeg",
            video: "/videos/raanjhan.mp4"
        },
        {
            title: "Ganga Ke Kinare",
            artist: "Bunny and Sagar",
            level: "Advanced",
            duration: "04:50",
            image: "/images/gangakekinare.jpeg",
            video: "/videos/gangakekinare.mp4"
        }
    ];
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState(false);

    const [recentSearches, setRecentSearches] = useState<string[]>(() => {
        const saved = localStorage.getItem("recentSearches");
        return saved ? JSON.parse(saved) : [];
    });
    const handleSearch = (text: string) => {
        if (!text.trim()) return;

        setQuery(text);

        setRecentSearches(prev => {
            const updated = [text, ...prev.filter(i => i !== text)].slice(0, 5);
            localStorage.setItem("recentSearches", JSON.stringify(updated));
            return updated;
        });

        setShowSearch(false);
    };
    const [activeFilter, setActiveFilter] = useState("All");
    const suggestions = useMemo(() => {
        if (!query) return [];

        return lessonsData
            .filter(l => l.title.toLowerCase().includes(query.toLowerCase()))
            .slice(0, 6);
    }, [query]);

    const filteredLessons = useMemo(() => {
        let data = [...lessonsData];

        // 🔍 SEARCH
        if (query.trim() !== "") {
            data = data.filter(l =>
                l.title.toLowerCase().includes(query.toLowerCase())
            );

            // 🔥 MATCHED SONGS TOP पर
            data.sort((a, b) => {
                const aMatch = a.title.toLowerCase().startsWith(query.toLowerCase());
                const bMatch = b.title.toLowerCase().startsWith(query.toLowerCase());
                return Number(bMatch) - Number(aMatch);
            });
        }

        // 🎯 FILTER
        if (activeFilter !== "All") {
            data = data.filter(l => l.level === activeFilter);
        }


        return data;
    }, [query, activeFilter]);
    useEffect(() => {
        setActiveIndex(-1);
    }, [query]);
    
    return (
        <div className="lessons-page">

            {/* 🔥 STICKY HEADER */}
            <div className="lessons-header sticky">

                <div className="lessons-title">
                    <h1>Lessons Library</h1>
                    <p>Master your favorite Hindi songs on guitar</p>
                </div>

                <div className="lessons-topbar">
                    <div className="lessons-search">

                        <i className="ri-search-line"></i>

                        <input
                            type="text"
                            placeholder="Search songs or artists..."
                            value={query}
                            onFocus={() => setShowSearch(true)}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => {
                                const list = query ? suggestions : recentSearches;

                                if (e.key === "ArrowDown") {
                                    e.preventDefault();
                                    setActiveIndex(prev => (prev + 1) % list.length);
                                }

                                if (e.key === "ArrowUp") {
                                    e.preventDefault();
                                    setActiveIndex(prev => (prev <= 0 ? list.length - 1 : prev - 1));
                                }

                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    if (activeIndex >= 0) {
                                        const selected = list[activeIndex];
                                        handleSearch(typeof selected === "string" ? selected : selected.title);
                                    } else {
                                        handleSearch(query);
                                    }
                                }
                            }}
                        />

                        {/* 🔥 RIGHT SEARCH BUTTON */}
                        <button
                            className="search-btn"
                            onClick={() => handleSearch(query)}
                        >
                            <i className="ri-search-line"></i>
                        </button>

                        {/* 🔥 DROPDOWN */}
                        {showSearch && (
                            <div className="search-dropdown">

                                {!query && recentSearches.length > 0 && (
                                    <>
                                        <div className="search-heading">
                                            Recent Searches
                                        </div>

                                        {recentSearches.map((item, i) => (
                                            <div
                                                key={i}
                                                className={`search-item ${i === activeIndex ? "active" : ""}`}
                                                onClick={() => handleSearch(item)}
                                            >
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                        
                                    </>
                                )}
                                {query && suggestions.length === 0 && (
                                    <div className="no-result">
                                        No results found
                                    </div>
                                )}

                                {query && suggestions.map((item, i) => (
                                    <div
                                        key={i}
                                        className={`search-item ${i === activeIndex ? "active" : ""}`}
                                        onClick={() => handleSearch(item.title)}
                                    >
                                        
                                        <span>{item.title}</span>
                                    </div>
                                ))}

                            </div>
                        )}

                    </div>

                    <div className="lesson-filters">
                        {["All", "Beginner", "Intermediate", "Advanced"].map((level) => (
                            <button
                                key={level}
                                className={activeFilter === level ? "active" : ""}
                                onClick={() => {
                                    setActiveFilter(level);
                                    setQuery("");
                                }}
                            >
                                {level}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* 🔥 CARDS */}
            <div className="lessons-grid">

                {filteredLessons.map((lesson, i) => (
                    <div key={i} className="lesson-card">

                        {/* IMAGE */}
                        <div className="card-img">
                            <img src={lesson.image} />

                            <span className={`level ${lesson.level.toLowerCase()}`}>
                                {lesson.level}
                            </span>

                            <span className="duration">
                                <i className="ri-time-line"></i> {lesson.duration}
                            </span>
                        </div>

                        {/* INFO */}
                        <div className="lesson-card-content">
                            <div className="title-row">
                                <h3>{lesson.title}</h3>

                                <div className="reaction-box">
                                    <button
                                        className={`react-btn ${reactions[lesson.title]?.user === "like" ? "active" : ""}`}
                                        onClick={() => handleReaction(lesson.title, "like")}
                                    >
                                        <i className="ri-thumb-up-line"></i>
                                        <span>{reactions[lesson.title]?.like || 0}</span>
                                    </button>

                                    <button
                                        className={`react-btn ${reactions[lesson.title]?.user === "dislike" ? "active" : ""}`}
                                        onClick={() => handleReaction(lesson.title, "dislike")}
                                    >
                                        <i className="ri-thumb-down-line"></i>
                                        <span>{reactions[lesson.title]?.dislike || 0}</span>
                                    </button>
                                </div>
                            </div>
                            <p>{lesson.artist}</p>

                            <div className="lesson-card-actions">

                                <button
                                    className="lesson-main-btn"
                                    onClick={() => setVideoUrl(lesson.video)}
                                >
                                    <i className="ri-play-fill"></i> Play Video
                                </button>

                                <a
                                    href={lesson.video}
                                    download
                                    className="lesson-download-btn"
                                >
                                    <i className="ri-download-2-line"></i> Download
                                </a>

                            </div>
                        </div>
                    </div>
                ))}

            </div>

            {/* 🔥 PAGINATION */}
            <div className="pagination">
                {[1, 2, 3, 8].map(num => (
                    <button key={num} className={num === 1 ? "active" : ""}>
                        {num}
                    </button>
                ))}
            </div>

            {/* 🔥 VIDEO MODAL */}
            {videoUrl && (
                <div className="video-modal" onClick={() => setVideoUrl("")}>
                    <video
                        src={videoUrl}
                        controls
                        autoPlay
                        onClick={(e) => e.stopPropagation()} // 🔥 IMPORTANT
                    />
            </div>
            )}

        </div>
    );
};

export default Lessons;