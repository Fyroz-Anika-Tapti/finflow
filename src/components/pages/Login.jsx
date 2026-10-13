import { useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import "./Login.css";

function Login() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();

        const form = new FormData(event.target);

        axios
            .post(`${import.meta.env.VITE_API_URL}login.php`, {
                email: form.get("email"),
                password: form.get("password")
            })
            .then((response) => {

                if (response.data.status == false) {
                    setMessage("Invalid email or password.");
                } else {
                    localStorage.setItem("access_token", response.data.jwt);
                    localStorage.setItem("userdata", response.data.data);
                    window.location.href = './dashboard';
                }
            })
            .catch(() => {
                setMessage("An error occurred while creating your account. Please try again.");
            });

    }

    return (
        <main className="login-page">
            <section className="login-layout">

                <aside className="login-welcome">

                    <Link to="/" className="login-brand">
                        <span className="login-brand-mark">
                            <svg viewBox="0 0 32 32" fill="none">
                                <rect x="4" y="4" width="24" height="24" rx="8" />
                                <path d="M10 11h12M10 16h12M10 21h7" />
                            </svg>
                        </span>
                        <span>stockroom<span className="brand-dot">.</span></span>
                    </Link>

                    <div className="login-welcome-copy">
                        <span className="login-eyebrow">
                            A BETTER WAY TO MANAGE
                        </span>

                        <h1>
                            Everything in
                            <br />
                            <span>its right place.</span>
                        </h1>

                        <p>
                            A little more clarity. A little less chaos.
                            Manage your inventory with a workspace
                            designed to keep things simple.
                        </p>
                    </div>

                    <div className="login-art">
                        <div className="login-art-circle" />

                        <div className="login-art-card login-art-card-back">
                            <span className="art-small-label">INVENTORY OVERVIEW</span>
                            <div className="art-back-lines">
                                <span />
                                <span />
                                <span />
                            </div>
                        </div>

                        <div className="login-art-card login-art-card-front">
                            <div className="art-top">
                                <span className="art-icon">
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="m3 7 9-4 9 4v10l-9 4-9-4V7Z" />
                                        <path d="m3 7 9 5 9-5M12 12v9" />
                                    </svg>
                                </span>
                                <span className="art-menu">•••</span>
                            </div>

                            <span className="art-small-label">
                                TOTAL PRODUCTS
                            </span>

                            <strong className="art-number">2,480</strong>

                            <div className="art-stock-status">
                                <span />
                                All stock accounted for
                            </div>

                            <div className="art-chart">
                                {[40, 65, 48, 78, 55, 88, 62, 95, 72].map(
                                    (height, index) => (
                                        <span
                                            key={index}
                                            style={{ height: `${height}%` }}
                                        />
                                    )
                                )}
                            </div>
                        </div>

                        <div className="login-art-badge">
                            <span className="badge-check">✓</span>
                            <span>
                                <strong>Looking good!</strong>
                                <small>Inventory is up to date</small>
                            </span>
                        </div>
                    </div>

                    <div className="login-quote">
                        <span className="quote-mark">“</span>
                        <p>
                            Simplicity is the ultimate sophistication.
                        </p>
                        <span className="quote-caption">
                            LESS CLUTTER. MORE CONTROL.
                        </span>
                    </div>
                </aside>

                <section className="login-form-panel">
                    <div className="login-form-wrap">

                        <div className="login-mobile-brand">
                            <span className="login-brand-mark">
                                <svg viewBox="0 0 32 32" fill="none">
                                    <rect x="4" y="4" width="24" height="24" rx="8" />
                                    <path d="M10 11h12M10 16h12M10 21h7" />
                                </svg>
                            </span>
                            <span>stockroom<span className="brand-dot">.</span></span>
                        </div>

                        <div className="login-form-heading">
                            <span className="login-form-eyebrow">
                                YOUR WORKSPACE
                            </span>

                            <h2>Welcome back<span>.</span></h2>

                            <p className="login-form-intro">
                                Enter your details to sign in to your account.
                            </p>
                        </div>

                        <form className="login-form" onSubmit={handleSubmit}>
                            <label htmlFor="login-email">
                                Email address
                            </label>

                            <div className="login-input-wrap">
                                <svg
                                    className="login-input-icon"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    aria-hidden="true"
                                >
                                    <rect x="2.5" y="4" width="15" height="12" rx="2" />
                                    <path d="m3.5 5.5 6.5 5 6.5-5" />
                                </svg>

                                <input
                                    id="login-email"
                                    name="email"
                                    type="email"
                                    placeholder="name@company.com"
                                    autoComplete="email"
                                    required
                                />
                            </div>

                            <div className="login-password-label">
                                <label htmlFor="login-password">
                                    Password
                                </label>

                                <button
                                    className="login-text-button"
                                    type="button"
                                    onClick={() =>
                                        setMessage(
                                            "Please contact your administrator to reset your password."
                                        )
                                    }
                                >
                                    Forgot password?
                                </button>
                            </div>

                            <div className="login-input-wrap">
                                <svg
                                    className="login-input-icon"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    aria-hidden="true"
                                >
                                    <rect x="3.5" y="8.5" width="13" height="9" rx="2" />
                                    <path d="M6.5 8.5V6a3.5 3.5 0 0 1 7 0v2.5M10 12v2" />
                                </svg>

                                <input
                                    id="login-password"
                                    name="password"
                                    type={passwordVisible ? "text" : "password"}
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    required
                                />

                                <button
                                    className="login-visibility-button"
                                    type="button"
                                    onClick={() =>
                                        setPasswordVisible((value) => !value)
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

                            <label className="login-remember">
                                <input type="checkbox" name="remember" />
                                <span className="login-custom-checkbox" />
                                <span>Keep me signed in</span>
                            </label>

                            <button
                                className="login-submit"
                                type="submit"
                                disabled={loading}
                            >
                                <span>
                                    {loading ? "Signing in..." : "Sign in"}
                                </span>
                                <span className="login-submit-arrow">↗</span>
                            </button>

                            {message && (
                                <p
                                    className="login-status"
                                    role="alert"
                                >
                                    {message}
                                </p>
                            )}
                        </form>

                        <div className="login-help">
                            <span>Don't have an account?</span>
                            <Link
                                className="login-text-button"
                                to="/register"
                            >
                                Create account →
                            </Link>
                        </div>

                        <div className="login-security-note">
                            <span>✳</span>
                            A calm, secure space for your business.
                        </div>
                    </div>

                    <footer className="login-footer">
                        <span>© {new Date().getFullYear()} Stockroom</span>
                        <span>MADE FOR BETTER WORKFLOWS</span>
                    </footer>
                </section>
            </section>
        </main>
    );
}

export default Login;