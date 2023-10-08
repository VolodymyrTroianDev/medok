import { defineStore } from "pinia";
import { reactive } from "vue";
import { getDatabase, ref, set, onValue, push, update,child,get  } from "firebase/database";
import { useAuthenticationStore } from "@/store/authStore";
import { useGeneralStore } from "@/store/generalStore";
import { v4 as uuidv4 } from 'uuid';

export const useDatabaseStore = defineStore("databaseStore", () => {
  const auth = useAuthenticationStore();
  const general = useGeneralStore();
  const state = reactive({data:{}});
  const db = getDatabase();
  const starCountRef = ref(db, `users`);
  onValue(starCountRef, (snapshot) => {
    general.statusLoader = true;
    if (auth.state.uid) state.data = snapshot.val()[auth.state.uid];
    general.statusLoader = false;
  });
  const updateDatabase = async () => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${auth.state.uid}`)).then((snapshot) => {
      if (snapshot.exists()) {
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }
  const updateProfile = async (data) => {
    try {
      if (Object.keys(state.data).length > 0){
        return update(ref(db, `users/${auth.state.uid}/reloadUserInfo`), {
          displayName: data.name,
          email: data.email
        });
      } else await set(ref(db, `users/${auth.state.uid}`),  {
        metadata: {},
        providerData: {},
        reloadUserInfo: {},
        userStatus: 2
      } );
    } catch (e) {
      console.error(e);
    }
  }
  const updateReloadUserInfo = async (uid, photoUrl) => {
    await update(ref(db, `users/${uid}/reloadUserInfo`), { photoUrl:photoUrl });
  }
  const createUserInfo = async (data) => {
    await set(ref(db, `users/` + data.uid),
      {
        metadata: data.metadata,
        providerData: data.providerData,
        reloadUserInfo: data.reloadUserInfo,
        auth: true,
        userStatus: 2
      });
  }
 const createBlogArticle = async (data) => {
   const uid = uuidv4();
   await set(ref(db, `blogs/${uid}`),
     {
       ...data,
       timeCreate: Date.now(),
       timeEdit: ""
     });
 }
  return {
    state,
    updateProfile,
    createUserInfo,
    updateReloadUserInfo,
    updateDatabase,
    createBlogArticle
  }
})
