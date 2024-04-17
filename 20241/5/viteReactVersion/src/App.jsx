import React, { useState, useEffect } from 'react';
import './App.css';
// import TaskList from './components/TaskManager.jsx';
// import TopButton from './components/TopButton.jsx';
// import InputPlace from './components/InputPlace.jsx';
import AllLists from "./components/TodoList.jsx";

function App() {
    return (
        <div className="bigPart">
            <AllLists />
        </div>
    );
}

export default App;
