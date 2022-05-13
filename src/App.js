import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Pages/Home'
import Detail from './Pages/Detail'
import About from './Pages/About'



function App() {
  return (
    <div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/About/" element={<About />} />
      <Route path="/Detail/:id" element={<Detail />} />
    </Routes>
  </BrowserRouter>
  </div>
  );
}

export default App;
