import { useEffect } from 'react';

function Timer({ secondsLeft, dispatch }) {
  const minute = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  useEffect(
    function () {
      const timerID = setInterval(() => {
        dispatch({ type: 'timer' });
      }, 1000);

      // cleanup
      return function () {
        clearInterval(timerID);
      };
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {minute < 10 ? `0${minute}` : minute}:
      {seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
}

export default Timer;
