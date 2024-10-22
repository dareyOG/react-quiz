import { createContext, useContext, useEffect, useReducer } from 'react';

const QuizContext = createContext();

const initialState = {
  questions: [],
  status: 'loading', // 'loading', 'error','ready','active','finished'
  currentQuestionIndex: 0,
  answer: null,
  points: 0,
  // errorMessage: '',
  highScore: 0,
  secondsLeft: null,
};

// assuming 30secs per question
const secs_per_question = 30;

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
        secondsLeft: state.questions.length * secs_per_question,
      };

    case 'dataFailed':
      return {
        ...state,
        status: 'error',
        // errorMessage: action.payload,
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

    case 'lastQuestion':
      return {
        ...state,
        status: 'finished',
        highScore:
          state.points < state.highScore ? state.highScore : state.points,
      };

    case 'restart':
      /* return {
        ...state,
        status: 'ready',
        currentQuestionIndex: 0,
        answer: null,
        points: 0,
      }; */
      return {
        ...initialState,
        status: 'ready',
        questions: state.questions,
      };

    // timer
    case 'timer':
      return {
        ...state,
        secondsLeft: state.secondsLeft - 1,
        status: state.secondsLeft === 0 ? 'finished' : state.status,
      };

    default:
      throw new Error('Unknown action');
  }
}

function QuizProvider({ children }) {
  const [
    {
      questions,
      status,
      currentQuestionIndex,
      answer,
      points,
      // errorMessage,
      highScore,
      secondsLeft,
    },
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
        // dispatch({ type: 'dataFailed', payload: err.message });
      }
    }
    getReactQuiz();
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        numQuestions,
        maxPossiblePoints,
        dispatch,
        question: questions.at(currentQuestionIndex),
        answer,
        currentQuestionIndex,
        points,
        // errorMessage,
        highScore,
        secondsLeft,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);

  return context;
}

export { QuizProvider, useQuiz };
