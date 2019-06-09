import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react'; 
// useMemo, useCallback? 최적화에는 자원이 들어간다. 섣불리 걷든지말라

import './Lotto.css';
import Ball from './Ball';

function getWinNumbers() {
  console.log('getWinNumbers');
  const candidate = Array(45).fill().map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber]; //요 리턴값을 memo가 기억함
}

const Lotto2 = () => {
  //복잡한 getWinNumbers() 연산의 결과값을 기억하기 위해 useMemo
  const [winBalls, setWinBalls] = useState([]);
  const lottoNumbers = useMemo(() => getWinNumbers(), [winBalls]);
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]);

  // ajax 요청을 해보는 경우
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      //ajax
    }
  }, ['바뀌는 값']); 
  //이러면 componentDidUpdate만 작동, componentDidMount X

  // useEffect 여러번 써도 상관없다.
  useEffect(() => {
    console.log('useEffect');
    for (let i = 0; i < winNumbers.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => {
        setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
      }, (i + 1) * 1000);
    }
    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000);

    //componentWillUnmount 
    return () => {
      timeouts.current.forEach((v) => {
        clearTimeout(v);
      });
    };

  }, [timeouts.current]); //inputs가 빈 배열이면 componentDidMount와 동일
  // [] 배열에 요소가 있으면 componentDidMount와 componentDidUpdate 둘다 수행

  //Lotto.jsx를 보면 알겠지만 componentDidUpdate한방에 다 처리가능하다 분기해서
  //그러나 hooks에서는 useEffect 여러개를 써서 처리한다
  useEffect(() => {
    console.log('로또 숫자를 생성합니다.');
  }, [winNumbers]);

  //useCallback안에서 쓰이는 state는 inputs에 넣어줘야한다.
  const onClickRedo = useCallback(() => {
    console.log("onClickRedo");
    console.log(winNumbers)
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
  }, []);

  return (
    <>
      <div>당첨 숫자</div>
      <div id="result">
        {/* useCallback을 써야하는 경우,
          자식에게 props로 함수를 주는 경우 매번 새로 생성해서 주기때문에
          자식 컴포넌트가 불필요하게 계속 렌더링된다
          자식컴포넌트가 scu하는 컴포넌트면 상관없는데 PureComponent면 문제가 렌더링됨
          요약: 자식한테 줄 함수면 useCallback해서 줘라
          */}
        {winBalls.map((v) => <Ball key={v} number={v} onClick={onClickRedo} />)}
      </div>
      <div>Bunus!</div>
      {bonus && <Ball number={bonus} />}
      {redo && <button onClick={onClickRedo}>한 번 더 !</button>}
    </>
  )
}

export default Lotto2;
