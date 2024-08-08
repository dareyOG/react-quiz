import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';

export default function Main({ status, numQuestions, dispatch, question }) {
  return (
    <main className="main">
      {status === 'loading' && <Loader />}
      {status === 'error' && <Error />}
      {status === 'ready' && (
        <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
      )}
      {status === 'active' && <Question question={question} />}
    </main>
  );
}
