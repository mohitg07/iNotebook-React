import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = props => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();

    //when user clicks on Submit to login then I will login that user in my website by using the /login route
    const handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
            }),
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem("token", json.authtoken);
            navigate("/home");
            props.showAlert("Login Successfull", "success");
        } else {
            props.showAlert("Invalid Credentials", "danger");
        }
    };

    const onChange = e => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className="container">
            <h2 className="text-warning my-2 mb-4">Login to Continue to iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 form-floating">
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={credentials.email}
                        onChange={onChange}
                        name="email"
                        placeholder="Email" 
                        aria-describedby="emailHelp"
                    />
                    <label htmlFor="email" className="form-label">
                        Email address
                    </label>
                    <div id="emailHelp" className="form-text">
                        We'll never share your email with anyone else.
                    </div>
                </div>
                <div className="mb-3 form-floating">
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={credentials.password}
                        onChange={onChange}
                        name="password"
                        placeholder="Enter your password"
                    />
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Login;