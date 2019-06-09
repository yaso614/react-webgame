import React, { useState, useRef } from 'react'
import './Response.css';
import { timeout } from 'q';

const Response2 = () => {
  const [state, setState] = useState('waiting');
  const [message, setMessage] = useState('클릭해서 시작하세요');
  const [result, setResult] = useState([]);

  //불필요한 렌더링이 일어나지 않게 useRef로 사용
  const timeout = useRef(null);
  const startTime = useRef();
  const endTime = useRef();

  onClickScreen = () => {
    if (state === 'waiting') {
      setState('ready');
      setMessage('초록색이 되면 클릭하세요');
      timeout = setTimeout(() => {
        setState('now');
        setMessage('지금 클릭');
        startTime = new Date();
      }, Math.floor(Math.random() * 1000) + 2000)
    } else if (state === 'ready') {
      clearTimeout(timeout);
      setState('waiting');
      setMessage('너무 성급하시군요! 초록색이 된 후에 클릭하세요');
    } else if (state === 'now') {
      endTime = new Date();
      setState('waiting');
      setMessage('클릭해서 시작하세요');
      setResult((prevResult) => {
        return [...prevResult, endTime.current - startTime.current];
      });
    }
  };

  onReset = () => {
    setResult([]);
  }

  renderAverage = () => {
    return result.length === 0 
      ? null
      : <>
        <div>평균시간: {result.reduce((a, c) => a + c) / result.length} ms</div>
        <button onClick={onReset}>리셋</button>
      </>
  }

  return (
    <>
      <div
        id="screen"
        className={state}
        onClick={this.onClickScreen}
      >
        {message}
      </div>
      {this.renderAverage()}

    </>
  )
}

export default Response2
