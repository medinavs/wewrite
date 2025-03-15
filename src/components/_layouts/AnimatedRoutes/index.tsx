import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Outlet } from "react-router-dom";
import { Logo } from "./styles";
import logo from "../../../public/logo.png";

export function AnimatedRoutes() {
  const location = useLocation();
  const [isChangingRoute, setIsChangingRoute] = useState(false);
  const [previousPath, setPreviousPath] = useState(location.pathname);
  const [animationStage, setAnimationStage] = useState(0);

  useEffect(() => {
    if (location.pathname !== previousPath) {
      setIsChangingRoute(true);
      setAnimationStage(1);

      setTimeout(() => {
        setTimeout(() => {
          setAnimationStage(2);

          setTimeout(() => {
            setIsChangingRoute(false);
            setPreviousPath(location.pathname);
            setAnimationStage(0);
          }, 500);
        }, 300);
      }, 500);
    }
  }, [location, previousPath]);

  return (
    <>
      {isChangingRoute && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            pointerEvents: "none",
          }}
        >
          <AnimatePresence>
            <motion.div
              key="white-screen"
              initial={{ y: "100%" }}
              animate={{ y: animationStage === 2 ? "-100%" : 0 }}
              exit={{ y: "-100%" }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "white",
              }}
            />
          </AnimatePresence>

          <AnimatePresence>
            <motion.div
              key="logo"
              initial={{ y: 50, opacity: 0 }}
              animate={{
                y: animationStage === 2 ? "-100%" : 0,
                opacity: 1,
              }}
              exit={{ y: -100, opacity: 0 }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
              style={{
                position: "absolute",
                top: "45%",
                left: "42%",
                transform: "translate(-50%, -50%)",
                fontSize: "2.5rem",
                fontWeight: "bold",
                color: "black",
              }}
            >
              <Logo>
                <img src={logo} alt="WeWrite Logo" />| WeWrite
              </Logo>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={previousPath}
          initial={{ opacity: 0 }}
          animate={{ opacity: isChangingRoute ? 0 : 1 }}
          transition={{
            duration: 0.6,
            delay: isChangingRoute ? 0 : 0.2,
          }}
          className="page-wrapper"
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </>
  );
}
