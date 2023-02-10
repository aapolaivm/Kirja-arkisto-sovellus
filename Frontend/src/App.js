import React from "react";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
import Homepage from "components/Homepage";

const App = () => {
    return (
        <div>
            <Routes>
                <Route exact path="/" element={<Homepage />} />
            </Routes>
        </div>
    );
};

export default App;