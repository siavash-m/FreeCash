import { useState } from 'react';
import HookPage from './components/HookPage';
import QuestionPage from './components/QuestionPage';
import FinishPage from './components/FinishPage';
import { questions, computeProgress } from './data/questions';

type Screen = 'hook' | 'questions' | 'finish';
type StepStatus = 'answered' | 'skipped' | null;

export default function App() {
  const [screen, setScreen]             = useState<Screen>('hook');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [history, setHistory]           = useState<StepStatus[]>(() => questions.map(() => null));
  // Stores the option id the user picked on each question (null if not yet answered / skipped)
  const [selections, setSelections]     = useState<(string | null)[]>(() => questions.map(() => null));
  const [isGoingBack, setIsGoingBack]   = useState(false);

  function recordStep(index: number, status: StepStatus, optionId: string | null = null) {
    setHistory((h) => h.map((v, i) => (i === index ? status : v)));
    if (optionId !== null) {
      setSelections((s) => s.map((v, i) => (i === index ? optionId : v)));
    }
  }

  function goNext() {
    setIsGoingBack(false);
    recordStep(questionIndex, 'answered');
    advance();
  }

  function goSkip() {
    setIsGoingBack(false);
    recordStep(questionIndex, 'skipped');
    advance();
  }

  function advance() {
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
    setIsGoingBack(true);
    if (screen === 'questions') {
      if (questionIndex === 0) {
        setIsGoingBack(false);
        setScreen('hook');
      } else {
        setQuestionIndex((i) => i - 1);
      }
    }
  }

  function restart() {
    setScreen('hook');
    setQuestionIndex(0);
    setHistory(questions.map(() => null));
    setSelections(questions.map(() => null));
    setIsGoingBack(false);
  }

  const progress = computeProgress(questionIndex, history, isGoingBack);

  return (
    <>
      {screen === 'hook' && <HookPage onContinue={() => { setIsGoingBack(false); advance(); }} />}
      {screen === 'questions' && (
        <QuestionPage
          key={questionIndex}
          question={questions[questionIndex]}
          progress={progress}
          previousSelectionId={selections[questionIndex]}
          isGoingBack={isGoingBack}
          onNext={goNext}
          onSkip={goSkip}
          onBack={goBack}
        />
      )}
      {screen === 'finish' && <FinishPage onSkip={restart} />}
    </>
  );
}
