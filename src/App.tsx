import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;

const H1 = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

interface DummyProps {
  text: string;
  active?: boolean;
}

function Dummy({ text, active = false }: DummyProps) {
  return <H1>{text}</H1>;
}

function App() {
  const [counter, setCounter] = useState(0);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <Container>
      <Dummy active={true} text={"hello"} />
      <form onSubmit={onSubmit}></form>
      <button onClick={onClick}>Click me</button>
    </Container>
  );
}

export default App;

// https://reactjs.org/docs/events.html
/* SyntheticEvent (합성 이벤트)
이벤트 핸들러는 모든 브라우저에서 이벤트를 동일하게 처리하기 위한 이벤트 래퍼 SyntheticEvent 객체를 전달받습니다.

Keyboard Events
ex) onKeyDown onKeyPress onKeyUp

Focus Events
ex) onFocus onBlur

Form Events
ex) onChange onInput onInvalid onReset onSubmit

Generic Events
ex) onError onLoad

etc.. */

/* 
어떤 라이브러리나 패키지를 다운로드 하면 타입스크립트 선언 파일(declaration)이 없음
대부분 유명한 라이브러리들은 Definitely Typed라는 레퍼지토리 내에 있음(모든 걸 다 보여주지는 않음)
그래서 "npm i --save-dev @types/다운로드한 라이브러리 명"해보기!
*/
