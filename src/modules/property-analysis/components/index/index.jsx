import React, { useState, useEffect } from 'react'
import IndexTablePropertyAnalysis from "./index.table.jsx";
import IndexNewButton from "./index.new-button.jsx"

function IndexPropertyAnalysis(currentUser) {

    return (
        <>
            <IndexNewButton currentUser={currentUser} />
            <IndexTablePropertyAnalysis currentUser={currentUser} />
        </>
        
    );
}

export default IndexPropertyAnalysis;
