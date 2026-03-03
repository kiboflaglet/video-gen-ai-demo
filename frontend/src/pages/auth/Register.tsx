import { useState } from "react";
import { authClient } from "../../lib/auth-client";
import { Link } from "react-router";

const Register = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault(); // stop page reload

    setError(null); // reset error
    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        callbackURL: "http://localhost:5173/dashboard",
      });

      if (error) setError(error.message || null);
      else {
        // optionally: do something on successful login
        console.log("Register successful");
      }
    } catch (err: any) {
      setError(err.message || "Unknown error");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <br />
        <input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label htmlFor="email">Email</label>
        <br />
        <input
          id="email"
          name="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        {error && <span style={{ color: "red" }}>{error}</span>}
        <br />
        <button type="submit">Sign Up</button>
        <button type="button">
          <Link to="/login">I already have an account</Link>
        </button>
      </form>
    </div>
  );
};

export default Register;
