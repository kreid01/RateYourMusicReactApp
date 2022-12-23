import React from "react";
import { screen, render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ArtistName } from "./ArtistName";
import { NativeBaseProvider } from "native-base";

const handleEdit = jest.fn();
const mockRelease = {
  title: "test",
  artistId: 0,
  id: 0,
  type: "Album",
  recorded: "1999 Scotland",
  ratingCount: 1,
  rating: 5,
  cover: "testimgaeurl",
  language: "English",
  tracks: ["track1", "track2"],
  genres: ["genre1", "genre2"],
};

afterEach(cleanup);
it("render without crashing", async () => {
  render(
    <NativeBaseProvider>
      <ArtistName color="text-red-500" id={1} />;
    </NativeBaseProvider>
  );
});
