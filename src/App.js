import React from "react";

import { styled } from "baseui";
import { H1, H2, H3, H4, H5, H6 } from "baseui/typography";
import { StyledLink } from "baseui/link";
import { Card, StyledBody, StyledAction } from "baseui/card";

// import logo from "./logo.svg";
// import "./App.css";
import { promoCodes } from "./promo-codes";

/* <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
    </div> */

const Container = styled("div", {
  margin: "20px",
});

const byCategory = promoCodes.reduce((result, item) => {
  item.categories.forEach((category) => {
    result[category] = (result[category] || []).concat(item);
  });
  return result;
}, {});

const cardOverrides = {
  Root: {
    style: {
      margin: "10px",
    },
  },
};

function Item(props) {
  const { item } = props;
  return (
    <Card title={item.name} overrides={cardOverrides}>
      <StyledBody>
        {item.description && <div>{item.description}</div>}
        {item.code && <div>Code: {item.code}</div>}
        <StyledLink href={item.link}>{item.link}</StyledLink>
      </StyledBody>
    </Card>
  );
}

function Items(props) {
  const { title, items } = props;
  return (
    <div>
      <H2>{title}</H2>
      {items.map((item) => (
        <Item item={item} />
      ))}
    </div>
  );
}

function App() {
  return (
    <Container>
      <H1>Promo Codes</H1>
      {Object.keys(byCategory).map((category) => (
        <Items title={category} items={byCategory[category]} />
      ))}
    </Container>
  );
}

export default App;
