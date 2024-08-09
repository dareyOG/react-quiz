import Options from './Options';

function Question({ question, dispatch, answer, isAnswered }) {
  // console.log(question);
  return (
    <div>
      <h4>{question.question}</h4>
      <Options
        question={question}
        dispatch={dispatch}
        answer={answer}
        isAnswered={isAnswered}
      />
    </div>
  );
}

export default Question;
