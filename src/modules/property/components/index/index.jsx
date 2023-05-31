import React, { useState, useEffect } from 'react'
import IndexTableProject from "./index.table.jsx";
import IndexNewButton from "./index.new-button"

function IndexProject(currentUser) {

    return (
        <>
            <IndexNewButton currentUser={currentUser} />
            <IndexTableProject currentUser={currentUser} />
        </>
        
    );
}

export default IndexProject;
