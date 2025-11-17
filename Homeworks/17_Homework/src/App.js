
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './layout/Layout';
import Home from "./pages/Home"
import About from "./pages/About"
import Fact from "./pages/Fact"
import ErrorPage from "./pages/404"


function App() {
  return (
    <Layout>
      <Routes>
        <Route path={"/"} element={<Home />}></Route>  
        <Route path={"/about/:aboutId"} element={<About />}></Route>  
        <Route path={"/fact/:factId"} element={<Fact />}></Route>  
        <Route path={"*"} element={<ErrorPage />}></Route>  
      </Routes> 
    </Layout>
  );
}

export default App;
