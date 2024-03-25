//REPLACE THE REACT APP.JS GENERATED FILE WITH THIS

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Permits from './pages/Permits';
import Add from './pages/add';
import Update from './pages/update';
import "./style.css";

const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Permits />} />
                    <Route path="/add" element={<Add />} />
                    <Route path="/update/:id" element={<Update />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
