import React from "react";
import styled from "styled-components";

const Times = styled.p`
  border: 1px solid rgb(144, 181, 138);
  background: rgb(190, 210, 196);
  padding: 10px 20px;
`;
const Button = styled.button`
  border: 1px solid white;
  background: rgb(144, 181, 138);
  outline: none;
  height: 30px;
  color: white;
  cursor: pointer;
  transition: all 0.2s linear;
  :hover {
    background: white;
    color: #90b58a;
    border: 2px solid rgb(144, 181, 138);
  }
`;
export default class Comp2 extends React.Component {
  state = {
    count: 0
  };

  handleNavigate = () => {
    this.props.navigate("dashboard");
  };

  render() {
    return (
      <div>
        <div>当前路由：{this.props.path}</div>
        <div>ID：{this.props.id}</div>
        <Times>你 点击了 {this.state.count} 次。</Times>
        <Button onClick={() => this.setState({ count: this.state.count + 1 })}>
          点击计算次数
        </Button>
        <Button onClick={this.handleNavigate}>跳转至ng路由-dashboard</Button>
      </div>
    );
  }
}
