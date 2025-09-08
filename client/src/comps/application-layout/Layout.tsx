import { Outlet } from "react-router";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import "./layout.css";

export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
