import React, {useState} from 'react';
import './Calculator.css'

export default function Calculator(props) {
    const [input, changeInput] = useState("")
    const [isEmpty, changeEmpty] = useState(true)

    let handleAdd = (character) => {
        changeEmpty(false);
        if("+/*-^".includes(character) && "+/*-^".includes(input[input.length-1])){
            let temp = input.substr(0, input.length-1) + character;
            changeInput(temp);
        } else {
            changeInput(input + character);
        }
    }

    let handleCalculate = () => {
        if(input.length === 1 && "+/*-^".includes(input[0])) return;

        //easy solution (doesn't work with ^ for exponentiation)
        // let res = eval(input)
        // props.addLog(`${input} = ${res}`)
        // changeInput("")
        // changeEmpty(true)
        // return;

        //infix to postfix
        let postfix = ""
        let stack = []
        for(let i = 0; i < input.length; i++){
            let c = input[i]
            if(!isNaN(parseInt(c))){
                postfix += c;
                while(!isNaN(parseInt(input[i+1]))){
                    postfix += input[i+1];
                    i++;
                }
                postfix += " "
            }else if(c === "+" || c === "-" || c === "*" || c=== "/" || c=== "^"){
                while(c !== "^" && stack.length > 0 && (precedence(c) <= precedence(stack[stack.length - 1]))){
                    postfix += stack.pop() + " "
                }
                stack.push(c);
            }
        }
        while(stack.length > 0){
            postfix += stack.pop() + " "
        }

        //evaluate postfix
        console.log(postfix)
        postfix = postfix.split(" ")
        stack = [];
        let length = postfix.length;

        let operators = {
            "+": function (a, b) { return a + b },
            "-": function (a, b) { return a - b },
            "*": function (a, b) { return a * b },
            "/": function (a, b) { return a / b },
            "^": function (a,b)  { return Math.pow(a, b)}
        };

        for (let i = 0; i < length;  i++) {
            let c = postfix[i];
        
            if (!isNaN(parseInt(c))){
                stack.push(c);
            } else if (c in operators) {
              let b = parseInt(stack.pop());
              let a = parseInt(stack.pop());
              let value = operators[c](a, b);

              stack.push(value);
            }
        }

        if(stack.length === 1 && !isNaN(parseInt(stack[0]))){
            props.addLog(`${input} = ${stack[0]}`)
            changeInput("")
            changeEmpty(true)
        } 

    }

  return (
    <div id="base">
        <div id="screen">{isEmpty ? "0" : input}</div>
        <table style={{paddingLeft: '5px'}}>
            <tbody>
            <tr>
                <td><button onClick={()=>{ changeInput(""); changeEmpty(true);}} className="single">C</button></td>
                <td><button className="single" onClick={()=>{handleAdd('/')}}>/</button></td>
                <td><button className="single" onClick={()=>{handleAdd('*')}}>*</button></td>
                <td><button className="single" onClick={()=>{handleAdd('-')}}>-</button></td>
            </tr>
            <tr>
                <td><button className="single" onClick={()=>{handleAdd('7')}}>7</button></td>
                <td><button className="single" onClick={()=>{handleAdd('8')}}>8</button></td>
                <td><button className="single" onClick={()=>{handleAdd('9')}}>9</button></td>
                <td rowSpan="2"><button className="double"  onClick={()=>{handleAdd('+')}}>+</button></td>
            </tr>
            <tr>
                <td><button className="single" onClick={()=>{handleAdd('4')}}>4</button></td>
                <td><button className="single" onClick={()=>{handleAdd('5')}}>5</button></td>
                <td><button className="single" onClick={()=>{handleAdd('6')}}>6</button></td>
            </tr>
            <tr>
                <td><button className="single" onClick={()=>{handleAdd('1')}}>1</button></td>
                <td><button className="single" onClick={()=>{handleAdd('2')}}>2</button></td>
                <td><button className="single" onClick={()=>{handleAdd('3')}}>3</button></td>
                <td rowSpan="2"><button className="double" onClick={()=>{handleCalculate()}}>=</button></td>
            </tr>
            <tr>
                <td colSpan="2"><button className="single" style={{width: '120px'}} onClick={()=>{handleAdd('0')}}>0</button></td>
                <td><button className="single" onClick={()=>{handleAdd('^')}}>^</button></td>
            </tr>
            </tbody>
        </table>
    </div>
  );
}


let precedence = function(operator){
    switch(operator){
    case "^":
        return 3;
    case "*":
    case "/":
        return 2;
    case "+":
    case "-":
        return 1;
    default:
        return 0;
    }
}