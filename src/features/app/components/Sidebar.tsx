import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";

import { FaHome, FaUserFriends, FaCog, } from "react-icons/fa";
import { Sparkles } from "lucide-react";
import { MdEmojiEvents } from "react-icons/md";
import { MdLibraryMusic } from "react-icons/md";
import { RiPlayList2Fill } from "react-icons/ri";

/* ✅ PROPS TYPE FIX */
type SidebarProps = {
    sidebarOpen: boolean;
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    activePage: string;
    setActivePage: (page: string) => void;
};

/* ✅ USE PROPS */
function Sidebar({ sidebarOpen, setSidebarOpen, activePage, setActivePage }: SidebarProps) {

    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/", { replace: true });
    };

    return (
        <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>

            <div className="sidebar-logo">
                <img src="/images/Newlogo.png" className="sidebar-logo-img" />
                <span>Guitara</span>
            </div>
            

            <div className="close-btn" onClick={() => setSidebarOpen(false)}>✕</div>

            <div className="divider"></div>

            <div className="menu">

                {/* DASHBOARD */}
                <div className="menu-group">
                    <div
                        className={`menu-item ${activePage === "Dashboard" ? "active" : ""}`}
                        onClick={() => {
                            setActivePage("Dashboard");   /* ✅ FIX */
                            setSidebarOpen(false);
                        }}
                    >
                        <span className="menu-icon"><FaHome /></span>
                        <span className="text">Dashboard</span>
                    </div>
                </div>

                {/* MAIN MENU */}
                <div className="menu-group">
                    {[
                        
                        { name: "Lessons", icon: <RiPlayList2Fill /> },
                        { name: "My Practice", icon: <MdLibraryMusic /> },
                        { name: "Contests", icon: <MdEmojiEvents /> },
                        { name: "Creator Spotlight", icon: <Sparkles size={18} /> },
                    ].map((item) => (
                        <div
                            key={item.name}
                            className={`menu-item ${activePage === item.name ? "active" : ""}`}  /* ✅ FIX */
                            onClick={() => {
                                setActivePage(item.name);   /* ✅ FIX */
                                setSidebarOpen(false);
                            }}
                        >
                            <span className="menu-icon">{item.icon}</span>
                            <span className="text">{item.name}</span>
                        </div>
                    ))}
                </div>

                {/* EXTRA MENU */}
                <div className="menu-group">
                    {[
                        { name: "Community", icon: <FaUserFriends /> },
                        { name: "Settings", icon: <FaCog /> },
                    ].map((item) => (
                        <div
                            key={item.name}
                            className={`menu-item ${activePage === item.name ? "active" : ""}`}  /* ✅ FIX */
                            onClick={() => {
                                setActivePage(item.name);   /* ✅ FIX */
                                setSidebarOpen(false);
                            }}
                        >
                            <span className="menu-icon">{item.icon}</span>
                            <span className="text">{item.name}</span>
                        </div>
                    ))}
                </div>

            </div>

            <div className="divider"></div>

            {/* PROFILE */}
            <div className="profile-wrapper">

                <div className="profile-card">
                    <div className="avatar">A</div>

                    <div className="profile-info">
                        <h4>Akash Singh</h4>
                        <p>Abhimanyu@guitara.com</p>
                    </div>
                </div>

                <button className="logout-btn" onClick={handleLogout}>
                    <span className="logout-icon">➜]</span>
                    Sign Out
                </button>

            </div>

        </div>
    );
}

export default Sidebar;