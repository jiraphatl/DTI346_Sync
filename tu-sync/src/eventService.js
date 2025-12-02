import { db } from "./firebase";
import { collection, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

// ฟังก์ชันสร้าง reference ตาม user ID
const getEventsRef = (uid) => collection(db, "users", uid, "events");

// -------------------------------
// CREATE Event
// -------------------------------
export const addEvent = async (uid, eventData) => {
  const eventsRef = getEventsRef(uid);
  const docRef = await addDoc(eventsRef, eventData);
  return { ...eventData, event_id: docRef.id };
};

// -------------------------------
// UPDATE Event
// -------------------------------
export const updateEvent = async (uid, event_id, updatedData) => {
  const docRef = doc(db, "users", uid, "events", event_id);
  await updateDoc(docRef, updatedData);
};

// -------------------------------
// DELETE Event
// -------------------------------
export const deleteEvent = async (uid, event_id) => {
  const docRef = doc(db, "users", uid, "events", event_id);
  await deleteDoc(docRef);
};