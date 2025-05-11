function NextButton({ dispatch, selectedAnswer, total, index }) {
  if (selectedAnswer === null || total === index + 1) return;
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "showNextQuestion" })}
    >
      Next
    </button>
  );
}

export default NextButton;
