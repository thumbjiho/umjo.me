import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="max-w-site mx-auto px-6 pt-16 pb-24 max-sm:px-5 max-sm:pt-10 max-sm:pb-16">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
