import { collection, addDoc, getDocs, doc, setDoc, query, orderBy, onSnapshot } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase";

export const sendMessage = async (roomId, message) => {
  await addDoc(collection("rooms", roomId, "messages"), message);
};

export const getMessages = async (roomId) => {
  const q = query(collection("rooms", roomId, "messages"), orderBy("timestamp", "asc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getMessagesRealTime = (roomId, callback) => {
  const q = query(collection("rooms", roomId, "messages"), orderBy("timestamp", "asc"));
  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(messages);
  });
};

export const uploadAttachment = async (file, roomId, userId) => {
  const fileRef = ref(storage, `rooms/${roomId}/${userId}/${file.name}`);
  const snapshot = await uploadBytes(fileRef, file);
  return await getDownloadURL(snapshot.ref);
};