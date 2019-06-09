import React, { Component } from 'react';
import './Lotto.css';
import Ball from './Ball';

function getWinNumbers() {
  console.log('getWinNumbers 반복실행 여부 판단');
  const candidate = Array(45).fill().map((v, i) => i + 1);
  console.log("candidate: ", candidate)
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length-1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber]; 
}


class Lotto extends Component {
  state = {
    winNumbers: getWinNumbers(), //당첨 숫자들
    winBalls: [],
    bonus: null, // 보너스 공
    redo: false
  };

  timeouts = [];

  runTimeouts = () => {
    const { winNumbers } = this.state;
    console.log("winNumbers: ", winNumbers)
    for (let i=0; i < winNumbers.length - 1; i++) {
      this.timeouts[i] = setTimeout(() => {
        this.setState((prevState) => {
          return {
            winBalls: [...prevState.winBalls, winNumbers[i]]
          }
        })
      }, (i + 1) * 1000);
    }
    this.timeouts[6] = setTimeout(() => {
      this.setState({
        bonus: winNumbers[6],
        redo: true,
      });
    }, 7000);
  };

  componentDidMount() {
    this.runTimeouts();
  }

  //바뀌기 전의 상태 prevState와 현재 상태 this.state 비교해서
  //어떤 상황에 업데이트를 실행할지
  //setState 될때마다 실행됨
  componentDidUpdate(prevProps, prevState) {
    if (this.timeouts.length === 0) {
      this.runTimeouts();
    }
    if (prevState.winNumbers !== this.state.winNumbers) {
      console.log(' 로또 숫자를 생성합니다. ');
    }
  }

  componentWillUnmount() {
    this.timeouts.forEach((v) => {
      clearTimeout(v);
    });
  };

  // 초기화
  onClickRedo = () => {
    this.setState({
      winNumbers: getWinNumbers(), //당첨 숫자들
      winBalls: [],
      bonus: null, // 보너스 공
      redo: false
    });
    this.timeouts = [];
  }

  render() {
    const { winBalls, bonus, redo } = this.state;
    return (
      <>
        <div>당첨 숫자</div>
        <div id="result">
          {winBalls.map((v) => <Ball key={v} number={v} />)}
        </div>
        <div>Bunus!</div>
        {bonus && <Ball number={bonus} />}
        {redo && <button onClick={this.onClickRedo}>한 번 더 !</button>}
      </>
    );
  }
}

export default Lotto;