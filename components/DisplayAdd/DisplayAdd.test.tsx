import React from "react";
import {
  screen,
  render,
  cleanup,
  fireEvent,
} from "@testing-library/react-native";
import "@testing-library/jest-dom";
import { NativeBaseProvider } from "native-base";
import renderer, { act } from "react-test-renderer";
import { expect } from "@jest/globals";
import { DisplayAdd } from "./DisplayAdd";

const handleEdit = jest.fn();

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

afterEach(cleanup);

it("matched snapshot", async () => {
  const tree = renderer
    .create(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <DisplayAdd releaseTitle="test" />
      </NativeBaseProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("hides component if cancel button is clicked", async () => {
  render(
    <NativeBaseProvider initialWindowMetrics={inset}>
      <DisplayAdd releaseTitle="test" />
    </NativeBaseProvider>
  );
  screen.getByTestId("playlist-add");
});
