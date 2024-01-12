import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
const Login = () => {
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/chat");
            setLoading(false);
        } catch (err) {
            setErr(err.message);
            setLoading(false);
        }
    }
    return (
        <div className={`formContainer chat-login page ${loading ? 'page-blocked' : ''}`}>
            {loading && (
                <div className="overlay">
                    <div className="spinner-container">
                        <div class="spinner-border text-light" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            )}
            <div className="formWrapper">
                <span className="logo">Chat</span>
                <span className="title">Register</span>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button >Sign up</button>
                </form>
                {err && <div class="alert alert-danger" role="alert">
                    {err}
                </div>}
                <p>Do you have an account? <Link to="/chat/register">Register</Link></p>
            </div>
        </div>
    )
}

export default Login;