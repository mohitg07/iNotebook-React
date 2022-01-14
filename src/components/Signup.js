import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = props => {
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: "",
    });

    let navigate = useNavigate();

    //when user clicks on Submit to signup then I will create entry of that user in my database by using the /createuser route
    const handleSubmit = async e => {
        e.preventDefault();
        const { name, email, password } = credentials;
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem("token", json.authtoken);
            navigate("/home");
            props.showAlert("Account created Successfully", "success");
        } else {
            props.showAlert("User already exists", "danger");
        }
    };

    const onChange = e => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className="container mt-4">
            <h2 className="text-warning mb-4">Sign Up to access iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 form-floating">
                    <input
                        name="name"
                        type="text"
                        className="form-control"
                        id="name"
                        onChange={onChange}
                        required
                        minLength={3}
                    />
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                </div>
                <div className="mb-3 form-floating">
                    <input
                        name="email"
                        type="email"
                        className="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        onChange={onChange}
                        required
                        minLength={5}
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
                        name="password"
                        type="password"
                        className="form-control"
                        id="password"
                        onChange={onChange}
                        required
                        minLength={5}
                    />
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <div id="passwordHelp" className="form-text">
                        <strong>
                            Note: ** You cannot reset your password again for security reasons
                            **
                        </strong>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Signup;