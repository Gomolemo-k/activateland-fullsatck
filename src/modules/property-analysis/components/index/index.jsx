import React, { useState, useEffect } from 'react'
import IndexTableProperty from "./index.table.jsx";
import IndexNewButton from "./index.new-button"

function IndexProperty(currentUser) {

    return (
        <>
            <IndexNewButton currentUser={currentUser} />
            <IndexTableProperty currentUser={currentUser} />
        </>
        
    );
}

export default IndexProperty;
