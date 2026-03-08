import React from "react";

/**
 * ErrorBoundary
 * Catches any JS render error in its child tree and shows a
 * styled fallback UI instead of a blank white screen.
 */
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, info) {
        // Log to console for debugging (Netlify function logs / DevTools)
        console.error("[ErrorBoundary] Uncaught error:", error, info);
    }

    handleReload = () => {
        window.location.href = "/";
    };

    render() {
        if (this.state.hasError) {
            return (
                <div
                    style={{
                        minHeight: "100vh",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#ffffff",
                        fontFamily: "'Inter', 'Segoe UI', sans-serif",
                        padding: "24px",
                        textAlign: "center",
                    }}
                >
                    {/* Logo / Brand mark */}
                    <div
                        style={{
                            width: 64,
                            height: 64,
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, #0d9488, #14b8a6)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: 24,
                            boxShadow: "0 8px 24px rgba(13,148,136,0.25)",
                        }}
                    >
                        <span style={{ color: "#fff", fontSize: 28, fontWeight: 700 }}>₹</span>
                    </div>

                    <h1
                        style={{
                            fontSize: "clamp(20px, 5vw, 28px)",
                            fontWeight: 700,
                            color: "#111827",
                            margin: "0 0 12px",
                        }}
                    >
                        Something went wrong
                    </h1>

                    <p
                        style={{
                            fontSize: "clamp(14px, 3.5vw, 16px)",
                            color: "#6b7280",
                            maxWidth: 360,
                            lineHeight: 1.6,
                            margin: "0 0 32px",
                        }}
                    >
                        We hit an unexpected error. This has been logged. Please reload
                        the page — your data is safe.
                    </p>

                    <button
                        onClick={this.handleReload}
                        style={{
                            background: "linear-gradient(135deg, #0d9488, #14b8a6)",
                            color: "#fff",
                            border: "none",
                            borderRadius: 12,
                            padding: "14px 32px",
                            fontSize: 15,
                            fontWeight: 600,
                            cursor: "pointer",
                            boxShadow: "0 4px 16px rgba(13,148,136,0.3)",
                            transition: "transform 0.15s ease, box-shadow 0.15s ease",
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = "translateY(-2px)";
                            e.currentTarget.style.boxShadow = "0 8px 24px rgba(13,148,136,0.4)";
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "0 4px 16px rgba(13,148,136,0.3)";
                        }}
                    >
                        Reload Page
                    </button>

                    {/* Error details (development-friendly) */}
                    {import.meta.env.DEV && this.state.error && (
                        <details
                            style={{
                                marginTop: 32,
                                textAlign: "left",
                                background: "#fef2f2",
                                border: "1px solid #fecaca",
                                borderRadius: 8,
                                padding: "12px 16px",
                                maxWidth: 480,
                                width: "100%",
                                fontSize: 12,
                                color: "#b91c1c",
                                fontFamily: "monospace",
                            }}
                        >
                            <summary style={{ cursor: "pointer", marginBottom: 8, fontWeight: 600 }}>
                                Error details (dev only)
                            </summary>
                            {this.state.error.toString()}
                        </details>
                    )}
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
