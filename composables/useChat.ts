import type { ComputedRef } from "vue";
import type { Message, MessageData } from "../types";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import dayjs from "dayjs";

export const useChat = (roomId: string, userId: ComputedRef<string>) => {
  const db = getFirestore();
  const isSubmitting = ref(false);
  const messages = ref<Message[]>([]);
  const messageCollectionPath = `rooms/${roomId}/messages`;

  const sendMessage = async (text: string) => {
    if (!userId.value) throw new Error("ユーザー名がありません");
    isSubmitting.value = true;
    try {
      const messageData: MessageData = {
        text,
        userId: userId.value,
        createdAt: serverTimestamp(),
      };
      await addDoc(collection(db, messageCollectionPath), messageData);
    } finally {
      isSubmitting.value = false;
    }
  };

  onSnapshot(
    query(collection(db, messageCollectionPath), orderBy("createdAt", "desc")),
    (querySnapshot) => {
      messages.value = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as MessageData;
        const createdAt = data.createdAt as any;
        if (!createdAt) return;
        messages.value.push({
          text: data.text,
          userId: data.userId,
          createdAt: dayjs(createdAt.toDate()),
        });
      });
    }
  );

  return {
    sendMessage,
    messages,
    isSubmitting,
  };
};
