import React from 'react';
import './App.css'



export default function Logs(props) {
  return (
    <div id="log-box">
        <h1>Logs</h1>
      {props.logs && props.logs.map((log, i)=>{
          return <div key={i} className="log">
            {log}
          </div>
      })}
    </div>
  );
}


