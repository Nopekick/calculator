import React, {useState, useEffect} from 'react';
import {io} from 'socket.io-client'
import './App.css'

import spaceMan from './assets/amongus.png'
import Calculator from './Calculator'
import Logs from './Logs'

let socket;

function App() {
  const [logs, changeLogs] = useState(localStorage.getItem("logs") ? JSON.parse(localStorage.getItem("logs")) : []);

  useEffect(() => {
    setInterval(()=>{
      console.log(logs)
    }, 6000)

    socket = io("https://sezzle-backend.herokuapp.com");
  
    socket.on("connect", () => {
      console.log("connected to backend!"); 
    });
    
    socket.on("log", (data)=> {
      console.log(data)
      addLog(data)
    })
  }, [])

  useEffect(()=>{
    console.log(logs)
  }, [logs])

  let addLogWrapper = (log) => {
    socket.emit("log", log);
    addLog(log);
  }

  let addLog = (log) => {
    console.log("addLog:", log, logs)
    if(logs.length === 10){
      let temp = logs
      temp.pop()
      changeLogs(temp);
    }
    localStorage.setItem("logs", JSON.stringify([log, ...logs]))
    changeLogs(prevLogs => ([log, ...prevLogs]))
  }

  return (
    <div>
      <div id="back"></div>
      <img id="img" src={spaceMan} alt="among us character" />
      <div style={{position: 'absolute', top: '80px', left: '500px', display: 'flex', justifyContent: 'center'}}>
        <Calculator addLog={addLogWrapper}/>
        <Logs logs={logs}/>
      </div>
    </div>
  );
}

export default App;
