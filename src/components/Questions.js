import { useEffect, useState } from "react";

function Questions({ currentQuestion, selectedAnswer, dispatch }) {
  const [shuffledArray, setShuffledArray] = useState([]);
  const options = [
    ...currentQuestion.incorrectAnswers,
    currentQuestion.correctAnswer,
  ];
  useEffect(
    function () {
      async function shuffle(options) {
        let currentIndex = options.length;

        while (currentIndex !== 0) {
          let randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;

          // And swap it with the current element.
          [options[currentIndex], options[randomIndex]] = [
            options[randomIndex],
            options[currentIndex],
          ];
        }
        console.log(currentQuestion);
        setShuffledArray(options);
      }
      shuffle(options);
    },
    [currentQuestion]
  );
  console.log(currentQuestion);
  console.log(shuffledArray);

  return (
    <div>
      <h4 style={{ fontSize: "28px" }}>
        <strong>{currentQuestion.question.text}</strong>
      </h4>
      <div className="options">
        {shuffledArray.map((option, index) => (
          <button
            className={`btn btn-option ${
              option === selectedAnswer ? "answer" : ""
            } ${
              selectedAnswer !== null &&
              (option === currentQuestion.correctAnswer ? "correct" : "wrong")
            }`}
            onClick={() => dispatch({ type: "selected", payload: option })}
            disabled={selectedAnswer !== null}
            key={index}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Questions;
