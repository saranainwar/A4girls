import { useEffect } from "react";
import gsap from "gsap";
import "./Splash.css";

const SplashScreen = () => {
  useEffect(() => {
    const tl = gsap.timeline();

    // Initial Video Fade-In
    tl.from(".splash-video", { 
      opacity: 0, 
      duration: 1.2, 
      ease: "power4.out" 
    });

    // Red Flash Effect like Netflix
    tl.to(".splash-screen", { 
      backgroundColor: "#E50914", 
      duration: 0.3, 
      yoyo: true, 
      repeat: 1, 
      ease: "power2.inOut" 
    }, "-=0.5");

    // Fade Out Video and Splash Screen
    tl.to(".splash-screen", { 
      opacity: 0, 
      duration: 1, 
      delay: 1, 
      ease: "power2.out", 
      onComplete: () => {
        document.querySelector(".splash-screen").style.display = "none";
      }
    });

  }, []);

  return (
    <div className="splash-screen">
      <video
        className="splash-video"
        src="/intro1.mp4"  // Replace with your video path
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  );
};

export default SplashScreen;
