import React, { useState, useRef, useEffect } from 'react'
import './Lifecycle.css';

const rspCoords = {
  rock: '0',
  scissor: '-142px',
  paper: '-284px'
}

const scores = {
  rock: 1,
  scissor: 0,
  paper: -1,
}

const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find((v) => {
    return v[1] === imgCoord;
  })[0];
}

const Lifecycle2 = () => {
  const [result, setResult] = useState('');
  const [imgCoord, setImgCoord] = useState('0');
  const [score, setScore] = useState(0);
  const interval = useRef('interval');

  useEffect(() => { // componentDidMount, componentDidupdate 역할
    interval.current = setInterval(changeHand, 1000);
    return () => { // componentWillUnmount
      clearInterval(interval.current);
    }
  }, [imgCoord]); // useEffect를 실행하고 싶은 state

  const changeHand = () => {
    if (imgCoord === rspCoords.rock) {
      setImgCoord(rspCoords.scissor);
    } else if (imgCoord === rspCoords.scissor) {
      setImgCoord(rspCoords.paper);
    } else if (imgCoord === rspCoords.paper) {
      setImgCoord(rspCoords.rock);
    }
  }

  const onClickBtn = (choice) => (e) => {
    clearInterval(interval.current);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      setResult('비겼습니다.');
    } else if ([-1, 2].includes(diff)) {
      setResult('졌습니다.');
      setScore((prevScore) => prevScore - 1);
    } else {
      setResult('이겼습니다!');
      setScore((prevScore) => prevScore + 1);
    }
    interval.current = setInterval(changeHand, 1000);
  }


  return (
    <>
      <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
      <div>
        <button id="rock" className="btn" onClick={onClickBtn('rock')}>rock</button>
        <button id="scissor" className="btn" onClick={onClickBtn('scissor')}>scissor</button>
        <button id="paper" className="btn" onClick={onClickBtn('paper')}>paper</button>
      </div>
      <div>{result}</div>
      <div>현재 {score} 점</div>
    </>
  )
}

export default Lifecycle2;

