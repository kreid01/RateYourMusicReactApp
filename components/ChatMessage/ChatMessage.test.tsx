import React from "react";
import { cleanup, render, screen } from "@testing-library/react-native";
import "@testing-library/jest-dom";
import { NativeBaseProvider } from "native-base";
import { Provider } from "urql";
import { Provider as ReduxProvider } from "react-redux";
import { expect } from "@jest/globals";
import renderer from "react-test-renderer";
import { ChatMessaage } from "./ChatMessage";
import store from "../../store/store";
import { QueryClient, QueryClientProvider } from "react-query";

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

const refresh = jest.fn();

afterEach(cleanup);

const client = new QueryClient();

it("makes a request on render", async () => {
  const mockClient = {
    executeQuery: jest.fn(() => null),
    executeMutation: jest.fn(() => null),
    executeSubscription: jest.fn(() => null),
  };

  renderer.create(
    <QueryClientProvider client={client}>
      <ReduxProvider store={store}>
        <Provider value={mockClient as any}>
          <NativeBaseProvider initialWindowMetrics={inset}>
            <ChatMessaage
              message={{
                content: "test",
                channelId: 1,
              }}
              refresh={refresh}
            />
            ;
          </NativeBaseProvider>
        </Provider>
      </ReduxProvider>
    </QueryClientProvider>
  );
  expect(mockClient.executeQuery).toBeCalled();
});

it("matched snapshot", async () => {
  const tree = renderer
    .create(
      <QueryClientProvider client={client}>
        <ReduxProvider store={store}>
          <NativeBaseProvider>
            <ChatMessaage
              message={{
                content: "test",
                channelId: 1,
              }}
              refresh={refresh}
            />
            ;
          </NativeBaseProvider>
        </ReduxProvider>
      </QueryClientProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});