import {doc, getDoc, addDoc, collection, onSnapshot, query, where} from "./firebase";

export const createRoom = async ({title, description, locked = false, userId}) => {
  await addDoc(collection("rooms"), {
    title,
    description,
    userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}

export const getRoomsByUserIdRealtime = (userId, callback) => {
  return onSnapshot(query(collection("rooms"), where("userId", "==", userId)), (snapshot) => {
    const rooms = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
    callback(rooms);
  })
}


export const getRoomById = async (id) => {
  const roomDoc = await getDoc(doc("rooms", id));
  if (!roomDoc.exists()) return null;
  return {id: roomDoc.id, ...roomDoc.data()};
}

export const updateRoom = async ({id, title}) => {
  await doc("rooms", id).update({
    title,
    updatedAt: new Date(),
  });
}

export const deleteRoom = async (id) => {
  await doc("rooms", id).delete();
}
