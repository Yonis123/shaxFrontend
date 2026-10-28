import type {GameState} from '../types/GameState'
import Spot from '../Components/Spot'
import { pebbleStyle } from './pebble'
import "./Board.css"
import type {MoveRequest} from "../types/MoveRequest"
import {useState} from 'react'
import {useNavigate} from 'react-router'
import { ArrowLeft, LifeBuoy } from 'lucide-react'

type BoardProps = {
    gameState: GameState
    sendMove: (move: MoveRequest) => void;
    player: string | null
}

const COORDS: [number, number][] = [
  [0,0], [3,0], [6,0],                      // 0, 1, 2
  [1,1], [3,1], [5,1],                      // 3, 4, 5
  [2,2], [3,2], [4,2],                      // 6, 7, 8
  [0,3], [1,3], [2,3], [4,3], [5,3], [6,3], // 9 – 14
  [2,4], [3,4], [4,4],                      // 15, 16, 17
  [1,5], [3,5], [5,5],                      // 18, 19, 20
  [0,6], [3,6], [6,6],                      // 21, 22, 23
];

const PHASE_LABELS: Record<string, string> = {
    PLACING: "Placing",
    REMOVING: "Capture",
    MOVING: "Moving",
    ENDED: "Game Over",
}

const pieceClass = (p: string) => (p === "P1" ? "pebble p1" : "pebble p2")

export default function Board({player, gameState, sendMove }: BoardProps) {

    const [from, setFrom] = useState<string | null>(null)
    const navigate = useNavigate();

    const ended = gameState.phase == "ENDED"
    const myTurn = !ended && gameState.currentTurn == player
    const opponent = player == "P1" ? "P2" : "P1"

    const pieces = Object.values(gameState.board)
    const count = (p: string) => pieces.filter((owner) => owner == p).length

    function handleClick(index: string) {
        if (!myTurn) return

        if (gameState.phase == "PLACING") {
            sendMove({type: "PLACE", from: null, to: index})
        } else if (gameState.phase == "REMOVING") {
            sendMove({type: "REMOVE", from: null, to: index})
        } else if (gameState.phase == "MOVING") {
            if (from == null) {
                setFrom(index)
            } else if (from == index) {
                setFrom(null)
            } else {
                sendMove({type: "MOVE", from: from, to: index})
                setFrom(null)
            }
        }
    }

    let heading: string
    let instruction: string

    if (ended) {
        heading = gameState.winner == player ? "You Won" : "Your Opponent Won"
        instruction = gameState.winner == player
            ? "A well-played game. Your strategy was far beyond your opponent's."
            : "Shaxdaan degay ba maad garan. Better luck in the next game."
    } else if (!myTurn) {
        heading = "Opponent's Turn"
        instruction = "Wait for your opponent to make their move."
    } else if (gameState.phase == "PLACING") {
        heading = "Your Turn"
        instruction = "Place one of your pieces on any empty point."
    } else if (gameState.phase == "REMOVING") {
        heading = "Capture a Piece"
        instruction = "You formed a line. Choose one of your opponent's pieces to remove."
    } else {
        heading = "Your Turn"
        instruction = from == null
            ? "Select one of your pieces to move."
            : "Now choose an empty point to move it to, or tap the piece again to cancel."
    }

    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Board */}
        <figure className="lg:col-span-7 w-full max-w-xl mx-auto border border-[#EAE5DC] bg-white p-4 rounded-sm shadow-xs">
          <div className="board-wrapper relative">
            <div className="board">
              <svg className="board-lines" viewBox="0 0 6 6" aria-hidden="true">
                <rect x="0" y="0" width="6" height="6" />
                <rect x="1" y="1" width="4" height="4" />
                <rect x="2" y="2" width="2" height="2" />
                <line x1="3" y1="0" x2="3" y2="2" />
                <line x1="3" y1="4" x2="3" y2="6" />
                <line x1="0" y1="3" x2="2" y2="3" />
                <line x1="4" y1="3" x2="6" y2="3" />
              </svg>

              {Object.entries(gameState.board).map(([index, owner]) => {
                const [x, y] = COORDS[Number(index)];
                return (
                  <div
                    key={index}
                    className="spot-position"
                    style={{ left: `${(x / 6) * 100}%`, top: `${(y / 6) * 100}%` }}
                  >
                    <Spot
                      seed={Number(index) + 1}
                      player={owner}
                      selected={from == index}
                      disabled={!myTurn}
                      label={`Point ${Number(index) + 1}: ${owner == null ? "empty" : owner == player ? "your piece" : "opponent's piece"}`}
                      onClick={() => handleClick(index)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </figure>

        {/* Status panel */}
        <aside className="lg:col-span-5 w-full max-w-xl mx-auto lg:max-w-none">
          <span className="block text-[11px] font-mono tracking-widest uppercase text-[#9E3A14]">
            {PHASE_LABELS[gameState.phase] ?? gameState.phase}
          </span>

          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-[#1C1917] tracking-tight leading-[1.1] text-balance">
            {heading}
          </h1>

          <p className="mt-4 text-base lg:text-lg font-serif text-[#57534E] leading-relaxed" aria-live="polite">
            {instruction}
          </p>

          {/* Players */}
          <ul className="mt-10 border-t border-[#EAE5DC]">
            {[player ?? "P1", opponent].map((p) => {
              const active = !ended && gameState.currentTurn == p
              return (
                <li key={p} className="flex items-center gap-4 py-4 border-b border-[#EAE5DC]">
                  <span className={`${pieceClass(p)} block w-7 h-7 shrink-0`} style={pebbleStyle(p == "P1" ? 3 : 7)} aria-hidden="true" />
                  <div className="flex-1">
                    <span className="block text-base font-serif font-semibold text-[#1C1917]">
                      {p == player ? "You" : "Opponent"}
                    </span>
                    <span className="block text-[11px] font-mono tracking-widest uppercase text-[#78716C]">
                      {count(p)} {count(p) == 1 ? "piece" : "pieces"} on the board
                    </span>
                  </div>
                  {active && (
                    <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 bg-[#1C1917]/80 text-[#FBF9F5] rounded-xs">
                      To Move
                    </span>
                  )}
                </li>
              )
            })}
          </ul>

          <div className="mt-8">
            {ended ? (
              <button
                type="button"
                onClick={() => navigate("/")}
                className="group inline-flex items-center justify-center gap-3 px-7 py-4 bg-[#1C1917] text-[#FBF9F5] text-xs font-sans font-medium uppercase tracking-widest rounded-sm shadow-xs hover:bg-[#9E3A14] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9E3A14] transition-colors"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                Back to Home
              </button>
            ) : (
              <button
                type="button"
                onClick={() => sendMove({type: 'HELP', from: null, to: null})}
                className="inline-flex items-center gap-3 px-6 py-3 border border-[#EAE5DC] bg-white text-xs font-sans font-medium uppercase tracking-widest text-[#57534E] rounded-sm hover:border-[#9E3A14]/60 hover:text-[#9E3A14] transition-colors"
              >
                <LifeBuoy className="w-4 h-4" />
                No Moves? Ask for Help
              </button>
            )}
          </div>
        </aside>
      </div>
    );
}
