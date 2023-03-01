import { useState } from "react";

export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch("https://wjy-movies-api.herokuapp.com/users", {
            method: "POST", body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            if (res.ok) {
                alert("Signup successful");
                window.location.reload();
            } else {
                alert("Signup failed")
            }
        })

    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Username:
                <input tyep="text" value={username}
                    onChange={(e) => setUser(e.target.value)}
                    required
                    minLength="3" /></label>
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <label>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </label>
            <label>
                Birthday:
                <input
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
}
