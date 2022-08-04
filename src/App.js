import Game from "./Game";
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Start from "./Start";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
      <Routes>
        <Route path="*" element={<Start />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
