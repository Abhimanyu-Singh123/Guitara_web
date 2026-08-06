function StreakSection() {

    const users = [
        { name: "Rahul", img: "headerimg1.jpg", streak: 365 },
        { name: "Ananya", img: "headerimg2.jpg", streak: 250 },
        { name: "Arjun", img: "headerimg3.jpg", streak: 200 },
        { name: "Kavya", img: "headerimg4.jpg", streak: 100 },
        { name: "Neeraj", img: "headerimg5.jpeg", streak: 90 },
    ];

    const loopData = [...users, ...users]; // 🔥 duplicate

    return (
        <section className="streak-section">

            <div className="streak-header">
                <h1>
                    <img src="/images/fire.png" className="streak-new" />
                    Top Streakers
                </h1>
                <p>Consistency Creates Legends</p>
            </div>

            <div className="streak-slider">
                <div className="streak-track">

                    {loopData.map((user, i) => (
                        <div className="streak-card" key={i}>
                            <img src={`/images/${user.img}`} />
                            <h3>{user.name}</h3>

                            <div className="streak-count">
                                🔥 {user.streak} Day Streak
                            </div>

                            <p>"Practice daily. No excuses."</p>

                            {/* 🔥 SOCIAL ICONS BACK */}
                            <div className="social-links">
                                <a href="#"><i className="fa-brands fa-instagram"></i></a>
                                <a href="#"><i className="fa-brands fa-youtube"></i></a>
                            </div>

                        </div>
                    ))}

                </div>
            </div>

        </section>
    );
}

export default StreakSection;