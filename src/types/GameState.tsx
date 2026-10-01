export type GameState = {
    board: Record<string, string | null>;
    currentTurn: string;
    phase: string;
    winner: string;
};