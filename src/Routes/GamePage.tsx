// import Game from '../Components/Game'
import {useParams} from "react-router"
import { Client} from '@stomp/stompjs';
import {useRef, useState, useEffect} from 'react'
import Game from '../Components/Game'

interface Message {
    playerId: string;
    message: string;
}

export default function GamePage(){

    const {roomId} = useParams(); 
    const [groupChat, setGroupChat] = useState<Message | null>(null);
      const clientRef = useRef<Client | null>(null);   
    

    useEffect(() => {
        const client = new Client({
        brokerURL: "http://localhost:8080/ws",
        reconnectDelay: 5000,
        onConnect: () => {
            console.log("client connected");
            if(roomId){
                console.log("we set localStorage")
                localStorage.setItem("roomId", roomId);
            }

            //subscribe to my room 
            client.subscribe(`/topic/rooms/${roomId}`, message => {
                try{
                    console.log("we subscribed");
                    const myMessage: Message = JSON.parse(message.body)
                    console.log("received: ", myMessage.message, "from: ", myMessage.playerId);
                    setGroupChat(myMessage)
                } catch(err){
                    console.log("something went wrong error with subscription", err);
                }
            })
            
        },
        onDisconnect: () => {
            console.log('we disconnected')
        },
    })

    clientRef.current = client;
    client.activate();


    return () => {
        client.deactivate();
        clientRef.current = null;
    }
    }, [roomId])






    return (
        <>
            <h1>Welcome to Shax Game</h1>
            <button onClick={() => {
                
                const theBody = JSON.stringify({roomId:roomId, playerId:`${localStorage.getItem("playerId")}`, message:"heyyy big man"})

                 clientRef.current?.publish({ destination: `/topic/rooms/${roomId}`, body: theBody });

            }}>broadcast my message</button>


            <Game message={groupChat}></Game>
        </>
    );
}



// const handleConnect = () => {
//         client.subscribe(`/topic/room/${localStorage.getItem("roomId")}`, message => {
//             console.log(`Received: ${message.body}`)
//         })
//         const payload = {roomId: `${localStorage.getItem("roomId")}`}

//         client.publish({destination: `/app/room/${localStorage.getItem("roomId")}`, body: 
//         JSON.stringify(payload)

//         });

//     }