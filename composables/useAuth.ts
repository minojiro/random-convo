import type { Auth, User } from "firebase/auth";
import { getAuth, signInAnonymously } from "firebase/auth";
import { computed, ref } from "vue";

export const useAuth = (auth: Auth = getAuth()) => {
  const user = ref<User | null>(auth.currentUser);
  const isAuthed = computed(() => !!user.value);

  auth.onIdTokenChanged((authUser) => (user.value = authUser));

  const login = () => {
    if (!isAuthed.value) {
      return signInAnonymously(auth);
    }
  };

  return {
    user,
    isAuthed,
    login,
  };
};
