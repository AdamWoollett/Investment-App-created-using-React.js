import Header from './components/Header.jsx'
import './App.css'
import UserInput from './components/UserInput.jsx'
import { useState, useEffect } from 'react';
import Output from './components/Output.jsx';
import InvestmentCalculator from './components/InvestmentCalculator.jsx';

function App() {
    const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10
  });

  /*const myTimeout = setTimeout(handleChange(inputIdentifier, newValue),5000)*/

  const handleChange = (inputIdentifier, newValue) => {
    if(inputIdentifier === 'duration' && newValue < 1){
      setDurationMessage("duration-message-visible");
      setPdfButtonVisibility("pdf-button-hidden")
    } else{
    (newValue > 0 ? updateForm(inputIdentifier, newValue) : setErrorMessages("form-input-message-visible"))}
  };

  const updateForm = (inputIdentifier, newValue) =>{
    setUserInput((previousValue)=>({...previousValue,[inputIdentifier]:+newValue}))
    setDurationMessage("duration-message-hidden");
    setErrorMessages("form-input-message-hidden");
    setPdfButtonVisibility("pdf-button-visible");
    console.log(userInput);
  };

  const [errorMessages,setErrorMessages]=useState("form-input-message-hidden");
  const [durationMessage,setDurationMessage]=useState("duration-message-hidden");
  const [pdfButtonVisibility,setPdfButtonVisibility]=useState("pdf-button-visible");

  return (
    <>
      <Header />
      <UserInput userInput={userInput} setUserInput={setUserInput} handleChange={handleChange} errorMessages={errorMessages} durationMessage={durationMessage}/>
      <Output inputValue={userInput} pdfButtonVisibility={pdfButtonVisibility}/>
    </>
  )
}

export default App
