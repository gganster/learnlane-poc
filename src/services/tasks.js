import {doc, getDoc, addDoc, collection, onSnapshot, query, where, setDoc, deleteDoc, orderBy} from "./firebase";

export const createTask = async ({title, description, roomId}) => {
  await addDoc(collection("rooms", roomId, "tasks"), {
    title,
    description,
    participants: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}

export const getTasksByRoomIdRealtime = (roomId, callback) => {
  return onSnapshot(query(collection("rooms", roomId, "tasks"), orderBy("createdAt", "asc")), (snapshot) => {
    const tasks = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
    callback(tasks);
  })
}

export const updateTask = async ({id, data}) => {
  await setDoc(doc("rooms", id), {
    ...data,
    updatedAt: new Date(),
  });
}

export const deleteTask = async (roomId, id) => {
  await deleteDoc(doc("rooms", roomId, "tasks", id));
}
