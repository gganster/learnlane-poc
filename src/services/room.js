import {doc, getDoc, getDocs, addDoc, collection, onSnapshot, query, where, setDoc, deleteDoc} from "./firebase";

export const createRoom = async ({title, description, userId=null, locked=false, stepbystep=false}) => {
  const q = query(collection("rooms"), where("title", "==", title), where("userId", "==", userId));
  const existingRooms = await getDocs(q);

  if (!existingRooms.empty) {
    return null;
  }

  return await addDoc(collection("rooms"), {
    title,
    description,
    userId,
    createdAt: new Date(),
    updatedAt: new Date(),
    locked: locked,
    stepbystep: stepbystep,
  });
}

export const getRoomsByUserIdRealtime = (userId, callback) => {
  return onSnapshot(query(collection("rooms"), where("userId", "==", userId)), (snapshot) => {
    const rooms = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
    callback(rooms);
  })
}

export const getRoomsBatch = async (roomsArray) => {
  const rooms = await Promise.all(
    roomsArray.map(async (id) => {
      const room = await getRoomById(id);
      return room ? room : null;
    })
  );

  return rooms.filter((room) => room !== null);
};

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

export const cloneRoom = async (id, newtitle, cloneParticipants = false, cloneTasks = false) => {
  const room = await getRoomById(id);
  const { id: oldId, createdAt, updatedAt, ...roomData } = room;

  const newroom = await createRoom({
    title: newtitle,
    description: room.description,
    locked: room.locked,
    stepbystep: room.stepbystep,
    userId: room.userId,
  });

  if(cloneParticipants) {
    const usersSnapshot = await getDocs(query(collection('users'), where('rooms', 'array-contains', room.id)));
      
    usersSnapshot.docs.forEach((user) => {
      const userData = user.data();
      const rooms = userData.rooms
      rooms.push(newroom.id);
      setDoc(doc('users', user.id), {
        ...userData,
        rooms,
      });
    });
  }

  if (cloneTasks) {
    const tasksSnapshot = await getDocs(collection('rooms', room.id, 'tasks'));
    tasksSnapshot.docs.forEach(async (taskDoc) => {
      const taskData = taskDoc.data();
      await addDoc(collection('rooms', newroom.id, 'tasks'), {
        ...taskData,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
  }

  return newroom.id;
}