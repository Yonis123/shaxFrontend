import "./Board.css"

type SpotProps = {
  player: string | null;  
  onClick: () => void
  selected: boolean | null;
};

export default function Spot({selected, player, onClick}: SpotProps){


    let colorStyle = "spot";

    if (player === "P1") {
        colorStyle += " p1";
    } else if (player === "P2") {
        colorStyle += " p2";
    } 

    if (selected){
        colorStyle += " selected"
    }


    return (
        <button className= {colorStyle}  onClick={onClick}>{player}
        </button>
    );
}