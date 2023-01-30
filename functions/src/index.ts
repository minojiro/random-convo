import * as functions from "firebase-functions";
import { getFirestore } from "firebase-admin/firestore";
import { initializeApp } from "firebase-admin/app";
import { WaitingUserData } from "../../types";

const POOL_COUNT = 2;

const app = initializeApp();

export const waitingUserUpdated = functions.firestore
  .document("waitlist/{userId}")
  .onWrite(async () => {
    console.log("new waiting user");
    const db = getFirestore(app);
    const ss = await db.collection("waitlist").where("roomId", "==", "").get();
    console.log(`${ss.size} of users are waiting.`);
    if (ss.size >= POOL_COUNT) {
      const waitingUsers = ss.docs
        .sort(() => Math.random() - 0.5)
        .slice(0, 2)
        .map((user) => user.data() as WaitingUserData);
      console.log(`users: ${waitingUsers.map((u) => u.userId)}`);
      const roomRef = await db.collection("rooms").add({
        users: {
          [waitingUsers[0].userId]: {},
          [waitingUsers[1].userId]: {},
        },
      });
      console.log(`room: ${roomRef.id}`);
      waitingUsers.forEach(async (waitingUser) => {
        await db
          .doc(`waitlist/${waitingUser.userId}`)
          .set({ roomId: roomRef.id }, { merge: true });
      });
      console.log(`done`);
    }
  });
