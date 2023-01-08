import { ThemeProvider } from "styled-components";
import { useContext } from "react";
import { themeContext } from "./context/ThemeProvider";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Routes from "./Routes";
import queryClient from "./react-query/queryClient";
import { GlobalStyle } from "./styles/GlobalStyle";

const App = () => {
  // context
  const { value: theme } = useContext(themeContext);

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Routes />
        <ReactQueryDevtools />
      </QueryClientProvider>
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default App;
