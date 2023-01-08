import { ThemeProvider } from "styled-components";
import theme from "./theme/theme";
import { useContext } from "react";
import { themeContext } from "./context/ThemeProvider";
import { ThemeType } from "./types/type";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Routes from "./Routes";
import queryClient from "./react-query/queryClient";
import { GlobalStyle } from "./styles/GlobalStyle";

const App = () => {
  // context
  const context = useContext(themeContext);

  return (
    <ThemeProvider theme={theme[context?.value as ThemeType]}>
      <QueryClientProvider client={queryClient}>
        <Routes />
        <ReactQueryDevtools />
      </QueryClientProvider>
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default App;
