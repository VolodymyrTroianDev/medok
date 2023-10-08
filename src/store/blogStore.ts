import { defineStore } from "pinia";
import { getDatabase, ref, onValue } from "firebase/database";
import { reactive } from "vue";
import {useGeneralStore} from "@/store/generalStore";

export const useBlogStore = defineStore("blogStore", () => {
  const state =  reactive({data:{}});
    const db = getDatabase();
    const starCountRef = ref(db, `blogs`);
    const general = useGeneralStore();

    onValue(starCountRef, (snapshot) => {
        general.statusLoader = true;
        state.data =  snapshot.val();
        general.statusLoader = false;
    });
  return { state, }
})
