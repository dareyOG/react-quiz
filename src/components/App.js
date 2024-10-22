import Header from './Header';
import Main from './Main';
import { QuizProvider } from '../context/QuizContext';

export default function App() {
  return (
    <div className="app">
      <Header />
      <QuizProvider>
        <Main />
      </QuizProvider>
    </div>
  );
}
