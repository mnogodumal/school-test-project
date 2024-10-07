import React from 'react';
import { useForm } from 'react-hook-form';
import { Question } from '../types/Question';

interface FormData {
  answer: string | string[];
}

interface QuestionFormProps {
  question: Question;
  onSubmit: (data: FormData) => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ question, onSubmit }) => {
  const { register, handleSubmit } = useForm<FormData>();

  const renderQuestion = () => {
    switch (question.type) {
      case 'single-choice':
        return (
          <div className='flex flex-col'>
            {question.options.map((option, index) => (
              <label key={index}>
                <input
                  type="radio"
                  value={option}
                  {...register('answer')}
                />
                {option}
              </label>
            ))}
          </div>
        );
      case 'multiple-choice':
        return (
          <div className='flex flex-col'>
            {question.options.map((option, index) => (
              <label key={index}>
                <input
                  type="checkbox"
                  value={option}
                  {...register('answer')}
                />
                {option}
              </label>
            ))}
          </div>
        );
      case 'short-answer':
        return <input type="text" {...register('answer')} />;
      case 'long-answer':
        return <textarea {...register('answer')} />;
      default:
        return null;
    }
  };

  return (
    <form className='flex flex-col text-center text-[30px] ' onSubmit={handleSubmit(onSubmit)}>
      <h3>{question.question}</h3>
      {renderQuestion()}
      <button className=' bg-red-400 rounded-[4px] ' type="submit">Ответить</button>
    </form>
  );
};

export default QuestionForm;
