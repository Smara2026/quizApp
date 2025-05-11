function Progress({ index, score, total, totalPoints, selectedAnswer }) {
  return (
    <header className="progress">
      <progress max={total} value={index + Number(selectedAnswer !== null)} />
      <p>
        <strong>Question </strong>
        <strong>
          <strong>{index + 1}</strong> / {total}
        </strong>
      </p>
      <p>
        <strong>
          <strong>{score}</strong>/{totalPoints} points
        </strong>
      </p>
    </header>
  );
}

export default Progress;
