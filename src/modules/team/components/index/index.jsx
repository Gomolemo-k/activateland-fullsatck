import React, { useState, useEffect } from 'react'
import IndexTableTeam from "./index.table.jsx";
import IndexNewButton from "./index.new-button"

function IndexTeam(currentUser) {

    return (
        <>
            <IndexNewButton currentUser={currentUser} />
            <IndexTableTeam currentUser={currentUser} />
        </>
        
    );
}

export default IndexTeam;
