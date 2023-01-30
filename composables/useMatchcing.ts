import type { ComputedRef } from "vue";
import type { WaitingUser, WaitingUserData } from "../types";
import dayjs from "dayjs";
import {
  getFirestore,
  onSnapshot,
  setDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

export const useMatching = (userId: ComputedRef<string>) => {
  const db = getFirestore();
  const waitingUser = ref<WaitingUser>({
    userId: userId.value,
    roomId: "",
  });

  const waitlistMe = async () => {
    if (!userId.value) return;
    const ref = doc(db, "waitlist", userId.value);
    const data: WaitingUserData = {
      userId: userId.value,
      roomId: "",
      createdAt: serverTimestamp(),
    };
    onSnapshot(ref, (doc) => {
      const { roomId, userId } = doc.data() as WaitingUserData;
      waitingUser.value = { userId, roomId };
    });
    setDoc(ref, data);
  };

  return {
    waitlistMe,
    waitingUser,
  };
};
