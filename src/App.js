import React, {useEffect, useState} from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow'

// define base url
const APIKEY = '22fff1f39b957125141c92eb'
const BASE_URL = `https://v6.exchangerate-api.com/v6/${APIKEY}`

function App() {

  // use state for currency list
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountFrom, setAmountFrom] = useState(true)

  let toAmount, fromAmount

  if(amountFrom) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount 
    fromAmount = amount / exchangeRate
  }
  // use effect - takes 2 params 1st is a function and the second is an array (dependency list)
  // when the elements of the array change we want to rerun useeffect
  // we want to call use effect only once so we put an empty array
  // empty array will never change so use effect will only be called once 
  useEffect(() => {
    fetch(`${BASE_URL}/latest/USD`).then(res => res.json()).then(data => {
      const firstCurrency = Object.keys(data.conversion_rates)[1]
      setCurrencyOptions([...Object.keys(data.conversion_rates)])
      setFromCurrency(data.base_code)
      setToCurrency(firstCurrency)
      setExchangeRate(data.conversion_rates[firstCurrency])
    })
  }, [])

  useEffect(() => {
    if(fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}/pair/${fromCurrency}/${toCurrency}`).then(res => res.json()).then(data => {
        setExchangeRate(data.conversion_rate)
      })
    }
  }, [fromCurrency, toCurrency])

  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountFrom(true)
  } 

  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountFrom(false)
  } 

  return (
    <>
      <h1>Convert</h1>
      <CurrencyRow 
        currencyOptions={currencyOptions} 
        selectedCurrency = {fromCurrency} 
        onChangeCurrency = {e => setFromCurrency(e.target.value)}
        amount = {fromAmount}
        onChangeAmount = {handleFromAmountChange}/>
      <div className='equals'>=</div>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency = {toCurrency} 
        onChangeCurrency = {e => setToCurrency(e.target.value)}
        amount = {toAmount}
        onChangeAmount = {handleToAmountChange}/>
    </>
  );
}

export default App;
