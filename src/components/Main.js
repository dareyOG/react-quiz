import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import NextQuestion from './NextQuestion';

export default function Main({
  status,
  numQuestions,
  dispatch,
  question,
  answer,
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
