import { ThemeProvider } from "./components/themeContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "./routes";
import useTheme from "./hooks/useTheme";
import ScrollToTop from "./components/ScrollToTop";

// import "./App.css";

function App() {
  const { darkMode } = useTheme();
  return (
    <>
      <ThemeProvider>
        <Router />
        <ScrollToTop />
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          draggable
          theme={darkMode ? "dark" : "light"}
        />
      </ThemeProvider>
    </>
  );
}

export default App;
