import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { NativeBaseProvider, Text } from "native-base";
import { Navigation } from "./components/Navigation";
import { Provider, createClient } from "urql";
import { getAccessToken } from "./utils/accessToken";

export const urqlClient = createClient({
  url: "http://192.168.0.120:80/graphql",
  fetchOptions: () => {
    const token = getAccessToken();
    return {
      headers: { authorization: token ? `Bearer ${token}` : "" },
    };
  },
});

export default function App() {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <Provider value={urqlClient}>
        <NativeBaseProvider>
          <Navigation />
        </NativeBaseProvider>
      </Provider>
    </QueryClientProvider>
  );
}
