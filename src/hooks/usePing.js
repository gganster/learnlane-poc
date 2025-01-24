import { useEffect } from "react";
import { ref, set, remove } from "firebase/database";
import { realtimeDb } from "@/firebase";

const usePing = (userId) => {
    useEffect(() => {
      if (!userId) return;
  
      const sendPing = async () => {
        await set(ref(realtimeDb, `onlineUsers/${userId}`), { lastPing: Date.now() });
      };

      sendPing();
      
      const interval = setInterval(sendPing, 10000);
  
      return () => clearInterval(interval);
    }, [userId]);
  };
  
  export default usePing;