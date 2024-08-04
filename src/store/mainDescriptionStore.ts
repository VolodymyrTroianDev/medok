import { defineStore } from "pinia";
import { reactive } from "vue";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/main";


export const useMainDescriptionStore = defineStore("MainDescription", () => {
  const state = reactive({ mainDescriptions: {} });

  const getDescriptions = async (locale: string) => {
    try {
      const docRef = doc(db, "main_descriptions", locale);
      const querySnapshot = await getDoc(docRef);
      state.mainDescriptions = querySnapshot.data();
      console.log(locale)
      console.log(state)
    } catch (e) {

    }
  }

  const setDescriptions = async () => {
    try {
      const docRef = doc(db, "main_descriptions", "en");
      const querySnapshot = await getDoc(docRef);
      console.log(querySnapshot.data())
    } catch (e) {

    }
  }

  const updateDescriptions = async (key: string, value: string) => {
    try {
      const docRef = doc(db, "main_descriptions", "en");
      console.log({
        [key]: value,
      })
      await updateDoc(docRef, {
        [key]: value,
      });

    } catch (e) {

    }
  }
  return {
    state,
    getDescriptions,
    setDescriptions,
    updateDescriptions
  }
})
