import React, { PureComponent } from 'react';
import './Lotto.css';

// 퓨어컴포넌트, hooks가 아니라 함수형 컴포넌트로 memo쓰는방법도 있다

class Ball extends PureComponent {

  // scu 최적 if you use PureComponent then you can't use this
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.props.number === nextProps.number) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }

  render() {
    const { number, onClick } = this.props;
    let background;
    if (number <= 10) {
      background = 'red';
    } else if (number <= 20) {
      background = 'orange';
    } else if (number <= 30) {
      background = 'yellow';
    } else if (number <= 40) {
      background = 'blue';
    } else {
      background = 'green';
    }
    return (
      <div className="ball" onClick={onClick} style={{ background}}>{number}</div>
    )
  }
}

export default Ball;