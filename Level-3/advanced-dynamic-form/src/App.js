import React from 'react';
import './App.css';
import SurveyForm from './SurveyForm';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Advanced Survey Form</h1>
      </header>
      <main className="app-content">
        <SurveyForm />
      </main>
    
    </div>
  );
}

export default App;
