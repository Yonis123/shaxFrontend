import {useNavigate} from 'react-router'
import {useState} from 'react'


export default function Home(){

    const navigate = useNavigate();
    const [joinLinkId, setJoinLinkId] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    
    const handleCreateGame = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/createGame`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                
            })
            if (!res.ok){
                throw new Error(`${res.status}`)
            }


            const {roomId, playerId} = await res.json();
            localStorage.setItem("roomId", roomId);
            localStorage.setItem("playerId", playerId);

            //open up my game page
            navigate(`/rooms/${localStorage.getItem("roomId")}`);


        } catch (err) {
            console.log(`we got an error when trying to create game, error: ${err}` );
        }

    }

    const handleJoinGame = async () => {
        try{
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/${joinLinkId}/joinGame`, {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
            }
            );
            
            if(!res.ok){
                throw new Error("invalid join link");
            }

            const {playerId, roomId} = await res.json();

            localStorage.setItem("playerId", playerId);
            localStorage.setItem("roomId", roomId);

            navigate(`/rooms/${localStorage.getItem("roomId")}`);


        } catch(err){
            if(err instanceof Error){
                setErrorMsg(err.message);
            } else {
                console.log(err);
            }
        }
    }

 

    return (
        <>  
            <div>
                 <button style={{padding:"10px", margin:"15px"}} onClick={handleCreateGame}>Create new game</button>
            </div>
           
            <div style={{height: "30px"}}></div>
            <div>
                    <input onChange={(e) => setJoinLinkId(e.target.value)} placeholder="Enter Join Game Link" style={{width:"40%", margin:"20px"}}></input>
                    <button onClick={handleJoinGame}>Join new game</button>
            </div>
            <div>
                
            </div>
           
        </>
    );
}