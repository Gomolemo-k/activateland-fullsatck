import React, { useState, useEffect } from 'react'
import IndexTableTeamMember from "./index.table.jsx";
import IndexNewButton from "./index.new-button"

function IndexTeamMember(currentUser) {

    return (
        <>
            <IndexNewButton currentUser={currentUser} />
            <IndexTableTeamMember currentUser={currentUser} />
        </>
        
    );
}

export default IndexTeamMember;
