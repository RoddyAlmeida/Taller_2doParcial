import { Outlet, Link } from "react-router-dom";
import Footer from "./Footer";

export default function Layout() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/people">People</Link> |{" "}
        <Link to="/contact">Contact</Link> |{" "}
        <Link to="/person-form">Form</Link> |{" "}
        <Link to="/clock">Clock</Link> |{" "}
        <Link to="/axios">API</Link>
      </nav>
      <hr />
      <Outlet />
      <Footer />
    </>
  );
}
