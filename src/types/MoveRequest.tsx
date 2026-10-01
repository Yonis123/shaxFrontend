
export type MoveType = "PLACE" | "MOVE" | "REMOVE" | "HELP";



export type MoveRequest = {
  type: MoveType;
  from: string | null;
  to: string | null;
};