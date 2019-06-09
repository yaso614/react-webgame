import React, { Component } from 'react';
import './Lifecycle.css';

//클래스의 경우 -> constructor -> render-> ref -> componentDidMount
// -> (setState/props 변경시) -> shouldComponenctUpdate -> Rererender -> componenctDidupdate
// -> 부모가 나를 없앴을 때 -> componentWillUnmount -> 소멸

//리액트가 실행되면 jsx를 dom에 붙여준다
// 붙여준 뒤의 바로 그 순간 특정한 동작을 할수 있다

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

class Lifecycle extends Component {
  state = {
    result: '',
    imgCoord: '0',
    score: 0
  };

  interval;

  // 컴포넌트가 첫 렌더링 된 후 , 비동기 요청을 많이함
  componentDidMount() {
    this.interval = setInterval(this.changeHand, 500);
  }

  // 리렌더링 후
  componentDidUpdate() {

  }

  // 컴포넌트가 제거되기 직전
  // 부모컴포넌트가 자식 컴포넌트를 제거할 때
  // 비동기 요청 정리 많이함
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  changeHand = () => {
    const { imgCoord } = this.state;
    if (imgCoord === rspCoords.rock) {
      this.setState({
        imgCoord: rspCoords.scissor,
      });
    } else if (imgCoord === rspCoords.scissor) {
      this.setState({
        imgCoord: rspCoords.paper,
      });
    } else if (imgCoord === rspCoords.paper) {
      this.setState({
        imgCoord: rspCoords.rock
      });
    }
  }

  onClickBtn = (choice) => (e) => {
    console.log(e.target.type)
    const { imgCoord } = this.state;
    clearInterval(this.interval);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      this.setState({
        result: '비겼습니다!'
      });
    } else if ([-1, 2].includes(diff)) {
      this.setState((prevState) => {
        return {
          result: '졌습니다!',
          score: prevState.score - 1
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          result: '이겼습니다!',
          score: prevState.score + 1
        }
      });
    }
    this.interval = setInterval(this.changeHand, 1000);
  }

  render() {
    const { result, score, imgCoord } = this.state;
    return (
      <>
        <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
        <div>
          <button id="rock" className="btn" onClick={this.onClickBtn('rock')}>rock</button>
          <button id="scissor" className="btn" onClick={this.onClickBtn('scissor')}>scissor</button>
          <button id="paper" className="btn" onClick={this.onClickBtn('paper')}>paper</button>
        </div>
        <div>{result}</div>
        <div>현재 {score} 점</div>
      </>
    )
  }
}

export default Lifecycle
