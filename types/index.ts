import type { Dayjs } from "dayjs";
import type { FieldValue } from "firebase/firestore";

export type Message = {
  text: string;
  userId: string;
  createdAt: Dayjs;
};

export type MessageData = {
  text: string;
  userId: string;
  createdAt: FieldValue;
};

export type WaitingUser = {
  userId: string;
  roomId: string;
};

export type WaitingUserData = {
  userId: string;
  roomId: string;
  createdAt: FieldValue;
};
