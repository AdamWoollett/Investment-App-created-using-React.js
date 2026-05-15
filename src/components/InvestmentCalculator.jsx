import React, { useState } from 'react';
import { calculateInvestmentResults } from '../util/investments';
import { generatepdf } from '../util/generateReport';

const InvestmentCalculator = ({calculateInvestmentResults,generatepdf }) => {
  const [inputCustomer, setInputCustomer] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10
  });

  const [results, setResults] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputCustomer((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCalculate = () => {
    const calculatedResults = calculateInvestmentResults(inputCustomer);
    setResults(calculatedResults);
  };

  const handleGeneratePDF = () => {
    if (results) {
      generatePDF({ ...inputCustomer, results });
    }
  };

  const userEnteredValid = inputCustomer.duration >= 1;

  return (
    <div className="investment-calculator">
      <div className="inputs">
        <input
          type="number"
          name="initialInvestment"
          value={inputCustomer.initialInvestment}
          onChange={(e)=>handleInputChange(e)}
          placeholder="Initial Investment"
        />
        <input
          type="number"
          name="annualInvestment"
          value={inputCustomer.annualInvestment}
          onChange={(e)=>handleInputChange(e)}
          placeholder="Annual Investment"
        />
        <input
          type="number"
          name="expectedReturn"
          value={inputCustomer.expectedReturn}
          onChange={(e)=>handleInputChange(e)}
          placeholder="Expected Return (%)"
        />
        <input
          type="number"
          name="duration"
          value={inputCustomer.duration}
          onChange={(e)=>handleInputChange(e)}
          placeholder="Duration (years)"
        />
        <button onClick={()=>handleCalculate}>Calculate</button>
        <button onClick={()=>console.log(results)}>Console log results</button>
      </div>

      {!userEnteredValid && (
        <p className="error-message">Please ensure that years invested are greater than zero.</p>
      )}

      {userEnteredValid && results && (
        <div className="results">
          <h2>Investment Results</h2>
          <table>
            <thead>
              <tr>
                <th>Year</th>
                <th>Investment Value</th>
                <th>Interest (Year)</th>
                <th>Total Interest</th>
                <th>Invested Capital</th>
              </tr>
            </thead>
            <tbody>
              {results.map((yearData, index) => (
                <tr key={index}>
                  <td>{yearData.year}</td>
                  <td>${yearData.investmentValue.toFixed(2)}</td>
                  <td>${yearData.interestGainedYear.toFixed(2)}</td>
                  <td>${yearData.totalInterestGained.toFixed(2)}</td>
                  <td>${yearData.investedCapital.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleGeneratePDF}>Download PDF Report</button>
        </div>
      )}
    </div>
  );
};

export default InvestmentCalculator;
