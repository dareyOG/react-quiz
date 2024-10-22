import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextQuestion';
import Progress from './Progress';
import FinishScreen from './FinishScreen';
import Timer from './Timer';
import { useQuiz } from '../context/QuizContext';

export default function Main() {
  const { status, answer } = useQuiz();
  const isAnswered = answer !== null;

  return (
    <main className="main">
      {status === 'loading' && <Loader />}
      {status === 'error' && <Error />}
      {status === 'ready' && <StartScreen />}
      {status === 'active' && (
        <>
          <Progress />
          <Question />
          <footer>
            <Timer />
            {isAnswered && <NextButton />}
          </footer>
        </>
      )}
      {status === 'finished' && <FinishScreen />}
    </main>
  );
}
