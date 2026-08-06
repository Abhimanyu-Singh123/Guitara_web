type Props = {
    isLoggedIn: boolean;
    onLogin: () => void;
    onLogout: () => void;
};

function Navbar({ isLoggedIn, onLogin, onLogout }: Props) {
    return (
        <div style={{
            padding: "10px 20px",
            background: "#111",
            color: "white",
            display: "flex",
            justifyContent: "space-between"
        }}>
            <h2>Guitara 🎸</h2>

            {isLoggedIn ? (
                <button onClick={onLogout}>Logout</button>
            ) : (
                <button onClick={onLogin}>Login</button>
            )}
        </div>
    );
}

export default Navbar;