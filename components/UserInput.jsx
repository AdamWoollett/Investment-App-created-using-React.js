import React from 'react'
import { useState } from 'react';
import '../App.css'
import Output from './Output';

const UserInput = ({userInput,setUserInput, handleChange,errorMessages, durationMessage}) => {

console.log(userInput);

  const handleReset=(e)=>{
    event.preventDefault(e); 
    setUserInput({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10
  });
  };

return (
  <>
  <section id="user-input">
    <form>
      <div className="input-group">
        <label htmlFor="initialInvestment">Initial Investment ($)</label>
        <input
          type="number"
          id="initialInvestment"
          value={userInput.initialInvestment}
          required
          onChange={(e) => handleChange('initialInvestment', e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="annualInvestment">Annual Investment ($)</label>
        <input
          type="number"
          id="annualInvestment"
          value={userInput.annualInvestment}
          required
          onChange={(e) => handleChange('annualInvestment', e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="expectedReturn">Expected Return (%)</label>
        <input
          type="number"
          id="expectedReturn"
          value={userInput.expectedReturn}
          required
          onChange={(e) => handleChange('expectedReturn', e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="duration">Duration (years)</label>
        <input
          type="number"
          id="duration"
          value={userInput.duration}
          required
          onChange={(e) => handleChange('duration', e.target.value)}
        />
      </div>
      <button onClick={(e)=>handleReset(e)}>Reset form values</button>
      <p className={durationMessage}>Duration cannot be less than 1 year</p>
      <p className={errorMessages}>All inputs need values greater than 0</p>
    </form>
  </section>
  </>
) 
};

export default UserInput