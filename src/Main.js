import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';

export default function Main({ questions, status, numQuestions }) {
  return (
    <main className="main">
      {status === 'loading' && <Loader />}
      {status === 'error' && <Error />}
      {status === 'ready' && <StartScreen numQuestions={numQuestions} />}
    </main>
  );
}
