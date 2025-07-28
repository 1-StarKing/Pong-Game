import React, { ReactElement, createContext, useState } from "react";

interface App {
  children: ReactElement;
}

export interface Player {
  message: string;
  roomName: string;
  type: string;
  playerName: string;
  playerID: string;
  positionY: number;
  positionX: number;
  color: string;
  direction: string;
}

interface Context {
  players: Array<Player>;
  setPlayers: (arg: Array<Player>) => void;
  playerConnected: boolean;
  setPlayerConnected: (arg: boolean) => void;
}

// Create a context - https://react.dev/reference/react/createContext
export const MyContext = createContext({} as Context);

const ContextProvider = ({ children }: App) => {
  const [playerConnected, setPlayerConnected] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  return (
    <MyContext.Provider
      value={{ players, setPlayers, playerConnected, setPlayerConnected }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default ContextProvider;
