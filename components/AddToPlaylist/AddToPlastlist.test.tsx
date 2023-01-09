import React from "react";
import { cleanup } from "@testing-library/react-native";
import "@testing-library/jest-dom";
import { NativeBaseProvider } from "native-base";
import { Provider } from "urql";
import { Provider as ReduxProvider } from "react-redux";
import { expect } from "@jest/globals";
import renderer from "react-test-renderer";
import { AddToPlaylist } from "./AddToPlaylist";
import store from "../../store/store";

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

afterEach(cleanup);

it("makes a request on render", async () => {
  const mockClient = {
    executeQuery: jest.fn(() => null),
    executeMutation: jest.fn(() => null),
    executeSubscription: jest.fn(() => null),
  };

  renderer.create(
    <Provider value={mockClient as any}>
      <NativeBaseProvider initialWindowMetrics={inset}>
        <ReduxProvider store={store}>
          <AddToPlaylist releaseId={1} releaseTitle="test-title" />
        </ReduxProvider>
      </NativeBaseProvider>
    </Provider>
  );
  expect(mockClient.executeQuery).toBeCalled();
});

it("matched snapshot", async () => {
  const tree = renderer
    .create(
      <NativeBaseProvider>
        <AddToPlaylist releaseId={1} releaseTitle="test-title" />
      </NativeBaseProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
