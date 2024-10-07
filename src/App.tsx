import React from 'react';
import TestPagination from './components/Pagination';
import { questions } from './data/QuestionsData';

const App = () => {
  const timeLimit = 300;

  return (
    <div className='flex justify-center'>
      <TestPagination questions={questions} timeLimit={timeLimit} />
    </div>
  );
};

export default App;
