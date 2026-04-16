import { useRequireUser } from "../hooks/useRequireUser";
import logo from "../assets/logo.png";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router";

function Home() {
  const {user} = useAuth();

  return (
    <div style={{ textAlign: "center" }}>
      {user ? <h2>Welcome, {user.username}!</h2> : <h2>Welcome to WebEncrypt!</h2>}
      <div>
        This is a website where you can encrypt and decrypt messages using various ciphers.
        You can save your ciphertext on the ciphers page. There you can also temporaily decrypt your message to read its plaintext.
        Don't worry! Your plaintext is never stored, so you don't have to worry about your messages being leaked.
      </div>
      {user ? <Link to="/encrypt">Encrypt</Link> : <Link to="/login">Login to Encrypt</Link>}
    </div>
  );
}

export default Home;
