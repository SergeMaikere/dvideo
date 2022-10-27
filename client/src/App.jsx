//import { EthProvider } from "./contexts/EthContext";
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Menu from './components/Menu';

const App = () => {

    return (
        <Router>
            <Header/>
            <Menu/>
            <Routes>
                <Route path='/' element={<Home />} />
            </Routes>
        </Router>
    );
}

export default App;
