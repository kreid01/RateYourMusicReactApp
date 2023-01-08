import React from "react";
import {
  screen,
  render,
  cleanup,
  fireEvent,
} from "@testing-library/react-native";
import "@testing-library/jest-dom";
import { EditRelease } from "./EditRelease";
import { NativeBaseProvider } from "native-base";
import renderer, { act } from "react-test-renderer";
import { expect } from "@jest/globals";

const handleEdit = jest.fn();

const mockRelease = {
  title: "test",
  artistId: 0,
  id: 0,
  type: "Album",
  released: "1999 Scotland",
  ratingCount: 1,
  rating: 5,
  cover: "testimgaeurl",
  language: "English",
  tracks: ["track1", "track2"],
  genres: ["genre1", "genre2"],
};

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

afterEach(cleanup);

it("matched snapshot", async () => {
  const tree = renderer
    .create(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <EditRelease release={mockRelease} handleEdit={handleEdit} />;
      </NativeBaseProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("hides component if cancel button is clicked", async () => {
  render(
    <NativeBaseProvider initialWindowMetrics={inset}>
      <EditRelease release={mockRelease} handleEdit={handleEdit} />;
    </NativeBaseProvider>
  );
  act(() => {
    fireEvent.press(screen.getByTestId("edit-button"));
  });
  expect(handleEdit).toBeCalled();
});
