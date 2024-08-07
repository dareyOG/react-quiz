import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';

const initialState = {
  questions: [],
  // 'loading', 'error','ready','active','finished'
  status: 'loading',
  currentQuestionIndex: 0,
  answer: null,
  points: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };

    case 'dataFailed':
      return {
        ...state,
        status: 'error',
      };

    case 'start':
      return { ...state, status: 'active' };

    case 'newAnswer':
      const currentQuestion = state.questions.at(state.currentQuestionIndex);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === currentQuestion.correctOption
            ? state.points + currentQuestion.points
            : state.points,
      };

    case 'nextQuestion':
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        answer: null,
      };

    default:
      throw new Error('Unknown action');
  }
}

export default function App() {
  const [
    { questions, status, currentQuestionIndex, answer, points },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (acc, currQuestion) => acc + currQuestion.points,
    0
  );

  useEffect(function () {
    async function getReactQuiz() {
      try {
        const res = await fetch('http://localhost:8000/questions');
        const data = await res.json();
        dispatch({ type: 'dataReceived', payload: data });
      } catch (err) {
        dispatch({ type: 'dataFailed' });
      }
    }
    getReactQuiz();
  }, []);
  return (
    <div className="app">
      <Header />
      <Main
        questions={questions}
        status={status}
        numQuestions={numQuestions}
        dispatch={dispatch}
        question={questions.at(currentQuestionIndex)}
        answer={answer}
        currentQuestionIndex={currentQuestionIndex}
        points={points}
        maxPossiblePoints={maxPossiblePoints}
      />
    </div>
  );
}
