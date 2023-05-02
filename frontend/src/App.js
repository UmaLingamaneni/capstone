import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/authentication/login";
import Register from "./pages/authentication/register";
import Home from "./pages/home";
import N_Content from "./pages/ncontent/ncontent";
import { ThemeProvider, createTheme } from '@mui/material/styles';

function App() {


  const theme =  createTheme({
    palette: {
      primary: {
        main: "#ef9a26",
      },
    },
  });

  return (
    <ThemeProvider  theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/ncontent" element={<N_Content />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
