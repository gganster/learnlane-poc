import {doc, getDoc, addDoc, collection, onSnapshot, query, where, setDoc, deleteDoc} from "./firebase";

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

export const getRoomsBatch = async (roomsArray) => {
  const rooms = await Promise.all(roomsArray.map((id) => getRoomById(id)));
  return rooms;
}

export const getRoomById = async (id) => {
  const roomDoc = await getDoc(doc("rooms", id));
  if (!roomDoc.exists()) return null;
  return {id: roomDoc.id, ...roomDoc.data()};
}

export const getRoomByIdRealTime = (id, callback) => {
  return onSnapshot(doc("rooms", id), (doc) => {
    if (!doc.exists()) return null;
    callback({id: doc.id, ...doc.data()});
  })
}

export const updateRoom = async ({id, data}) => {
  await setDoc(doc("rooms", id), {
    ...data,
    updatedAt: new Date(),
  });
}

export const deleteRoom = async (id) => {
  await deleteDoc(doc("rooms", id));
}
