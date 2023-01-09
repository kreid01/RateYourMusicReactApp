import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { NativeBaseProvider, Spinner } from "native-base";
import { Navigation } from "./components/Navigation";
import { setAccessToken } from "./utils/accessToken";
import { getRefreshToken, setRefreshToken } from "./utils/refreshToken";
import store from "./store/store";
import { Provider } from "react-redux";
import axios from "axios";
import { devtoolsExchange } from "@urql/devtools";

export default function App() {
  const client = new QueryClient();

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getRefreshToken();
      const { data: response } = await axios.post(
        "http://192.168.0.15:80/auth",
        { token: token }
      );
      if (await response) {
        const { refreshToken, accessToken } = response;
        await setRefreshToken(refreshToken);
        setAccessToken(accessToken);
        setLoading(false);
      }
    };
    fetchToken();
  }, []);

  const [loading, setLoading] = useState(true);

  return !loading ? (
    <QueryClientProvider client={client}>
      <Provider store={store}>
        <NativeBaseProvider>
          <Navigation />
        </NativeBaseProvider>
      </Provider>
    </QueryClientProvider>
  ) : (
    <NativeBaseProvider>
      <Spinner />
    </NativeBaseProvider>
  );
}
