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
