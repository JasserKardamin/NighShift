import GetInTouch from "./sections/get-in-touch";
import OurTestimonials from "./sections/our-testimonials";
import SubscribeNewsletter from "./sections/subscribe-newsletter";
import TrustedCompanies from "./sections/trusted-companies";
import Footer from "./components/footer";
import LenisScroll from "./components/lenis-scroll";
import Navbar from "./components/navbar";
import AboutOurApps from "./sections/about-our-apps";
import HeroSection from "./sections/hero-section";
import OurLatestCreation from "./sections/our-latest-creation";
import { UserLogin } from "./sections/UserLogin";
import { Routes, Route } from "react-router-dom";
import { UserSignUp } from "./sections/UserSignUp";
import { ProblemsListPage } from "./sections/ProblemsListPage";

export function Home() {
  return (
    <>
      <LenisScroll />
      <Navbar />
      <main className="px-6 md:px-16 lg:px-24 xl:px-32">
        <HeroSection />
        <OurLatestCreation />
        <AboutOurApps />
        <OurTestimonials />
        <TrustedCompanies />
        <GetInTouch />
        <SubscribeNewsletter />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/register" element={<UserSignUp />} />
      <Route path="/solo" element={<ProblemsListPage />} />
      {/* you can add /signup here too */}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}
