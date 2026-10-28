import { useParams } from 'react-router';
import { Client } from '@stomp/stompjs';
import { useEffect, useRef, useState } from 'react';
import { api } from '../services/api';
import type {GameState} from '../types/GameState'
import Board from '../Components/Board'
import type {MoveRequest} from '../types/MoveRequest'
import {wsUrl} from "../config";
import { Check, Copy, Loader2 } from 'lucide-react';
import { TopNav } from '../Components/TopNav';
import { ShaxBoard } from '../Components/PlayGame';




export default function GamePage() {
  const { roomId } = useParams<{ roomId: string }>();
  const clientRef = useRef<Client | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const joining = useRef(false);
  const [connected, setConnected] = useState(false);
  const [copied, setCopied] = useState(false);
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


  

  const inviteLink = `${window.location.origin}/room/${roomId}`;

  const copyInviteLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.log(err);
    }
  };

  let content;

  if (!connected) {
    content = (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <Loader2 className="w-6 h-6 text-[#9E3A14] animate-spin" />
        <span className="mt-4 text-[11px] font-mono tracking-widest uppercase text-[#78716C]">
          Connecting to the room…
        </span>
      </div>
    );
  } else if (gameState?.board == null) {
    content = (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left: Invitation */}
        <div className="lg:col-span-7 max-w-2xl">
          <span className="block text-[11px] font-mono tracking-widest uppercase text-[#9E3A14]">
            Room · {roomId}
          </span>

          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-[#1C1917] tracking-tight leading-[1.08] text-balance">
            Waiting for Your Opponent
          </h1>

          <p className="mt-6 text-lg lg:text-xl font-serif text-[#57534E] leading-relaxed">
            The board is set. Send this link to your friend, and the game will begin as soon as they take their seat.
          </p>

          {/* Invite link */}
          <div className="mt-10">
            <span className="block text-[11px] font-mono tracking-widest uppercase text-[#78716C]">
              Invitation Link
            </span>
            <div className="mt-3 flex flex-col sm:flex-row gap-3">
              <a
                href={inviteLink}
                className="flex-1 min-w-0 truncate px-4 py-4 border border-[#EAE5DC] bg-white rounded-sm text-sm font-mono text-[#44403C] hover:border-[#9E3A14]/60 transition-colors"
              >
                {inviteLink}
              </a>
              <button
                type="button"
                onClick={copyInviteLink}
                className="inline-flex items-center justify-center gap-3 px-7 py-4 bg-[#1C1917] text-[#FBF9F5] text-xs font-sans font-medium uppercase tracking-widest rounded-sm shadow-xs hover:bg-[#9E3A14] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9E3A14] transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied" : "Copy Link"}
              </button>
            </div>
          </div>

          {/* Status */}
          <div className="mt-8 flex items-center gap-3">
            <span className="relative flex w-2.5 h-2.5">
              <span className="absolute inline-flex w-full h-full rounded-full bg-[#9E3A14] opacity-60 animate-ping" />
              <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-[#9E3A14]" />
            </span>
            <span className="text-sm font-serif italic text-[#57534E]">
              Waiting for the second player to join…
            </span>
          </div>
        </div>

        {/* Right: The board */}
        <figure className="lg:col-span-5 w-full max-w-md mx-auto lg:max-w-none border border-[#EAE5DC] bg-white p-4 rounded-sm shadow-xs">
          <div className="relative bg-[#EFEAE1] aspect-square p-10 sm:p-12">
            <ShaxBoard />
            <span className="absolute top-3 left-3 px-2 py-0.5 bg-[#1C1917]/80 text-[#FBF9F5] text-[10px] font-mono tracking-widest uppercase rounded-xs">
              Your Board
            </span>
          </div>
          <figcaption className="pt-4 px-1">
            <span className="block text-[11px] font-mono tracking-widest uppercase text-[#78716C]">
              While You Wait
            </span>
            <p className="mt-1.5 text-xs text-[#57534E] font-serif italic leading-relaxed">
              Players take turns placing their twelve pieces. Three in a row lets you capture one of your opponent's pieces.
            </p>
          </figcaption>
        </figure>
      </div>
    );
  } else {
    content = (
      <Board sendMove={sendMove} gameState={gameState} player={localStorage.getItem("playerName")}></Board>
    );
  }

  return (
    <>
      <TopNav />
      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {content}
        </div>
      </section>
    </>
  );
}