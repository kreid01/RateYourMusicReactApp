import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBar: {
    width: "100%",
    height: 85,
    position: "absolute",
    right: 16,
    backgroundColor: "#1e293b",
  },
  btn: {
    width: 50,
    height: 30,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: "#1e293b",
    backgroundColor: "#1e293b",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginbottom: 10,
    fontSize: 10,
    textAlign: "center",
    color: "white",
  },
});

export const navStyles = styles;
