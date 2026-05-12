import React from 'react'
import { calculateInvestmentResults,formatter } from '../util/investments';
import { generatepdf } from '../util/generatereport';
import { useState, useCallback, useEffect } from 'react';
import { useMemo } from 'react';
import './Output.css'

const Output = ({ inputValue, pdfButtonVisibility }) => {

    const [isLoading,setIsLoading]=useState(false)
    const [loadingVisibility,setLoadingVisibility]=useState("loading-invisible")

    const timer =()=> {setTimeout(()=>{generatepdf(resultData); setIsLoading(false); setLoadingVisibility("loading-invisible");},5000);}

    if(inputValue.duration <= 0){
        return <p>Please enter a duration greater than zero.</p>
    }
    const resultData = useMemo(()=>calculateInvestmentResults({
        initialInvestment: +inputValue.initialInvestment,
        annualInvestment: +inputValue.annualInvestment,
        expectedReturn: +inputValue.expectedReturn,
        duration: +inputValue.duration
    }),[inputValue]);



    return (
        <>
        <table id="result">
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
                {resultData.map((yearData, index) => {
                    const totalInterest = yearData.valueEndOfYear - yearData.annualInvestment * yearData.year - inputValue.initialInvestment;
                    const totalAmountInvested = yearData.valueEndOfYear - totalInterest;
                    return (
                        <tr key={index}>
                            <td>{yearData.year}</td>
                            <td>{formatter.format(yearData.investmentValue.toFixed(2))}</td>
                            <td>{formatter.format(yearData.interest.toFixed(2))}</td>
                            <td>{formatter.format(yearData.totalInterest.toFixed(2))}</td>
                            <td>{formatter.format(yearData.investedCapital.toFixed(2))}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        <div className={pdfButtonVisibility}>
            <button className="pdfbutton" onClick={()=>{setIsLoading(true);setLoadingVisibility("loading-visible");timer();}}>Download PDF report</button>
            <p className={loadingVisibility}>Loading report...</p>
        </div>
        </>
    );
};

export default Output
