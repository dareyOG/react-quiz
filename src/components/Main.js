import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import NextQuestion from './NextQuestion';
import Progress from './Progress';

export default function Main({
  status,
  numQuestions,
  dispatch,
  question,
  answer,
  currentQuestionIndex,
  points,
  maxPossiblePoints,
}) {
  const isAnswered = answer !== null;
  return (
    <main className="main">
      {status === 'loading' && <Loader />}
      {status === 'error' && <Error />}
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
          {isAnswered && <NextQuestion dispatch={dispatch} />}
        </>
      )}
    </main>
  );
}
