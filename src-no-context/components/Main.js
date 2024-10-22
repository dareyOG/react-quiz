import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextQuestion';
import Progress from './Progress';
import FinishScreen from './FinishScreen';
import Timer from './Timer';

export default function Main({
  status,
  numQuestions,
  dispatch,
  question,
  answer,
  currentQuestionIndex,
  points,
  maxPossiblePoints,
  // errorMessage,
  highScore,
  secondsLeft,
}) {
  const isAnswered = answer !== null;
  return (
    <main className="main">
      {status === 'loading' && <Loader />}
      {status === 'error' && <Error />}
      {/* {status === 'error' && <Error errorMessage={errorMessage} />} */}
      {status === 'ready' && (
        <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
      )}
      {status === 'active' && (
        <>
          <Progress
            currentQuestionIndex={currentQuestionIndex}
            numQuestions={numQuestions}
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            isAnswered={isAnswered}
          />
          <Question
            question={question}
            dispatch={dispatch}
            answer={answer}
            isAnswered={isAnswered}
          />
          <footer>
            <Timer secondsLeft={secondsLeft} dispatch={dispatch} />
            {isAnswered && (
              <NextButton
                dispatch={dispatch}
                currentQuestionIndex={currentQuestionIndex}
                numQuestions={numQuestions}
              />
            )}
          </footer>
        </>
      )}
      {status === 'finished' && (
        <FinishScreen
          points={points}
          maxPossiblePoints={maxPossiblePoints}
          highScore={highScore}
          dispatch={dispatch}
        />
      )}
    </main>
  );
}
