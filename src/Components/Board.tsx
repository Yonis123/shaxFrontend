import type {GameState} from '../types/GameState'
import Spot from '../Components/Spot'
import "./Board.css"
import type {MoveRequest} from "../types/MoveRequest"
import {useState} from 'react'
import {useNavigate} from 'react-router'



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

export default function Board({player, gameState, sendMove }: BoardProps) {

    const [from, setFrom] = useState<string | null>(null)
    const navigate = useNavigate();


if(gameState.phase == "ENDED"){
    
    const winnerMessage = `${gameState.winner} has won the game`;
    
    return (
    <div className="board-wrapper">
      <div className="board">
        <svg className="board-lines" viewBox="0 0 6 6">
          <rect x="0" y="0" width="6" height="6" />
          <rect x="1" y="1" width="4" height="4" />
          <rect x="2" y="2" width="2" height="2" />
          <line x1="3" y1="0" x2="3" y2="2" />
          <line x1="3" y1="4" x2="3" y2="6" />
          <line x1="0" y1="3" x2="2" y2="3" />
          <line x1="4" y1="3" x2="6" y2="3" />
        </svg>

        {Object.entries(gameState.board).map(([index, player]) => {
          const [x, y] = COORDS[Number(index)];
          return (
         

                <div
                key={index}
                className="spot-position"
                style={{ left: `${(x / 6) * 100}%`, top: `${(y / 6) * 100}%` }}
                >
                    <Spot player={player} selected={false} onClick={() => 
                    {
                    alert("game has ended")
                    }

                    }>
            
                </Spot>

                </div>

            


          );
        })}
      </div>

                <h2 className="endHeader">{winnerMessage}</h2>
                <button onClick={() => {
                    navigate("/")
                }}>Press me to go back to home page</button>

    </div>
     );

}else if(gameState.currentTurn != player){
   
     return (
    <div className="board-wrapper">
      <div className="board">
        <svg className="board-lines" viewBox="0 0 6 6">
          <rect x="0" y="0" width="6" height="6" />
          <rect x="1" y="1" width="4" height="4" />
          <rect x="2" y="2" width="2" height="2" />
          <line x1="3" y1="0" x2="3" y2="2" />
          <line x1="3" y1="4" x2="3" y2="6" />
          <line x1="0" y1="3" x2="2" y2="3" />
          <line x1="4" y1="3" x2="6" y2="3" />
        </svg>

        {Object.entries(gameState.board).map(([index, player]) => {
          const [x, y] = COORDS[Number(index)];
          return (
            <div
              key={index}
              className="spot-position"
              style={{ left: `${(x / 6) * 100}%`, top: `${(y / 6) * 100}%` }}
            >
              <Spot player={player} selected={false} onClick={() => 
              {
              console.log(player, gameState.currentTurn)
              alert("Not your turn")
              }

              }  >
        
              </Spot>
              
              
             </div>
          );
        })}
      </div>
    </div>
     );

} else if (gameState.phase == "PLACING"){

  return (
    <div className="board-wrapper">
      <div className="board">
        <svg className="board-lines" viewBox="0 0 6 6">
          <rect x="0" y="0" width="6" height="6" />
          <rect x="1" y="1" width="4" height="4" />
          <rect x="2" y="2" width="2" height="2" />
          <line x1="3" y1="0" x2="3" y2="2" />
          <line x1="3" y1="4" x2="3" y2="6" />
          <line x1="0" y1="3" x2="2" y2="3" />
          <line x1="4" y1="3" x2="6" y2="3" />
        </svg>

        {Object.entries(gameState.board).map(([index, player]) => {
          const [x, y] = COORDS[Number(index)];
          return (
            <div
              key={index}
              className="spot-position"
              style={{ left: `${(x / 6) * 100}%`, top: `${(y / 6) * 100}%` }}
            >
              <Spot player={player} selected={false} onClick={() => sendMove({type: "PLACE", from:null, to: index})}  >
        
              </Spot>
              
              
             </div>
          );
        })}
      </div>
    </div>
     );

    } else if (gameState.phase == "REMOVING"){
        return (
            <div className="board-wrapper">
      <div className="board">
        <svg className="board-lines" viewBox="0 0 6 6">
          <rect x="0" y="0" width="6" height="6" />
          <rect x="1" y="1" width="4" height="4" />
          <rect x="2" y="2" width="2" height="2" />
          <line x1="3" y1="0" x2="3" y2="2" />
          <line x1="3" y1="4" x2="3" y2="6" />
          <line x1="0" y1="3" x2="2" y2="3" />
          <line x1="4" y1="3" x2="6" y2="3" />
        </svg>

        {Object.entries(gameState.board).map(([index, player]) => {
          const [x, y] = COORDS[Number(index)];
          return (
            <div
              key={index}
              className="spot-position"
              style={{ left: `${(x / 6) * 100}%`, top: `${(y / 6) * 100}%` }}
            >

              <Spot player={player} selected={false} onClick={() => sendMove({type: "REMOVE", from:null, to: index})}  >
        
              </Spot>
            
            </div>
          );
        })}
      </div>
    </div>
        );

    }  else if (gameState.phase == "MOVING"){


        return (
        <div className="board-wrapper">
      
        <div className="board">
        <svg className="board-lines" viewBox="0 0 6 6">
          <rect x="0" y="0" width="6" height="6" />
          <rect x="1" y="1" width="4" height="4" />
          <rect x="2" y="2" width="2" height="2" />
          <line x1="3" y1="0" x2="3" y2="2" />
          <line x1="3" y1="4" x2="3" y2="6" />
          <line x1="0" y1="3" x2="2" y2="3" />
          <line x1="4" y1="3" x2="6" y2="3" />
        </svg>

        {Object.entries(gameState.board).map(([index, player]) => {
          const [x, y] = COORDS[Number(index)];
          return (
            <div
              key={index}
              className="spot-position"
              style={{ left: `${(x / 6) * 100}%`, top: `${(y / 6) * 100}%` }}
            >

              <Spot player={player} selected={from == index} onClick={() => {
                     
                    if (from == null){
                        setFrom(index)
                    } else if (from == index){
                        setFrom(null)
                    } else {
                        sendMove({type: "MOVE", from:from, to: index})
                        setFrom(null)
                        }
                    }

             }
                  
              ></Spot>
            
            </div>
          );
        })}
      </div>
    </div>
        );
    
    }



}