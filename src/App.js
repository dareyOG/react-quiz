import { useEffect } from 'react';
import Header from './Header';
import Main from './Main';

export default function App() {
  useEffect(function () {
    async function getReactQuiz() {
      try {
        const res = await fetch('http://localhost:8000/questions');
        const data = await res.json();
        console.log(data);
      } catch (err) {
        console.error('Error');
      }
    }
    getReactQuiz();
  }, []);
  return (
    <div className="app">
      <Header />
      <Main />
    </div>
  );
}
