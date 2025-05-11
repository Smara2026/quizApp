function FinishPage({ score, totalScore, highestScore, dispatch, questions }) {
  const perc = ((score / totalScore) * 100).toFixed(0);
  return (
    <>
      <p className="result">
        :) You scored {score} out of {totalScore} ({perc}%)
      </p>
      <p className="highscore">Your highest score is {highestScore}</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restartQuiz" })}
      >
        Restart quiz
      </button>
    </>
  );
}

export default FinishPage;
