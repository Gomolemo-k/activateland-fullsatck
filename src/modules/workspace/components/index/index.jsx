import React, { useState, useEffect } from 'react'
import IndexTableWorkspace from "./index.table.jsx";
import IndexNewButton from "./index.new-button"

function IndexWorkspace(currentUser) {

    return (
        <>
            <IndexNewButton currentUser={currentUser} />
            <IndexTableWorkspace currentUser={currentUser} />
        </>
        
    );
}

export default IndexWorkspace;