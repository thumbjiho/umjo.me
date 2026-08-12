import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="min-h-screen max-w-site mx-auto px-6 pt-16 pb-10 flex flex-col max-sm:px-5 max-sm:pt-10 max-sm:pb-8">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
