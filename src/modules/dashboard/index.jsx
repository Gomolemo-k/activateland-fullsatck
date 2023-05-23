import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { ContextProvider } from './contexts/ContextProvider';

const Index = () => {
  return (
    <>
      <div className='overflow-hidden'>
        <ContextProvider>
          <App/>
        </ContextProvider>
      </div>
    </>
  );
};

export default Index;