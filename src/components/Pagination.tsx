import React, { useState, useEffect } from 'react';
import QuestionForm from './QuestionForm';
import { Question } from '../types/Question';
import { saveProgress, loadProgress } from '../utils/LocalStorage';

interface TestPaginationProps {
  questions: Question[];
  timeLimit: number;
}

interface Answers {
  [questionId: string]: string | string[];
  
}


const Pagination: React.FC<TestPaginationProps> = ({ questions, timeLimit }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [testCompleted, setTestCompleted] = useState(false);
  const TEST_PROGRESS_KEY = 'testProgress';

  useEffect(() => {
    const savedProgress = loadProgress<{
      currentStep: number;
      answers: Answers;
      timeLeft: number;
    }>(TEST_PROGRESS_KEY);

    if (savedProgress) {
      setCurrentStep(savedProgress.currentStep);
      setAnswers(savedProgress.answers);
      setTimeLeft(savedProgress.timeLeft);
    }
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !testCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleFinishTest();
    }
  }, [timeLeft, testCompleted]);

  useEffect(() => {
    if (!testCompleted) {
      saveProgress(TEST_PROGRESS_KEY, {
        currentStep,
        answers,
        timeLeft,
      });
    }
  }, [currentStep, answers, timeLeft, testCompleted]);

  const handleAnswerSubmit = (data: { answer: string | string[] }) => {
    const updatedAnswers = {
      ...answers,
      [questions[currentStep].id]: data.answer,
    };

    setAnswers(updatedAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinishTest();
    }
  };

  const handleFinishTest = () => {
    setTestCompleted(true);
    localStorage.removeItem(TEST_PROGRESS_KEY);
    console.log('Test finished', answers);
  };

  return (
    <div>
      {!testCompleted && (
        <h2>
          Осталось времени: {Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)}
        </h2>
      )}
      {!testCompleted ? (
        <QuestionForm
          question={questions[currentStep]}
          onSubmit={handleAnswerSubmit}
        />
      ) : (
        <p>Тест завершен! Спасибо за участие.</p>
      )}
      {!testCompleted && (
        <p>Шаг {currentStep + 1} из {questions.length}</p>
      )}
    </div>
  );
};

export default Pagination;

