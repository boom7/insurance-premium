import React, { useState } from 'react';
import ProductsList from './components/ProductsList';
import PremiumResult from './components/PremiumResult';
import './styles/App.css'; // Navigate up to 'src' and into 'styles'
import Form from './components/Form';

const App: React.FC = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); // Track if form is submitted

  return (
    <div className="container">
      <div className="card">
        <Form setIsFormSubmitted={setIsFormSubmitted} />
      </div>

      {isFormSubmitted && (
        <div className="card">
          <PremiumResult />
        </div>
      )}

      <div className="card">
        <ProductsList />
      </div>
    </div>
  );
};

export default App;
