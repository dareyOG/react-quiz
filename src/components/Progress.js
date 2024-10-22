import { useQuiz } from '../context/QuizContext';

function Progress() {
  const {
    currentQuestionIndex,
    numQuestions,
    points,
    maxPossiblePoints,
    //   isAnswered,
  } = useQuiz();
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
