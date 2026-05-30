import { useState } from 'react';
import HookPage from './components/HookPage';
import QuestionPage from './components/QuestionPage';
import FinishPage from './components/FinishPage';
import { questions } from './data/questions';

type Screen = 'hook' | 'questions' | 'finish';

export default function App() {
  const [screen, setScreen] = useState<Screen>('hook');
  const [questionIndex, setQuestionIndex] = useState(0);

  function goNext() {
    if (screen === 'hook') {
      setScreen('questions');
      setQuestionIndex(0);
    } else if (screen === 'questions') {
      if (questionIndex < questions.length - 1) {
        setQuestionIndex((i) => i + 1);
      } else {
        setScreen('finish');
      }
    }
  }

  function goBack() {
    if (screen === 'questions') {
      if (questionIndex === 0) setScreen('hook');
      else setQuestionIndex((i) => i - 1);
    }
  }

  function restart() {
    setScreen('hook');
    setQuestionIndex(0);
  }

  return (
    <>
      {screen === 'hook' && <HookPage onContinue={goNext} />}
      {screen === 'questions' && (
        <QuestionPage
          key={questionIndex}
          question={questions[questionIndex]}
          onNext={goNext}
          onBack={goBack}
        />
      )}
      {screen === 'finish' && <FinishPage onSkip={restart} />}
    </>
  );
}
