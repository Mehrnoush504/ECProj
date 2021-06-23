import React, { Component } from "react";
class Timer extends Component {
  constructor(props) {
    super(props);
    // let oneday = new Date("2021-06-24T00:14:00.0");
    // let today = new Date();
    // //console.log("c", date);
    // let seconds = Math.floor((oneday.getTime() - today.getTime()) / 1000);
    // if (seconds < 0) seconds = 0;
    // console.log("constructor");
    this.state = { time: {}, seconds: this.props.seconds };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      h: hours,
      m: minutes,
      s: seconds,
    };
    return obj;
  }

  componentDidMount() {
    console.log("didmount", this.state.seconds);
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  startTimer() {
    if (this.timer === 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    // Check if we're at zero.
    if (seconds === 0) {
      clearInterval(this.timer);
    }
    const { h, m, s } = this.state.time;
    if (h === 0 && m === 0 && s === 0) this.props.history.replace("/my-exams");
  }

  render() {
    const { h, m, s } = this.state.time;
    return (
      <div>
        {this.startTimer()}
        {h < 10 ? "0" + h : h} : {m < 10 ? "0" + m : m} : {s < 10 ? "0" + s : s}
      </div>
    );
  }
}

export default Timer;
