import { useQuiz } from '../context/QuizContext';

function FinishedScreen() {
  const { points, maxPossiblePoints, highScore, dispatch } = useQuiz();

  const percentScore = (points / maxPossiblePoints) * 100;
  let emoji;
  if (percentScore === 100) emoji = '🏆';
  if (percentScore >= 80 && percentScore < 100) emoji = '🎉🎉';
  if (percentScore >= 70 && percentScore < 80) emoji = '🎉';
  if (percentScore >= 50 && percentScore < 70) emoji = '🙄';
  if (percentScore < 50) emoji = '🤦🏽‍♂️';
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {maxPossiblePoints} (
        {Math.ceil(percentScore)}%) <span>{emoji}</span>
      </p>
      <p className="highscore">Highscore: {highScore}</p>{' '}
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'restart' })}
      >
        Restart
      </button>
    </>
  );
}

export default FinishedScreen;
