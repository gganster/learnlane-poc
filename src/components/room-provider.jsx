import { createContext, useContext, useEffect, useState } from "react";
import { getRoomByIdRealTime } from "@/services/room";

const initialState = {
  loading: true,
  room: null,
  participants: null,
  tasks: null,
};

const RoomProviderContext = createContext(initialState);

export const RoomProvider = ({ roomId, children }) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    let subscribers = [];

    subscribers.push(
      getRoomByIdRealTime(roomId, (room) => {
        setState((state) => ({ ...state, room, loading: false }));
      })
    );

    return () => {
      subscribers.forEach((unsubscribe) => unsubscribe());
    };
  }, []);

  return (
    <RoomProviderContext.Provider value={{ state, setState }}>
      {state.loading ?
        <div>Loading...</div>
      :
        children
      }
    </RoomProviderContext.Provider>
  );
};

export const useRoom = () => {
  const context = useContext(RoomProviderContext);

  if (context === undefined)
    throw new Error("useRoom must be used within a RoomProvider");

  return context;
};