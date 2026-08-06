import Sidebar from "../components/Sidebar";
import "../../app/styles/dashboard.css";
import { FaFire, FaClock, FaMusic, FaChartLine } from "react-icons/fa";
import { FaTrophy, FaStar, FaMedal } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import MyPractice from "./MyPractice";
import { useState, useRef,useEffect } from "react";
import Lessons from "./Lessons";
import Contests from "./Contests";
import CreatorSpotlight from "./CreatorSpotlight";
function Dashboard() {
    
    const tasksRef = useRef<HTMLDivElement | null>(null);
    const totalTime = 40; // 🔥 define FIRST

    const generateTasks = (time: number) => {
        const baseTasks = [
            { title: "Practice any song for 10 minutes" },
            { title: "Learn new song: Ganga Ke Kinare" },
            { title: "Record your first practice session" }
        ];

        const perTask = Math.floor(time / baseTasks.length);

        return baseTasks.map((task, i) => ({
            ...task,
            time: i === baseTasks.length - 1
                ? time - perTask * (baseTasks.length - 1)
                : perTask
        }));
    };

    const tasks = generateTasks(totalTime); // 🔥 NOW tasks exists

    // ✅ NOW safe
    const [tasksState, setTasksState] = useState(
        tasks.map(task => ({ ...task, done: false }))
    );

    const toggleTask = (index: number) => {
        const updated = [...tasksState];
        updated[index].done = !updated[index].done;
        setTasksState(updated);
    };

    const completedTime = tasksState
        .filter(t => t.done)
        .reduce((acc, t) => acc + t.time, 0);

    const progress = Math.round((completedTime / totalTime) * 100);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activePage, setActivePage] = useState("Dashboard");
    const scrollToTasks = () => {
        tasksRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(() => {
        const container = document.querySelector(".main-content");
        if (container) {
            container.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    }, [activePage]);

    return (
        
        
        <div className="dashboard-page">
            <div className="dashboard">
                <button
                    className="menu-toggle"
                    onClick={() => setSidebarOpen(prev => !prev)}
                >
                    <FaBars />
                </button>
                {/* SIDEBAR */}
                <Sidebar
                    activePage={activePage}
                    setActivePage={setActivePage}
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />
                {sidebarOpen && (
                    <div
                        className="sidebar-overlay"
                        onClick={() => setSidebarOpen(false)}
                    ></div>
                )}

                {/* MAIN CONTENT */}
                <div className={`main-content ${activePage === "Lessons" ? "no-top" : ""}`}>
                    {activePage === "Dashboard" && (
                        <>

                    {/* TOP SECTION */}
                    <div className="hero">

                        {/* LEFT */}
                        <div className="hero-left">
                            <p className="streak-text">
                                <FaFire /> Keep your streak alive!
                            </p>

                            <h1>Welcome back, Akash!</h1>

                            <p className="sub-text">
                                7 day streak · Ready for today’s practice?
                            </p>
                        </div>

                        {/* RIGHT CARD */}
                        <div className="practice-card">
                                    <button
                                        className="play-icon"
                                        onClick={scrollToTasks}
                                    >
                                        ▶
                                    </button>
                            

                            <p className="small">Today's Practice</p>

                            <h3>Chord Transitions</h3>

                            <p className="time">⏱ 30-45 minutes</p>

                                    <button
                                        className="start-btn"
                                        onClick={scrollToTasks}
                                    >
                                        Start Practice
                                    </button>

                        </div>

                    </div>

                    {/* STATS */}
                    <div className="stats">

                        <div className="stat-card">
                            <div className="stat-icon fire">
                                <FaFire />
                            </div>
                            <p>Current Streak</p>
                            <h2>7 Days</h2>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon blue">
                                <FaClock />
                            </div>
                            <p>Total Practice</p>
                            <h2>24.5 hrs</h2>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon purple">
                                <FaMusic />
                            </div>
                            <p>Songs Completed</p>
                            <h2>12</h2>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon green">
                                <FaChartLine />
                            </div>
                            <p>Overall Progress</p>
                            <h2>67%</h2>
                        </div>
                    </div>
                            <div className="tasks-container" ref={tasksRef}>

                        {/* LEFT SIDE */}
                        <div className="tasks-left">

                            <div className="tasks-header">
                                <div className="tasks-icon">🎯</div>
                                <div>
                                    <h3>Today's Practice</h3>
                                    <p>Let's master some chords!</p>
                                </div>
                            </div>

                            <div className="task-list">
                                {tasksState.map((task, index) => (
                                    <div key={index} className="task-item">

                                        <div
                                            className={`checkbox ${task.done ? "checked" : ""}`}
                                            onClick={() => toggleTask(index)}
                                        >
                                            {task.done && "✓"}
                                        </div>

                                        <span className={task.done ? "done-text" : ""}>
                                            {task.title} ({task.time} mins)
                                        </span>

                                    </div>
                                ))}
                            </div>

                                    <button
                                        className="start-session-btn"
                                        onClick={() => setActivePage("Lessons")}
                                    >
                                        Start Practice Session
                                    </button>

                        </div>

                        {/* RIGHT SIDE */}
                        <div className="tasks-right">
                            <div
                                className="progress-circle"
                                style={{ "--progress": progress } as React.CSSProperties}
                            >
                                <span className="progress-value">{progress}%</span>
                                <span className="progress-text">Completed</span>
                               
                            </div>
                        </div>

                    </div>
                    <div className="bottom-section">

                        {/* LEFT - ACHIEVEMENTS */}
                        <div className="achievements-card">

                            <h3 className="section-title">🏅 Recent Achievements</h3>

                            <div className="achievement-item">
                                <FaTrophy className="ach-icon gold" />
                                <div>
                                    <p className="title">7-Day Streak!</p>
                                    <span>Earned 2 days ago</span>
                                </div>
                            </div>

                            <div className="achievement-item">
                                <FaStar className="ach-icon yellow" />
                                <div>
                                    <p className="title">First Song Mastered</p>
                                    <span>Earned 5 days ago</span>
                                </div>
                            </div>

                            <div className="achievement-item">
                                <FaMedal className="ach-icon orange" />
                                <div>
                                    <p className="title">Practice Master</p>
                                    <span>Earned 1 week ago</span>
                                </div>
                            </div>

                        </div>

                        {/* RIGHT - WEEK PROGRESS */}
                        <div className="week-card">

                            <h3 className="section-title">This Week</h3>

                            {/* PRACTICE */}
                            <div className="progress-item">
                                <div className="label">
                                    <span>Practice Goal</span>
                                    <span className="text-orange">5 / 7 days</span>
                                </div>
                                <div className="bar">
                                    <div className="fill orange" style={{ width: "70%" }}></div>
                                </div>
                            </div>

                            {/* TIME */}
                            <div className="progress-item">
                                <div className="label">
                                    <span>Time Goal</span>
                                    <span className="text-blue">3.5 / 5 hrs</span>
                                </div>
                                <div className="bar">
                                    <div className="fill blue" style={{ width: "70%" }}></div>
                                </div>
                            </div>

                            {/* SONGS */}
                            <div className="progress-item">
                                <div className="label">
                                    <span>New Songs</span>
                                    <span className="text-green">2 / 3 songs</span>
                                </div>
                                <div className="bar">
                                    <div className="fill green" style={{ width: "66%" }}></div>
                                </div>
                            </div>

                        </div>

                    </div>
                        </>
                    )}
                    {activePage === "My Practice" && <MyPractice />}  
                    {activePage === "Lessons" && <Lessons />}   
                    {activePage === "Contests" && <Contests />}
                    {activePage === "Creator Spotlight" && <CreatorSpotlight />}
                    
                </div>
            </div>
        </div>
        
    );

}

export default Dashboard;