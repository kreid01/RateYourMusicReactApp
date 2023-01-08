import React from "react";
import "@testing-library/jest-dom";
import { NativeBaseProvider } from "native-base";
import { Provider } from "urql";
import { expect } from "@jest/globals";
import renderer from "react-test-renderer";
import { ChannelComponent } from "./ChannelComponent";
import { render, cleanup } from "react-native-testing-library";

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

const navigation = jest.fn();

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
        <ChannelComponent
          id={1}
          title={"test-title"}
          key={1}
          navigation={navigation}
        />
      </NativeBaseProvider>
    </Provider>
  );
  expect(mockClient.executeQuery).toBeCalled();
});

it("matched snapshot", async () => {
  const tree = renderer
    .create(
      <NativeBaseProvider>
        <ChannelComponent
          id={1}
          title={"test-title"}
          key={1}
          navigation={navigation}
        />
      </NativeBaseProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("displays correct title based on props", () => {
  const rendered = render(
    <NativeBaseProvider initialWindowMetrics={inset}>
      <ChannelComponent
        id={1}
        title={"test-title"}
        key={1}
        navigation={navigation}
      />
    </NativeBaseProvider>
  );
  expect(rendered.getByTestId("title").props).toEqual("test-title");
});
