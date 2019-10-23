import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import "./test.css";
const InputWrapper = styled.div``;
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
const Comp1 = props => {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef();
  useEffect(() => {
    prevCountRef.current = count;
    console.log(prevCount, count);
    return () => {};
  });
  const prevCount = prevCountRef.current;

  const handleCountChange = (mode, event) => {
    setCount(mode ? count + 1 : count - 1);
  };

  const refTest = useRef(null);
  const handleInpButtonClick = () => {
    refTest.current.focus();
  };
  const handleInpSubmit = () => {
    console.log("文本框的值：", refTest.current.value);
  };

  const handleNavigate = () => {
    props.navigate("hero-list");
  };

  return (
    <InputWrapper>
      <div>更新前：{prevCount}；</div>
      <div>更新后：{count}；</div>

      <Button
        onClick={e => {
          handleCountChange(true, e);
        }}
      >
        加+
      </Button>

      <Button
        onClick={e => {
          handleCountChange(false, e);
        }}
      >
        减-
      </Button>

      <div>当前路由：{props.path}</div>
      <div>路由ID：{props.id}</div>
      <div>
        <input type="text" ref={refTest} />
        &nbsp;&nbsp;
        <Button onClick={handleInpButtonClick}>聚焦输入</Button>
        &nbsp;&nbsp;
        <Button onClick={handleInpSubmit}>提交</Button>
      </div>
      <div>
        <Button onClick={handleNavigate}>跳转至ng路由-hero-list</Button>
      </div>
      <div className="test">
        <img
          src={require("./img/hml.jpg")}
          alt="Smiley face"
          width="100"
          height="100"
        ></img>
      </div>
    </InputWrapper>
  );
};

export default Comp1;
