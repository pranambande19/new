import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Welcome Home!</h1>
      <Link to="/profile">View Profile</Link>
    </div>
  );
}
