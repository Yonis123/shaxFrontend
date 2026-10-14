import {useNavigate} from 'react-router'
// 2. Use it anywhere in your app like this
import { api } from '../services/api';
import axios from 'axios'




export default function HomePage(){

    const navigate = useNavigate();

    async function handleCreateGame(){

        // create game on backend
        // save playerId
        // go to game page which will join the websocket and retrieve the game state 

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
          
            
        }

        


    }

    return <>
        <div>
            <h1>Hello my friend please create or join a game</h1>
            <button onClick={handleCreateGame}>create game</button>
            <span></span>
            <p>new and improved UI coming soon</p>
               
        </div>
    </>
}
