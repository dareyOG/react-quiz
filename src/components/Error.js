function Error({ errorMessage }) {
  return (
    <p className="error">
      <span>💥</span> There was an error fetching questions.
      {/* <span>💥</span> {errorMessage} */}
    </p>
  );
}

export default Error;
