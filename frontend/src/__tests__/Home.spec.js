import React from "react";
import { create } from "react-test-renderer";

import renderer from 'react-test-renderer';
import { Link } from 'react-router-dom';
import { StaticRouter } from 'react-router'

function Button(props) {
    return <button>Signup</button>;
  }

describe("button component", () => {
  test("matches the snapshot", () => {
    const button = create(<Button />);
    expect(button.toJSON()).toMatchSnapshot();
  });
});

test('link matches snapshot', () => {
  const component = renderer.create(
    <StaticRouter >
      <Link to="/login" />
    </StaticRouter>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});