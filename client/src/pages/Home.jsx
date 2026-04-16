import { useRequireUser } from "../hooks/useRequireUser";
import logo from "../assets/logo.png";
import { useAuth } from "../hooks/useAuth";

function Home() {
  const {user} = useAuth();

  return (
    <div style={{ textAlign: "center" }}>
      {user ? <h2>Welcome, {user.username}!</h2> : <h2>Welcome to WebEncrypt!</h2>}
      <img src={logo} alt="My App" className="home-logo" />
    </div>
  );
}

export default Home;
