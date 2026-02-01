import { useState, useRef, useEffect } from "react";
import "@/App.css";

function App() {
  const [accepted, setAccepted] = useState(false);
  const [yesSize, setYesSize] = useState(1);
  const [messageIndex, setMessageIndex] = useState(0);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noButtonMoved, setNoButtonMoved] = useState(false);
  const noButtonRef = useRef(null);

  const messages = [
    "Are you sure, Babe? 🥺",
    "Really, Babe? 💔",
    "Think again, Babe! 😢",
    "Babe, please! 🥹",
    "Don't break my heart, Babe! 💔",
  ];

  useEffect(() => {
    // No need to set initial position, let CSS handle it
  }, []);

  const moveNoButton = (e) => {
    if (accepted) return;

    const button = noButtonRef.current;
    if (!button) return;

    setNoButtonMoved(true);

    const rect = button.getBoundingClientRect();
    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;

    // Get mouse position
    const mouseX = e.clientX || e.touches?.[0]?.clientX || 0;
    const mouseY = e.clientY || e.touches?.[0]?.clientY || 0;

    // Calculate distance from mouse to button center
    const distance = Math.sqrt(
      Math.pow(mouseX - buttonCenterX, 2) + Math.pow(mouseY - buttonCenterY, 2)
    );

    // If mouse is too close (within 120px), move the button
    if (distance < 120) {
      // Calculate new random position
      const maxX = window.innerWidth - rect.width - 20;
      const maxY = window.innerHeight - rect.height - 20;

      let newX = Math.random() * maxX;
      let newY = Math.random() * maxY;

      // Ensure minimum distance from current position
      const minDistance = 150;
      const distanceFromCurrent = Math.sqrt(
        Math.pow(newX - buttonCenterX, 2) + Math.pow(newY - buttonCenterY, 2)
      );

      if (distanceFromCurrent < minDistance) {
        // Move further away
        newX = (newX + maxX / 2) % maxX;
        newY = (newY + maxY / 2) % maxY;
      }

      setNoButtonPosition({ x: newX, y: newY });
      setYesSize((prev) => prev + 0.15);
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }
  };

  const handleYesClick = () => {
    setAccepted(true);
  };

  // Prevent click on no button
  const handleNoClick = (e) => {
    e.preventDefault();
    moveNoButton(e);
  };

  return (
    <div className="valentine-container" data-testid="valentine-container">
      {/* Floating hearts background */}
      <div className="hearts-background">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="floating-heart"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          >
            💖
          </div>
        ))}
      </div>

      {!accepted ? (
        <div className="proposal-content" data-testid="proposal-screen">
          <h1 className="main-heading" data-testid="main-heading">
            Junnu, will you be my Valentine? 💝
          </h1>
          <p className="sub-heading" data-testid="sub-heading">
            pretty pleaseeee 🥺
          </p>

          {messageIndex > 0 && (
            <p className="pleading-message" data-testid="pleading-message">
              {messages[messageIndex]}
            </p>
          )}

          <div className="buttons-container">
            <button
              className="yes-button"
              onClick={handleYesClick}
              style={{
                transform: `scale(${yesSize})`,
              }}
              data-testid="yes-button"
            >
              Yes! 💕
            </button>

            <button
              ref={noButtonRef}
              className="no-button"
              onMouseOver={moveNoButton}
              onMouseMove={moveNoButton}
              onMouseDown={handleNoClick}
              onTouchStart={moveNoButton}
              onClick={handleNoClick}
              style={
                noButtonMoved
                  ? {
                      position: "fixed",
                      left: `${noButtonPosition.x}px`,
                      top: `${noButtonPosition.y}px`,
                      transform: `scale(${Math.max(0.3, 1 - yesSize * 0.1)})`,
                    }
                  : {
                      transform: `scale(${Math.max(0.3, 1 - yesSize * 0.1)})`,
                    }
              }
              data-testid="no-button"
            >
              No
            </button>
          </div>
        </div>
      ) : (
        <div className="success-screen" data-testid="success-screen">
          {/* Heart explosion */}
          <div className="heart-explosion">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="explosion-heart"
                style={{
                  left: `${50 + (Math.random() - 0.5) * 100}%`,
                  top: `${50 + (Math.random() - 0.5) * 100}%`,
                  animationDelay: `${Math.random() * 0.5}s`,
                }}
              >
                💕
              </div>
            ))}
          </div>

          <div className="success-content">
            <h1 className="success-heading" data-testid="success-heading">
              I knew it, Baby pie! 💕
            </h1>
            
            <div className="gif-container" data-testid="celebration-gif">
              <img 
                src="https://media1.tenor.com/m/Fy9zovre5VAAAAAd/bubu-dudu-kisses.gif" 
                alt="Celebration" 
                className="celebration-gif"
              />
            </div>
            
            <p className="success-message-2" data-testid="success-message-2">
              Can't wait to celebrate with you! 💝
            </p>
          </div>

          {/* Confetti hearts */}
          <div className="confetti-container">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="confetti-heart"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`,
                }}
              >
                {i % 3 === 0 ? "💕" : i % 3 === 1 ? "💖" : "💝"}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
