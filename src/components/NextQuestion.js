import { useQuiz } from '../context/QuizContext';

function NextButton() {
  const { dispatch, currentQuestionIndex, numQuestions } = useQuiz();
  return (
    <button
      className="btn btn-ui"
      onClick={() =>
        dispatch({
          type:
            currentQuestionIndex < numQuestions - 1
              ? 'nextQuestion'
              : 'lastQuestion',
        })
      }
    >
      {currentQuestionIndex < numQuestions - 1 ? 'Next' : 'Finish'}
    </button>
  );
}

export default NextButton;
