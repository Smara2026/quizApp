function FinishButton({ index, total, selectedAnswer, dispatch }) {
  if (index + 1 !== total || selectedAnswer === null) return;
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "showFinishPage" })}
    >
      Finish
    </button>
  );
}

export default FinishButton;
