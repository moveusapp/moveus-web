import { Link } from "react-router-dom";
import useDocumentTitle from "../hooks/use-document-title";

export function WelcomePage() {
  useDocumentTitle("Welcome");

  return (
    <div className="container-center">
      <h2 className="text-3xl font-medium">Welcome to Moveus!</h2>
      <Link to="/login" className="block w-full px-3">
        <button className="my-7">Log in</button>
      </Link>
      <p className="mb-3 mt-2">Don't have an account?</p>
      <Link to="/register" className="block w-full px-3">
        <button className="bg-block-accent">Register</button>
      </Link>
    </div>
  );
}

export default WelcomePage;
