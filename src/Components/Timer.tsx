import React from "react";
import Clock from "react-live-clock";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 30vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  span:first-child {
    font-size: 80px;
    letter-spacing: 5px;
  }
  span:last-child {
    font-size: 30px;
  }
`;
const Timer = () => {
  return (
    <Wrapper>
      <span>
        <Clock format="HH:mm:ss" ticking={true} />
      </span>
      <span>
        <Clock format="MMM D ddd" />
      </span>
    </Wrapper>
  );
};

export default Timer;
