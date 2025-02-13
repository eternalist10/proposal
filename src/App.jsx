import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import ReactAudioPlayer from "react-audio-player";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";

const images = [
  "./images/moment1.jpg",
  "./images/moment2.jpg",
  "./images/moment3.jpg",
];

export default function ProposalApp() {
  const [accepted, setAccepted] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [timeLeft, setTimeLeft] = useState(5);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const moveNoButton = () => {
    setNoPos(() => ({
      x: Math.random() * 200 - 100,
      y: Math.random() * 200 - 100,
    }));
  };

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-gradient text-white p-4"
      style={{ backgroundColor: "	#da0000" }}
    >
      <ReactAudioPlayer src="/Die With A Smile.mp3" autoPlay loop />
      {accepted ? (
        <div
          className="text-center p-5 rounded shadow-lg text-dark"
          style={{ maxWidth: "100vw", backgroundColor: "pink" }}
        >
          <Confetti />
          <h1 className="display-4 text-danger fw-bold">
            Yay! Srijoni, you said YES! ❤️
          </h1>
          <p className="mt-4 fs-3 text-primary">
            I love you so much! Happy Valentine&apos;s Day! 💖
          </p>
          <img
            src={images[currentImage]}
            alt="Our Moments"
            className="img-fluid rounded shadow mt-3 border border-danger"
            style={{ maxHeight: "30vh" }}
          />
          <p className="mt-3 fs-5">
            Here&apos;s a little something from my heart to yours:
          </p>
          <blockquote className="mt-3 fst-italic text-secondary bg-light p-3 rounded shadow-sm">
            Every moment with you is a memory I cherish. You are my love, my
            happiness, and my forever. I can&apos;t wait to spend my life with
            you.
          </blockquote>
        </div>
      ) : (
        <div
          className="card p-5 text-center shadow-lg rounded border border-secondary"
          style={{ maxWidth: "450px", backgroundColor: "pink" }}
        >
          <div className="card-body">
            {timeLeft > 0 ? (
              <h2 className="fs-4 fw-bold text-secondary">
                Surprise in {timeLeft} seconds...
              </h2>
            ) : (
              <>
                <h1 className="fs-2 fw-bold text-danger">
                  Srijoni, will you be my Valentine? 🥰
                </h1>
                {/* <img
                  src={images[currentImage]}
                  alt="Our Moments"
                  className="img-fluid rounded shadow mt-3 border border-danger"
                /> */}
                <div className="mt-4 d-flex justify-content-center gap-4">
                  <button
                    onClick={() => setAccepted(true)}
                    className="btn btn-lg btn-danger shadow fw-bold px-4"
                  >
                    Yes ❤️
                  </button>
                  <motion.button
                    className="btn btn-lg btn-secondary shadow fw-bold px-4"
                    onMouseEnter={moveNoButton}
                    style={{
                      position: "relative",
                      left: noPos.x,
                      top: noPos.y,
                    }}
                  >
                    No 😢
                  </motion.button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
