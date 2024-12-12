import { doc, getDoc, addDoc, collection, onSnapshot, query, setDoc, deleteDoc, orderBy } from "./firebase";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "@/firebase";

export const createTask = async ({title, description, roomId, attachments}) => {
  await addDoc(collection("rooms", roomId, "tasks"), {
    title,
    description,
    participants: [],
    attachments: attachments,
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

export const updateTask = async ({roomId, id, data}) => {
  await setDoc(doc("rooms", roomId, "tasks", id), {
    ...data,
    updatedAt: new Date(),
  }, { merge: true });
}

export const deleteTask = async (roomId, id) => {
  const taskRef = doc("rooms", roomId, "tasks", id);

  try {
    const taskSnapshot = await getDoc(taskRef);

    if (taskSnapshot.exists()) {
      const taskData = taskSnapshot.data();

      if (taskData.attachments && Array.isArray(taskData.attachments)) {
        for (const url of taskData.attachments) {
          try {
            const path = url.replaceAll("%2F", "/").split("tasks/")[1].split("?")[0];
            const storageRef = ref(storage, `tasks/${path}`);
            await deleteObject(storageRef);
          } catch (error) {
            console.error(`Failed to delete attachment ${url}:`, error);
          }
        }
      }
    }

    await deleteDoc(taskRef);
  } catch (error) {
    console.error(`Failed to delete task with ID ${id}:`, error);
  }
};