import { defineStore } from "pinia";
import { getDatabase, ref, onValue } from "firebase/database";
import { reactive } from "vue";

export const useBlogStore = defineStore("blogStore", () => {
  const state =  reactive({data:{}});
    const db = getDatabase();
    const starCountRef = ref(db, `blogs`);

    onValue(starCountRef, (snapshot) => {
        state.data =  snapshot.val();
    });
  return { state, }
})
