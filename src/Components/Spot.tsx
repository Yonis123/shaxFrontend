import "./Board.css"
import { pebbleStyle } from "./pebble"

type SpotProps = {
  player: string | null;
  onClick: () => void
  selected: boolean | null;
  disabled?: boolean;
  label: string;
  seed: number;
};

export default function Spot({selected, player, onClick, disabled, label, seed}: SpotProps){

    let colorStyle = "spot";

    if (player === "P1") {
        colorStyle += " pebble p1";
    } else if (player === "P2") {
        colorStyle += " pebble p2";
    } else {
        colorStyle += " empty";
    }

    if (selected){
        colorStyle += " selected"
    }

    return (
        <button
            type="button"
            className={colorStyle}
            style={player ? pebbleStyle(seed) : undefined}
            onClick={onClick}
            disabled={disabled}
            aria-label={label}
            aria-pressed={selected ?? false}
        />
    );
}
