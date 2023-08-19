import { defineStore } from "pinia";
import { reactive } from "vue";
import { getDatabase, ref, set, onValue, push, update  } from "firebase/database";
import {useAuthenticationStore} from "@/store/authStore";

export const useDatabaseStore = defineStore("databaseStore", () => {
  const state = reactive({data:{}});
  const db = getDatabase();
  const auth = useAuthenticationStore();
  const starCountRef = ref(db, `users/${auth.state.uid}`);
  onValue(starCountRef, (snapshot) => {
    state.data = snapshot.val();
    auth.state.email = state.data.userInfo.email;
    auth.state.name = state.data.userInfo.name;
  });
  const updateProfile = async (data) => {
    try {
      if (Object.keys(state.data).length > 0){
        return update(starCountRef, { userInfo: data });
      } else  await set(ref(db, `users/${auth.state.uid}`),  { userInfo: data } );

    } catch (e) {

    }
  }
  return {
    state,
    updateProfile
  }
})
