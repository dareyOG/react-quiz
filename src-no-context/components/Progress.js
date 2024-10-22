function Progress({
  currentQuestionIndex,
  numQuestions,
  points,
  maxPossiblePoints,
  //   isAnswered,
}) {
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={currentQuestionIndex}
        // value={isAnswered ? currentQuestionIndex + 1 : currentQuestionIndex}
      />
      <p>
        Question <strong>{currentQuestionIndex + 1}</strong>/{numQuestions}
      </p>
      <p>
        <strong>{points}</strong>/{maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
