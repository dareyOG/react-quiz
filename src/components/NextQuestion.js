function NextQuestion({ dispatch }) {
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: 'nextQuestion' })}
    >
      Next
    </button>
  );
}

export default NextQuestion;
