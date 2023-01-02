import React from "react";
import { screen, render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ArtistName } from "./ArtistName";
import { NativeBaseProvider } from "native-base";

const handleEdit = jest.fn();

afterEach(cleanup);
it("render without crashing", async () => {
  render(
    <NativeBaseProvider>
      <ArtistName color="text-red-500" id={1} />;
    </NativeBaseProvider>
  );
});
