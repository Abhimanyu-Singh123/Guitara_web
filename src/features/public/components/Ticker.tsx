function Ticker() {
    const items = [
        "🎸 Learn Guitar Easily",
        "🔥 Build Daily Streak",
        "🚀 Upload Your Lessons",
        "💰 Earn as Creator",
        "🎯 Practice Smart"
    ];

    return (
        <div className="ticker-container">
            <div className="ticker-track">
                {[...items, ...items].map((item, i) => (
                    <span key={i}>{item}</span>
                ))}
            </div>
        </div>
    );
}

export default Ticker;