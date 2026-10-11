import { useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import "./Register.css";

function Register() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        setMessage("");
        setMessageType("");

        const form = new FormData(event.currentTarget);


        const password = form.get("password");
        const confirmPassword = form.get("confirmPassword");

        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            setMessageType("error");
            return;
        }

        if (password.length < 8) {
            setMessage("Password must be at least 8 characters long.");
            setMessageType("error");
            return;
        }

        setLoading(true);

        try {

            const response = await axios
                .post(`${import.meta.env.VITE_API_URL}register.php`, {
                    name: form.get("name")?.trim(),
                    email: form.get("email")?.trim(),
                    password: form.get("password")?.trim()
                })
                .then(() => {
                    setMessage("Account created successfully. You can now sign in.");
                })
                .catch(() => {
                    setMessage("An error occurred while creating your account. Please try again.");
                });

        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Something went wrong. Please try again."
            );
            setMessageType("error");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="register-page">
            <section className="register-layout">

                {/* Left Welcome Panel */}
                <aside className="register-welcome">

                    <Link to="/" className="register-brand">
                        <span className="register-brand-mark">
                            <svg viewBox="0 0 32 32" fill="none">
                                <rect x="4" y="4" width="24" height="24" rx="8" />
                                <path d="M10 11h12M10 16h12M10 21h7" />
                            </svg>
                        </span>

                        <span>
                            stockroom<span className="register-brand-dot">.</span>
                        </span>
                    </Link>

                    <div className="register-welcome-copy">
                        <span className="register-eyebrow">
                            A SMARTER WAY TO WORK
                        </span>

                        <h1>
                            Start organized.
                            <br />
                            <span>Stay ahead.</span>
                        </h1>

                        <p>
                            Bring your products, stock levels, and daily
                            operations together in one simple workspace.
                            Your next chapter starts here.
                        </p>
                    </div>

                    {/* Inventory Illustration */}
                    <div className="register-art">
                        <div className="register-art-circle" />

                        <div className="register-art-back">
                            <span className="register-art-caption">
                                STOCK OVERVIEW
                            </span>

                            <div className="register-art-skeleton">
                                <span />
                                <span />
                                <span />
                            </div>
                        </div>

                        <div className="register-art-card">
                            <div className="register-art-card-top">
                                <span className="register-art-icon">
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="m3 7 9-4 9 4v10l-9 4-9-4V7Z" />
                                        <path d="m3 7 9 5 9-5M12 12v9" />
                                    </svg>
                                </span>

                                <span className="register-art-dots">•••</span>
                            </div>

                            <span className="register-art-caption">
                                PRODUCTS TRACKED
                            </span>

                            <strong>2,480</strong>

                            <div className="register-art-status">
                                <span />
                                Your inventory, in sync
                            </div>

                            <div className="register-art-bars">
                                {[45, 62, 40, 76, 55, 88, 65, 95, 72].map(
                                    (height, index) => (
                                        <span
                                            key={index}
                                            style={{ height: `${height}%` }}
                                        />
                                    )
                                )}
                            </div>
                        </div>

                        <div className="register-art-badge">
                            <span className="register-art-check">✓</span>

                            <span>
                                <strong>You're all set</strong>
                                <small>A better workflow awaits</small>
                            </span>
                        </div>
                    </div>

                    <div className="register-welcome-bottom">
                        <span className="register-bottom-line" />
                        <p>
                            Less time searching. More time growing.
                        </p>
                    </div>
                </aside>

                {/* Right Registration Panel */}
                <section className="register-form-panel">
                    <div className="register-form-wrap">

                        <div className="register-mobile-brand">
                            <span className="register-brand-mark">
                                <svg viewBox="0 0 32 32" fill="none">
                                    <rect x="4" y="4" width="24" height="24" rx="8" />
                                    <path d="M10 11h12M10 16h12M10 21h7" />
                                </svg>
                            </span>

                            <span>
                                stockroom<span className="register-brand-dot">.</span>
                            </span>
                        </div>

                        <div className="register-heading">
                            <span className="register-form-eyebrow">
                                GET STARTED FOR FREE
                            </span>

                            <h2>
                                Create your account<span>.</span>
                            </h2>

                            <p>
                                A few details and you're ready to go.
                            </p>
                        </div>

                        <form
                            className="register-form"
                            onSubmit={handleSubmit}
                        >
                            {/* Full Name */}
                            <label htmlFor="register-name">
                                Full name
                            </label>

                            <div className="register-input-wrap">
                                <svg
                                    className="register-input-icon"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    aria-hidden="true"
                                >
                                    <circle cx="10" cy="6" r="3" />
                                    <path d="M4 17v-1a6 6 0 0 1 12 0v1H4Z" />
                                </svg>

                                <input
                                    id="register-name"
                                    name="name"
                                    type="text"
                                    placeholder="Enter your full name"
                                    autoComplete="name"
                                    maxLength={100}
                                    required
                                />
                            </div>

                            {/* Email */}
                            <label htmlFor="register-email">
                                Email address
                            </label>

                            <div className="register-input-wrap">
                                <svg
                                    className="register-input-icon"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    aria-hidden="true"
                                >
                                    <rect
                                        x="2.5"
                                        y="4"
                                        width="15"
                                        height="12"
                                        rx="2"
                                    />
                                    <path d="m3.5 5.5 6.5 5 6.5-5" />
                                </svg>

                                <input
                                    id="register-email"
                                    name="email"
                                    type="email"
                                    placeholder="name@company.com"
                                    autoComplete="email"
                                    maxLength={254}
                                    required
                                />
                            </div>

                            {/* Password */}
                            <label htmlFor="register-password">
                                Password
                            </label>

                            <div className="register-input-wrap">
                                <svg
                                    className="register-input-icon"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    aria-hidden="true"
                                >
                                    <rect
                                        x="3.5"
                                        y="8.5"
                                        width="13"
                                        height="9"
                                        rx="2"
                                    />
                                    <path d="M6.5 8.5V6a3.5 3.5 0 0 1 7 0v2.5M10 12v2" />
                                </svg>

                                <input
                                    id="register-password"
                                    name="password"
                                    type={passwordVisible ? "text" : "password"}
                                    placeholder="At least 8 characters"
                                    autoComplete="new-password"
                                    minLength={8}
                                    required
                                />

                                <button
                                    className="register-visibility-button"
                                    type="button"
                                    onClick={() =>
                                        setPasswordVisible((visible) => !visible)
                                    }
                                    aria-label={
                                        passwordVisible
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >
                                    {passwordVisible ? "Hide" : "Show"}
                                </button>
                            </div>

                            {/* Confirm Password */}
                            <label htmlFor="register-confirm-password">
                                Confirm password
                            </label>

                            <div className="register-input-wrap">
                                <svg
                                    className="register-input-icon"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    aria-hidden="true"
                                >
                                    <rect
                                        x="3.5"
                                        y="8.5"
                                        width="13"
                                        height="9"
                                        rx="2"
                                    />
                                    <path d="M6.5 8.5V6a3.5 3.5 0 0 1 7 0v2.5M10 12v2" />
                                </svg>

                                <input
                                    id="register-confirm-password"
                                    name="confirmPassword"
                                    type={confirmVisible ? "text" : "password"}
                                    placeholder="Re-enter your password"
                                    autoComplete="new-password"
                                    minLength={8}
                                    required
                                />

                                <button
                                    className="register-visibility-button"
                                    type="button"
                                    onClick={() =>
                                        setConfirmVisible((visible) => !visible)
                                    }
                                    aria-label={
                                        confirmVisible
                                            ? "Hide confirm password"
                                            : "Show confirm password"
                                    }
                                >
                                    {confirmVisible ? "Hide" : "Show"}
                                </button>
                            </div>

                            {/* Terms */}
                            <label className="register-terms">
                                <input
                                    type="checkbox"
                                    name="terms"
                                    required
                                />

                                <span className="register-custom-checkbox" />

                                <span>
                                    I agree to the{" "}
                                    <Link to="/terms">
                                        Terms of Service
                                    </Link>{" "}
                                    and{" "}
                                    <Link to="/privacy">
                                        Privacy Policy
                                    </Link>.
                                </span>
                            </label>

                            {/* Submit */}
                            <button
                                className="register-submit"
                                type="submit"
                                disabled={loading}
                            >
                                <span>
                                    {loading
                                        ? "Creating account..."
                                        : "Create account"}
                                </span>

                                <span className="register-submit-arrow">
                                    ↗
                                </span>
                            </button>

                            {message && (
                                <p
                                    className={`register-status ${messageType}`}
                                    role="alert"
                                    aria-live="polite"
                                >
                                    {message}
                                </p>
                            )}
                        </form>

                        <div className="register-login-link">
                            <span>Already have an account?</span>

                            <Link to="/login">
                                Sign in →
                            </Link>
                        </div>

                        <div className="register-security">
                            <span>✳</span>
                            Your business journey starts with a secure account.
                        </div>
                    </div>

                    <footer className="register-footer">
                        <span>
                            © {new Date().getFullYear()} Stockroom
                        </span>

                        <span>MADE FOR BETTER WORKFLOWS</span>
                    </footer>
                </section>
            </section>
        </main>
    );
}

export default Register;