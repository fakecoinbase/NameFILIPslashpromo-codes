import React from "react";

import { styled } from "baseui";
import { H1, H2 } from "baseui/typography";
import { StyledLink } from "baseui/link";
import { Card, StyledBody } from "baseui/card";

import { promoCodes } from "./promo-codes";

const centered = { textAlign: "center" };

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

const CardRow = styled("div", ({ $theme }) => ({
  marginBottom: $theme.sizing.scale100,
}));

const Label = styled("span", ({ $theme }) => ({
  ...$theme.typography.LabelMedium,
}));

function Item(props) {
  const { item } = props;
  return (
    <Card title={item.name} overrides={cardOverrides}>
      <StyledBody>
        {item.description && (
          <CardRow>
            <Label>Description:</Label> {item.description}
          </CardRow>
        )}
        {item.code && (
          <CardRow>
            <Label>Code:</Label> {item.code}
          </CardRow>
        )}
        {item.link && (
          <CardRow>
            <Label>Link:</Label>{" "}
            <StyledLink href={item.link}>{item.link}</StyledLink>
          </CardRow>
        )}
      </StyledBody>
    </Card>
  );
}

function Items(props) {
  const { title, items } = props;
  return (
    <div>
      <H2 style={centered}>{title}</H2>
      {items.map((item) => (
        <Item key={item.name} item={item} />
      ))}
    </div>
  );
}

function App() {
  return (
    <Container>
      <H1 style={centered}>Promo Codes</H1>
      {Object.keys(byCategory).map((category) => (
        <Items key={category} title={category} items={byCategory[category]} />
      ))}
    </Container>
  );
}

export default App;
