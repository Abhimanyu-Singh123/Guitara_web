import { sendPasswordResetEmail } from "firebase/auth";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";

import googleIcon from "../../../assets/Googlelogo.png";
import { GoogleAuthProvider } from "firebase/auth";

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/loginstyle.css";

function LoginPage() {
    const handleGoogleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);

            console.log("User:", result.user);

            navigate("/app"); // 🔥 direct redirect
        } catch (error) {
            console.log(error);
        }
      };
    
    const navigate = useNavigate();

    const [isSignup, setIsSignup] = useState(false);
    const [showOtp, setShowOtp] = useState(false);
    const [showReset, setShowReset] = useState(false);
    // eslint-disable-next-line
    //const [otpMode, setOtpMode] = useState<"register" | "forgot">("register");
    const [showPassword, setShowPassword] = useState(false);
    const [showLoginPassword, setShowLoginPassword] = useState(false);

    const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
    const [otpSent, setOtpSent] = useState<boolean>(false);
    const [canSubmitOtp, setCanSubmitOtp] = useState(false);

    const [userEmail, setUserEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [showNewPass, setShowNewPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [passError, setPassError] = useState("");
    const [passSuccess, setPassSuccess] = useState("");
    const [resetSuccess, setResetSuccess] = useState("");
    const isValidPassword = (pass: string) => {
        return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(pass);
    };
    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email === email.toLowerCase();
    };
    const [loginError, setLoginError] = useState("");
    const [registerError, setRegisterError] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [otpSuccess, setOtpSuccess] = useState(false);

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const resetAllFields = () => {
        setUserEmail("");
        setLoginEmail("");   // 🔥 ADD THIS
        setLoginPassword("");
        setUserName("");     // 🔥 ADD THIS
        setOtp(["", "", "", ""]);
        setNewPass("");
        setConfirmPass("");
        setOtpSent(false);
    };
    useEffect(() => {
        if (showOtp) {
            setTimeout(() => {
                inputRefs.current[0]?.focus();
            }, 100);
        }
    }, [showOtp]);

    return (


        <div className="login-page">
            <div className={`auth-wrapper ${isSignup ? "toggled" : ""} ${showOtp ? "show-otp" : ""} ${showReset ? "show-reset" : ""}`}>

                <div className="background-shape"></div>
                <div className="secondary-shape"></div>

                {/* SIGN IN */}
                <div className="credentials-panel signin">
                    <h2 className="slide-element">Login</h2>

                    <form>
                        <div className="field-wrapper slide-element">
                            <input
                                type="email"
                                value={loginEmail}   // 🔥 ADD THIS
                                onChange={(e) => {
                                    setLoginEmail(e.target.value);
                                    setLoginError("");
                                }}
                                required
                            />
                            <label>Email</label>
                            <i className="fa-solid fa-user"></i>
                        </div>

                        <div className="field-wrapper slide-element">
                            <input
                                type={showLoginPassword ? "text" : "password"}
                                value={loginPassword}   // 🔥 ADD THIS
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setLoginPassword(value);

                                    if (isValidPassword(value)) {
                                        setLoginError("");
                                    }
                                }}
                                required
                            />
                            <label>Password</label>
                            <i
                                className={`fa-solid ${showLoginPassword ? "fa-eye-slash" : "fa-eye"}`}
                                onClick={() => setShowLoginPassword(!showLoginPassword)}
                            ></i>

                            <div className="forgot-pass">
                                <span
                                    onClick={async () => {
                                        if (!loginEmail) {
                                            setLoginError("Enter email first");
                                            return;
                                        }

                                        if (!isValidEmail(loginEmail)) {
                                            setLoginError("Invalid email");
                                            return;
                                        }

                                        try {
                                            await sendPasswordResetEmail(auth, loginEmail);

                                            setLoginError("");
                                            alert("Password reset link sent to your email 📩");

                                        } catch (error: any) {
                                            if (error.code === "auth/user-not-found") {
                                                setLoginError("No account with this email");
                                            } else {
                                                setLoginError("Error sending reset email");
                                            }
                                        }
                                    }}
                                >
                                    Forgot password?
                                </span>
                            </div>
                        </div>

                        <div className="field-wrapper slide-element">
                            <button
                                className="submit-button login-btn"
                                type="button"
                                onClick={async () => {
                                    if (!loginEmail || !loginPassword) {
                                        setLoginError("Enter email & password");
                                        return;
                                    }

                                    if (!isValidEmail(loginEmail)) {
                                        setLoginError("Invalid email");
                                        return;
                                    }

                                    try {
                                        await signInWithEmailAndPassword(auth, loginEmail, loginPassword);

                                        setLoginError("");

                                        // 🔥 SUCCESS LOGIN
                                        navigate("/app", { replace: true });

                                    } catch (error: any) {
                                        if (error.code === "auth/user-not-found") {
                                            setLoginError("User not found");
                                        } else if (error.code === "auth/wrong-password") {
                                            setLoginError("Wrong password");
                                        } else {
                                            setLoginError("Login failed");
                                        }
                                    }
                                }}
                            >
                                Login
                            </button>
                        </div>
                        {loginError && (
                            <p style={{ color: "red", fontSize: "12px" }}>
                                {loginError}
                            </p>
                        )}
                        <div className="google-login-btn slide-element" onClick={handleGoogleLogin}>
                            <img src={googleIcon} className="google-icon" />
                            <span>Continue with Google</span>
                        </div>

                        <div className="switch-link slide-element">

                            <p>
                                Don't have an account? <br />
                                <a onClick={(e) => {
                                    e.preventDefault();
                                    setIsSignup(true);

                                    setLoginError("");        // 🔥 add
                                    setRegisterError("");     // 🔥 add

                                    resetAllFields();
                                }}>

                                    Sign Up
                                </a>
                            </p>

                        </div>
                        <div className="mobile-home-btn slide-element">
                            <i
                                className="fa-solid fa-house"
                                onClick={() => navigate("/")}
                            ></i>
                            <p>Home</p>
                        </div>

                    </form>
                </div>

                <div className="welcome-section signin">
                    <h2 className="slide-element">WELCOME BACK!</h2>
                </div>

                {/* SIGN UP */}
                <div className="credentials-panel signup">
                    <h2 className="slide-element">Register</h2>

                    <form onSubmit={async (e) => {
                        e.preventDefault();

                        if (!userName) {
                            setRegisterError("Enter your name");
                            return;
                        }

                        if (!userEmail) {
                            setRegisterError("Enter email");
                            return;
                        }

                        if (!isValidEmail(userEmail)) {
                            setRegisterError("Email must be lowercase & valid");
                            return;
                        }

                        if (!newPass) {
                            setRegisterError("Enter password");
                            return;
                        }

                        if (!isValidPassword(newPass)) {
                            setRegisterError("Password must be strong");
                            return;
                        }

                        try {
                            await createUserWithEmailAndPassword(auth, userEmail, newPass);

                            setRegisterError("");

                            // 🔥 SUCCESS
                            navigate("/app", { replace: true });
                        } catch (error: any) {
                            if (error.code === "auth/email-already-in-use") {
                                setRegisterError("Email already registered");
                            } else {
                                setRegisterError("Something went wrong");
                            }
                        }
                    }}>
                        <div className="field-wrapper slide-element">
                            <input
                                type="text"
                                value={userName}   // 🔥 THIS WAS MISSING
                                onChange={(e) => {
                                    const value = e.target.value;

                                    // allow only letters
                                    if (/^[a-zA-Z\s]*$/.test(value)) {
                                        setUserName(value);
                                    }
                                }}
                                required
                            />
                            <label>Your name</label>
                            <i className="fa-solid fa-user"></i>
                        </div>

                        <div className="field-wrapper slide-element">
                            <input
                                type="email"
                                value={userEmail}   // 🔥 ADD
                                onChange={(e) => setUserEmail(e.target.value)}
                                required
                            />
                            <label>Email</label>
                            <i className="fa-solid fa-envelope"></i>
                        </div>

                        <div className="field-wrapper slide-element">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={newPass}   // 🔥 ADD
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setNewPass(value);

                                    if (!value) {
                                        setRegisterError("");
                                    } else if (!isValidPassword(value)) {
                                        setRegisterError(" Password must be strong ( Minimum 8 , A-Z, number, special )");
                                    } else {
                                        setRegisterError("Now your password is strong ✔");
                                    }
                                }}
                                required
                            />
                            <label>Create Strong Password</label>
                            <i
                                className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                                onClick={() => setShowPassword(!showPassword)}
                            ></i>
                        </div>

                        <div className="field-wrapper slide-element">
                            <button className="submit-button" type="submit">
                                Register
                            </button>
                        </div>
                        {registerError && (
                            <p style={{
                                color: registerError.includes("✔") ? "limegreen" : "red",
                                fontSize: "12px"
                            }}>
                                {registerError}
                            </p>
                        )}
                        <div className="google-login-btn slide-element" onClick={handleGoogleLogin}>
                            <img src={googleIcon} className="google-icon" />
                            <span>Continue with Google</span>
                        </div>

                        <div className="switch-link slide-element">
                            <p>
                                Already have an account? <br />
                                <a onClick={(e) => {
                                    e.preventDefault();
                                    setIsSignup(false);

                                    setLoginError("");        // 🔥 add
                                    setRegisterError("");     // 🔥 add

                                    setShowOtp(false);
                                    setShowReset(false);
                                    resetAllFields();
                                }}>
                                    Sign In
                                </a>
                            </p>
                        </div>
                        <div className="mobile-home-btn slide-element">
                            <i
                                className="fa-solid fa-house"
                                onClick={() => navigate("/")}
                            ></i>
                            <p>Home</p>
                        </div>
                    </form>
                </div>
                <div className="welcome-section signup">
                    <h2 className="slide-element">WELCOME! </h2>
                </div>

                {/* OTP PANEL */}
                <div className="otp-panel">
                    <h2>Recheck this email</h2>
                    <p>We will send an OTP to:</p>

                    <input id="otpEmailPreview" value={userEmail} readOnly />

                    {!otpSent && (
                        <button
                            className="submit-button otp-send-btn"
                            onClick={() => {
                                if (!userEmail) {
                                    alert("Enter email first");
                                    return;
                                }

                                // 🔥 RESET OLD OTP
                                setOtp(["", "", "", ""]);
                                setCanSubmitOtp(false);

                                setOtpSent(true);
                            }}
                        >
                            Send OTP
                        </button>
                    )}

                    {otpSent && (
                        <>
                            <div className="otp-boxes">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => {
                                            if (el) inputRefs.current[index] = el;
                                        }} // 🔥 ADD
                                        maxLength={1}
                                        className="otp-digit"
                                        value={digit}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/\D/g, "");
                                            if (!val) return;

                                            const newOtp = [...otp];
                                            newOtp[index] = val;
                                            setOtp(newOtp);

                                            // 🔥 next box focus
                                            if (index < 3) {
                                                inputRefs.current[index + 1]?.focus();
                                            }

                                            setCanSubmitOtp(newOtp.every(v => v !== ""));
                                        }}
                                        onKeyDown={(e) => {
                                            // 🔥 backspace previous
                                            if (e.key === "Backspace" && !otp[index] && index > 0) {
                                                inputRefs.current[index - 1]?.focus();
                                            }
                                        }}
                                    />
                                ))}
                            </div>

                            <button
                                className={`submit-button otp-submit-btn ${!canSubmitOtp ? "disabled" : ""}`}
                                disabled={!canSubmitOtp}
                                onClick={() => {
                                    setOtpSuccess(true);

                                    setTimeout(() => {
                                        navigate("/app", { replace: true });
                                    }, 1500);
                                }}
                            >
                                Submit OTP
                            </button>
                            {otpSuccess && (
                                <div className="otp-success">
                                    <i className="fa-solid fa-circle-check"></i>
                                    <h3>Verification Successful</h3>
                                </div>
                            )}
                        </>
                    )}

                    <p
                        className="otp-back"
                        onClick={() => {
                            setShowOtp(false);
                            setOtp(["", "", "", ""]);
                            setOtpSent(false);
                        }}
                    >
                        ← Go back
                    </p>
                </div>

                {/* RESET */}
                <div className="credentials-panel reset">
                    <h2>Reset Password</h2>

                    <form>
                        <div className="field-wrapper">
                            <input
                                type={showNewPass ? "text" : "password"}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setNewPass(value);

                                    if (!isValidPassword(value)) {
                                        setPassError("Min 8 chars, 1 capital, 1 number, 1 special char");
                                    } else {
                                        setPassError("");
                                    }
                                }}
                                required
                            />
                            <label>Create New Password</label>
                            <i
                                className={`fa-solid ${showNewPass ? "fa-eye-slash" : "fa-eye"}`}
                                onClick={() => setShowNewPass(!showNewPass)}
                            ></i>
                        </div>
                        <p style={{ fontSize: "11px", opacity: 0.7 }}>
                            Must be 8+ chars, include A-Z, number & special character
                        </p>

                        <div className="field-wrapper">
                            <input
                                type={showConfirmPass ? "text" : "password"}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setConfirmPass(value);

                                    if (newPass && value !== newPass) {
                                        setPassError("Passwords do not match");
                                        setPassSuccess("");
                                    } else if (newPass && value === newPass) {
                                        setPassError("");
                                        setPassSuccess("Passwords match ✔");
                                    } else {
                                        setPassError("");
                                        setPassSuccess("");
                                    }
                                }}
                                required
                            />
                            <label>Re-enter Password</label>
                            <i
                                className={`fa-solid ${showConfirmPass ? "fa-eye-slash" : "fa-eye"}`}
                                onClick={() => setShowConfirmPass(!showConfirmPass)}
                            ></i>
                        </div>
                        {passError && (
                            <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                                {passError}
                            </p>
                        )}

                        {passSuccess && (
                            <p style={{ color: "limegreen", fontSize: "12px", marginTop: "5px" }}>
                                {passSuccess}
                            </p>
                        )}
                        <div className="field-wrapper">
                            <button
                                className="submit-button"
                                disabled={!newPass || !confirmPass || newPass !== confirmPass}
                                onClick={() => {
                                    setResetSuccess("Password successfully reset ✔");

                                    setTimeout(() => {
                                        setShowReset(false);
                                        setIsSignup(false);
                                        setShowOtp(false);
                                        resetAllFields();
                                    }, 50000);
                                }}
                            >
                                Reset Password
                            </button>
                            {resetSuccess && (
                                <p style={{ color: "limegreen", textAlign: "center", marginTop: "10px" }}>
                                    {resetSuccess}
                                </p>
                            )}
                        </div>

                        {!resetSuccess && (
                            <p
                                className="reset-back"
                                onClick={() => {
                                    setShowReset(false);
                                    setShowOtp(false);
                                    setIsSignup(false);

                                    // 🔥 ADD THIS
                                    setOtp(["", "", "", ""]);
                                    setOtpSent(false);
                                    setCanSubmitOtp(false);
                                }}
                            >
                                ← Go back
                            </p>
                        )}
                    </form>
                </div>

            </div>
        </div>
    );
}

export default LoginPage;