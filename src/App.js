import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Pages/Home'
import Detail from './Pages/Detail'



function App() {
  return (
    <div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/Detail/" element={<Detail />} />
    </Routes>
  </BrowserRouter>
  </div>
  );
}

export default App;
