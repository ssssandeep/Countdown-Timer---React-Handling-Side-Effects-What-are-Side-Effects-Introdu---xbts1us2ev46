import React, { useState, useEffect, useRef } from "react";
import '../styles/App.css';

const App = () => {
  // write your code here 
  let timerRef = null;
  const rt = useRef(0);
  const [remaingTime,setRemainingTime] = useState(0);
  
  const getTimeRemaining = (e) => {

    const total = Date.parse(e) - Date.parse(new Date());
    console.log(e.getSeconds(), new Date().getSeconds());
    
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
        total, hours, minutes, seconds
    };
  }
  
  const startCount = (time) => {
    let { total, hours, minutes, seconds }  = getTimeRemaining(time);
    //console.log(time)
    if(total>=-1){
      //setRemainingTime(remaingTime-1)
      rt.current.innerText = rt.current.innerText-1;
    }else{
      clearInterval(timerRef)
    }
  }
  
  const startCountDownHandle = (event) => {
    if(event.target.value>0 && event.key == 'Enter'){
      console.log("start")
      rt.current.innerText = event.target.value;
      const t = parseInt(event.target.value);
      let deadline = new Date();
      deadline.setSeconds(deadline.getSeconds() + t);
      if(timerRef)
        clearInterval(timerRef);
      timerRef = setInterval(() => {
        
        startCount(deadline);
      }, 1000)
    }
  }
  
  return (
    <div className="wrapper">
      <div id="whole-center">
        <h1>
          Reverse countdown for<input id="timeCount" onKeyDown={startCountDownHandle} /> sec.
        </h1>
      </div>
      <div id="current-time" ref={rt}></div>
    </div>
  )
}


export default App;
