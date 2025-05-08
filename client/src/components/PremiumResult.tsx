import React from 'react';
import { useSelector } from 'react-redux';

const PremiumResult: React.FC = () => {
  const result = useSelector((state: any) => state.form.result);

  if (!result) return null;

  return (
    <div className="result-container">
      <div className="card result-card">
        <h3>Premium Calculation Result</h3>
        <div className="result-row">
          <span>Plan Code: </span>
          <span>{result.planCode ?? 'N/A'}</span>
        </div>
        <div className="result-row">
          <span>Payment Frequency: </span>
          <span>{result.paymentFrequencyCd ?? 'N/A'}</span>
        </div>
        <div className="result-row">
          <span>Base Sum Assured: </span>
          <span>{result.baseSumAssured?.toLocaleString() ?? 'N/A'}</span>
        </div>
        <div className="result-row">
          <span>Base Annual Premium: </span>
          <span>{result.baseAnnualPremium?.toLocaleString() ?? 'N/A'}</span>
        </div>
        <div className="result-row">
          <span>Modal Premium: </span>
          <span>{result.modalPremium?.toLocaleString() ?? 'N/A'}</span>
        </div>
        <div className="result-row">
          <span>Premium Paying Term: </span>
          <span>{result.premiumPayingTerm ?? 'N/A'} years</span>
        </div>
        <div className="result-row">
          <span>Product Term: </span>
          <span>{result.productTerm ?? 'N/A'} years</span>
        </div>
      </div>
    </div>
  );
};

export default PremiumResult;
