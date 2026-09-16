// import {useEffect, useRef, useState} from 'react'

interface Message {
    playerId: string;
    message: string ;
}

interface GameProps {
    message: Message | null
}

export default function Game({message}: GameProps){


    return( 
        <>
        <div>
        </div>
        <h1>{message? `player with id: ${message.playerId} has said this: ${message.message}` : 'there is no message broadcasted yet'}</h1>
        </>
    );
    
}