import React, { Component, useState } from "react";
import "./App.css";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { Previnput } from "./components/Previnput";
import { ClearButton } from "./components/ClearButton";

function App() {
  const [input, setInput] = useState("");
  const [previousNumber, setPreviousNumber] = useState("");
  const [operator, setOperator] = useState("");

  const isOperator = val => !isNaN(val) || val === "." || val === "=";
  const clearInput = () => {
    setInput("");
  };
  const clearAllInput = () => {
    setInput("");
    setPreviousNumber("");
  };
  const addToInput = val => setInput(input + val);
  const addDecimal = val => {
    if (input.indexOf(".") === -1) {
      setInput(input + val);
    }
  };
  const addZeroToInput = val => {
    if (input !== "") {
      setInput(input + val);
    }
  };
  const add = () => {
    if (previousNumber === "") {
      setPreviousNumber(input + " +");
    } else if (!isOperator(previousNumber.charAt(previousNumber.length - 1))) {
      setPreviousNumber(
        previousNumber.slice(0, previousNumber.length - 2) + " +"
      );
    } else {
      setPreviousNumber(input);
    }
    setInput("");
    setOperator("plus");
  };
  const subtract = () => {
    if (previousNumber === "") {
      setPreviousNumber(input + " -");
    } else if (!isOperator(previousNumber.charAt(previousNumber.length - 1))) {
      setPreviousNumber(
        previousNumber.slice(0, previousNumber.length - 2) + " -"
      );
    } else {
      setPreviousNumber(input);
    }
    setInput("");
    setOperator("subtract");
  };
  const multiply = () => {
    if (previousNumber === "") {
      setPreviousNumber(input + " *");
    } else if (!isOperator(previousNumber.charAt(previousNumber.length - 1))) {
      setPreviousNumber(
        previousNumber.slice(0, previousNumber.length - 2) + " *"
      );
    } else {
      setPreviousNumber(input);
    }
    setInput("");
    setOperator("multiply");
  };
  const divide = () => {
    if (previousNumber === "") {
      setPreviousNumber(input + " /");
    } else if (!isOperator(previousNumber.charAt(previousNumber.length - 1))) {
      setPreviousNumber(
        previousNumber.slice(0, previousNumber.length - 2) + " /"
      );
    } else {
      setPreviousNumber(input);
    }
    setInput("");
    setOperator("divide");
  };

  const evaluate = () => {
    if (input === "") {
      if (!isOperator(previousNumber.charAt(previousNumber.length - 1))) {
        setInput(previousNumber.slice(0, previousNumber.length - 2));
      } else {
        setInput(previousNumber);
      }
    } else if (operator === "plus") {
      setInput(
        Number(
          parseFloat(previousNumber.slice(0, previousNumber.length - 2)) +
            parseFloat(input)
        ).toFixed(2)
      );
    } else if (operator === "subtract") {
      setInput(
        Number(parseFloat(previousNumber) - parseFloat(input)).toFixed(2)
      );
    } else if (operator === "multiply") {
      setInput(
        Number(parseFloat(previousNumber) * parseFloat(input)).toFixed(2)
      );
    } else if (operator === "divide") {
      setInput(
        Number(parseFloat(previousNumber) / parseFloat(input)).toFixed(2)
      );
    }
    setPreviousNumber("");
    setOperator("");
  };

  return (
    <div className="app">
      <div className="calc-wrapper">
        <Previnput previnput={previousNumber} />
        <Input input={input} />
        <div className="row">
          <Button handleClick={addToInput}>7</Button>
          <Button handleClick={addToInput}>8</Button>
          <Button handleClick={addToInput}>9</Button>
          <Button handleClick={divide}>/</Button>
        </div>
        <div className="row">
          <Button handleClick={addToInput}>4</Button>
          <Button handleClick={addToInput}>5</Button>
          <Button handleClick={addToInput}>6</Button>
          <Button handleClick={multiply}>*</Button>
        </div>
        <div className="row">
          <Button handleClick={addToInput}>1</Button>
          <Button handleClick={addToInput}>2</Button>
          <Button handleClick={addToInput}>3</Button>
          <Button handleClick={add}>+</Button>
        </div>
        <div className="row">
          <Button handleClick={addDecimal}>.</Button>
          <Button handleClick={addZeroToInput}>0</Button>
          <Button handleClick={evaluate}>=</Button>
          <Button handleClick={subtract}>-</Button>
        </div>
        <div className="row">
          <ClearButton handleClear={clearInput} handleClearAll={clearAllInput}>
            Clear
          </ClearButton>
        </div>
      </div>
    </div>
  );
}

export default App;
