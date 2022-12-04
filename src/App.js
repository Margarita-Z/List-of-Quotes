import React from 'react';
import {Routes,Route} from 'react-router-dom';
import RandomQuotes from './components/RandomQuotes';
import ListOfQuotes from './components/ListOfQuotes';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<ListOfQuotes />} />
        <Route path='/random-quote' element={<RandomQuotes />} />
      </Routes>
    </div>
  );
}

export default App;
