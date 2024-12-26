import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import logo from "../../../public/assets/logo1.png";

export default function LogoLoader() {
  const [loadingText, setLoadingText] = useState("Loading");

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText((prev) => {
        if (prev === "Loading...") return "Loading";
        return prev + ".";
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <motion.div
        animate={{
          y: [-20, 20, -20],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative"
      >
        <img
          src={logo}
          alt="SMA Putra Indonesia Logo"
          width={128}
          height={128}
          className="drop-shadow-xl"
        />
      </motion.div>

      <div className="mt-8 text-blue-600 font-bold text-xl">{loadingText}</div>
    </div>
  );
}
