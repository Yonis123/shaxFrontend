import { useState } from 'react'
import {useNavigate} from 'react-router'
import { ArrowRight, Loader2 } from 'lucide-react'
import { api } from '../services/api';
import axios from 'axios'

const steps = [
    { title: "Open a room", text: "We set up a fresh board for you to play on." },
    { title: "Share the link", text: "Send your friend the room link to invite them." },
    { title: "Play", text: "Place your pieces, form lines, and outwit your opponent." },
]

// The three nested squares of the Shax board, joined at their midpoints.
const insets = [10, 55, 100]
const boardPoints = insets.flatMap((s) => {
    const far = 300 - s
    return [[s, s], [150, s], [far, s], [far, 150], [far, far], [150, far], [s, far], [s, 150]]
})

// A few decorative pieces mid-game, keyed by point index.
const pieces: Record<number, string> = { 0: "#9E3A14", 9: "#9E3A14", 10: "#9E3A14", 4: "#1C1917", 13: "#1C1917", 22: "#1C1917" }

const ShaxBoard: React.FC = () => (
    <svg viewBox="0 0 300 300" className="w-full h-full" aria-hidden="true">
        <g fill="none" stroke="#1C1917" strokeWidth="2" strokeLinecap="round">
            {insets.map((s) => (
                <rect key={s} x={s} y={s} width={300 - 2 * s} height={300 - 2 * s} />
            ))}
            <line x1="150" y1="10" x2="150" y2="100" />
            <line x1="150" y1="200" x2="150" y2="290" />
            <line x1="10" y1="150" x2="100" y2="150" />
            <line x1="200" y1="150" x2="290" y2="150" />
        </g>
        {boardPoints.map(([x, y], i) => (
            <circle
                key={i}
                cx={x}
                cy={y}
                r={pieces[i] ? 10 : 4}
                fill={pieces[i] ?? "#FBF9F5"}
                stroke={pieces[i] ? "none" : "#1C1917"}
                strokeWidth="2"
            />
        ))}
    </svg>
)

export const PlayGame: React.FC = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

     async function handleCreateGame(){

        // create game on backend
        // save playerId
        // go to game page which will join the websocket and retrieve the game state

        setLoading(true)
        setError(null)

        try{
            const res = await api.post("/api/v1/games")
            const data = res.data;

            const roomId = data.roomId;
            const playerId = data.playerId;

            localStorage.setItem("roomId", roomId);
            localStorage.setItem("playerId", playerId)
            localStorage.setItem("playerName", "P1")

           navigate(`/room/${localStorage.getItem("roomId")}`)

        } catch(err){
            if (axios.isAxiosError(err)){
                console.log(err.response?.status, err.response?.data);
            } else {
                console.log("something went wrong when trying to create a game")
            }
            setError("We couldn't open a room right now. Please try again.")
            setLoading(false)
        }

    }

    return (
        <section id="play-game" className="scroll-mt-20 py-16 lg:py-24 border-b border-[#EAE5DC]">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left: Invitation */}
              <div className="lg:col-span-7 max-w-2xl">
                <span className="block text-[11px] font-mono tracking-widest uppercase text-[#9E3A14]">
                  Take a Seat Under the Tree
                </span>

                <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-[#1C1917] tracking-tight leading-[1.1] text-balance">
                  Play a Game of Shax
                </h2>

                <p className="mt-6 text-lg lg:text-xl font-serif text-[#57534E] leading-relaxed">
                  Shax has always been played between two people, with friends gathered round to watch. Open a board and invite someone to sit across from you.
                </p>

                <ol className="mt-10 border-t border-[#EAE5DC]">
                  {steps.map((step, i) => (
                    <li key={step.title} className="flex gap-6 py-5 border-b border-[#EAE5DC]">
                      <span className="pt-1 text-[11px] font-mono tracking-widest text-[#9E3A14]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="text-base lg:text-lg font-serif font-semibold text-[#1C1917]">
                          {step.title}
                        </h3>
                        <p className="mt-1 text-sm lg:text-base font-serif text-[#57534E] leading-relaxed">
                          {step.text}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
                  <button
                    type="button"
                    onClick={handleCreateGame}
                    disabled={loading}
                    className="group inline-flex items-center justify-center gap-3 px-7 py-4 bg-[#1C1917] text-[#FBF9F5] text-xs font-sans font-medium uppercase tracking-widest rounded-sm shadow-xs hover:bg-[#9E3A14] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9E3A14] disabled:opacity-70 disabled:cursor-wait transition-colors"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Opening a room…
                      </>
                    ) : (
                      <>
                        Invite your friend to a game
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                  <span className="text-xs font-serif italic text-[#78716C]">
                    No account needed. Just share the link.
                  </span>
                </div>

                {error && (
                  <p role="alert" className="mt-4 text-sm font-serif text-[#9E3A14]">
                    {error}
                  </p>
                )}
              </div>

              {/* Right: The board */}
              <figure className="lg:col-span-5 w-full max-w-md mx-auto lg:max-w-none border border-[#EAE5DC] bg-white p-4 rounded-sm shadow-xs">
                <div className="relative bg-[#EFEAE1] aspect-square p-10 sm:p-12">
                  <ShaxBoard />
                  <span className="absolute top-3 left-3 px-2 py-0.5 bg-[#1C1917]/80 text-[#FBF9F5] text-[10px] font-mono tracking-widest uppercase rounded-xs">
                    Plate III · Fig. 03
                  </span>
                </div>

                <figcaption className="pt-4 px-1">
                  <span className="block text-[11px] font-mono tracking-widest uppercase text-[#78716C]">
                    The Board
                  </span>
                  <h3 className="mt-1.5 text-sm font-serif font-semibold text-[#1C1917]">
                    Three Squares, Twenty-Four Points
                  </h3>
                  <p className="mt-1 text-xs text-[#57534E] font-serif italic leading-relaxed">
                    Traditionally scratched into the sand and played with stones or sticks, each player placing twelve pieces in turn.
                  </p>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>
    );

}
