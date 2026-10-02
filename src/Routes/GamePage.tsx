import { useParams } from 'react-router';
import { Client } from '@stomp/stompjs';
import { useEffect, useRef, useState } from 'react';
import { api } from '../services/api';
import type {GameState} from '../types/GameState'
import Board from '../Components/Board'
import type {MoveRequest} from '../types/MoveRequest'
import {wsUrl} from "../config";




export default function GamePage() {
  const { roomId } = useParams<{ roomId: string }>();
  const clientRef = useRef<Client | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const joining = useRef(false);
  const [connected, setConnected] = useState(false);
  const playerNumRef = useRef<string | null>("P1");
  
  
  
  

  // However you stored it when the player joined the room
  


  useEffect(() => {

    if (localStorage.getItem('playerId') == null){
        joining.current = true;
        playerNumRef.current = "P2"
        localStorage.setItem("playerName", "P2")
        //make a request to join the game
        const joinGame = async () => {
            try{
                const res = await api.post(`/api/v1/rooms/${roomId}/join`)
                const data = res.data;
                const playerId = data.playerId;
                localStorage.setItem("playerId", playerId);
                localStorage.setItem("playerName", "P2")
            } catch(err){
               console.log(err)
            }
        }

        joinGame();

    }

    if (!roomId) return;

    const client = new Client({
      brokerURL: wsUrl('/ws'),
      reconnectDelay: 5000, // auto-reconnect after 5s
      debug: str => console.log(str), // remove once it works
    });

    client.onConnect = () => {
      setConnected(true);

      // 1. Live updates for everyone in the room
      client.subscribe(`/topic/room/${roomId}`, msg => {
        console.log(JSON.parse(msg.body))
        setGameState(JSON.parse(msg.body));
      });

      // 2. Private errors (from @SendToUser("/queue/errors"))
      client.subscribe('/user/queue/errors', msg => {
        alert(msg.body);
      });

      // 3. One-time snapshot (from @SubscribeMapping("/room/{roomId}"))
      client.subscribe(`/app/room/${roomId}`, msg => {
        setGameState(JSON.parse(msg.body));
      });
    };

    client.onWebSocketClose = () => setConnected(false);

    client.onStompError = frame => {
      console.error('STOMP error:', frame.headers['message'], frame.body);
    };

    client.activate();
    clientRef.current = client;

  

    return () => {
      client.deactivate();
    };
  }, [roomId]);


 

  const sendMove = (move: MoveRequest) => {
    const playerId = localStorage.getItem("playerId")
    if (!clientRef.current?.connected || !playerId) return;
    clientRef.current.publish({
      destination: `/app/room/${roomId}/move`,
      headers: {playerId},
      body: JSON.stringify(move),
    });
  };


  

  if (!connected) return <p>Connecting…</p>;

  if (gameState?.board == null) return (
  
    <>
        <h1>Welcome to the room with RoomID:  {roomId}</h1>
        <h3>Waiting for other player.... please send this link so they can join: </h3>
        <a href={`${window.location.origin}/room/${roomId}`} >link for other player </a>
       
    </>
  
 
  );


  return (
    <div>

      <Board sendMove={sendMove} gameState={gameState} player={localStorage.getItem("playerName")}></Board>
      <button onClick={() => {
        sendMove({type:'HELP', from:null, to:null})
      }}>No Positions to Move? Ask for Help</button>
    </div>
  );
}