type Props = {
    days: number;
};

function Streak({ days }: Props) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <img src="/fire.png" style={{ width: "20px" }} />
            <span>{days} Day Streak</span>
        </div>
    );
}

export default Streak;