import { useRequireUser } from "../hooks/useRequireUser";
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
      <div>
        Note: This website is for educational purposes only.
        Do not use it to encrypt sensitive information.
        Communication between the client and server is not secure and many of the algorithms use for encryption are not secure.
      </div>
    </div>
  );
}

export default Home;
