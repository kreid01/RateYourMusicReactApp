import React from "react";
import { cleanup } from "@testing-library/react-native";
import "@testing-library/jest-dom";
import { ArtistName } from "./ArtistName";
import { NativeBaseProvider } from "native-base";
import { Provider } from "urql";
import { expect } from "@jest/globals";
import renderer, { act } from "react-test-renderer";

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
        <ArtistName color="text-red-500" id={1} />;
      </NativeBaseProvider>
    </Provider>
  );
  expect(mockClient.executeQuery).toBeCalled();
});

it("matched snapshot", async () => {
  const tree = renderer
    .create(
      <NativeBaseProvider>
        <ArtistName color="text-red-500" id={1} />;
      </NativeBaseProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
