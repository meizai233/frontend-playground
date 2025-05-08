import React from "react";

export default class Counter extends React.Component {
  state = { count: 0 };

  handleClick = () => {
    // Inside React event handler (asynchronous)
    this.setState({ count: this.state.count + 1 });
    console.log("handleClick", this.state.count); // Still shows previous value!

    // Outside React's control (synchronous in legacy React)
    setTimeout(() => {
      this.setState({ count: this.state.count + 1 });
      console.log("setTimeOut", this.state.count); // Shows updated value in legacy React
    }, 0);
  };

  render() {
    return <button onClick={this.handleClick}>Count: {this.state.count}</button>;
  }
}
