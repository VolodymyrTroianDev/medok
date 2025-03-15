<template>
  <MyModal
    :show="openBlogDescription"
    styles="pt-[20px] px-5 md:min-w-[710px] h-fit"
    @close-modal="closeModal"
  >
    <div class="description-title text-center font-bold text-[19px]">
      {{ props.data.title }}
    </div>
    <img
      src="../../assets/images/svg/basket/basket-close-btn.svg"
      alt=""
      class="cursor-pointer active:scale-75 transition-transform duration-150 ease-in-out absolute top-5 right-5 bg-no-repeat bg-center bg-cover"
      @click="closeModal"
    />

    <div
        class="flex justify-center items-center w-full min-h-[250px] rounded"
      :class="{ 'bg-gray-100': !props.data.imgUrl.length }"
    >
      <img
          v-if="props.data.imgUrl.length > 0"
          :src="props.data.imgUrl"
          class="object-cover mx-auto rounded"
          alt=""
      />
      <inline-svg
          v-else
          src="/src/assets/images/svg/no-image.svg"
          class="text-main-color mx-auto"
      />
    </div>
    <div class="flex flex-col w-full h-full gap-2">
      <div class="py-3 flex flex-col gap-6 text-custom-gray text-sm">
        <div class="flex gap-2">
          <img src="../../assets/images/svg/calendar.svg" alt="" />
          <span>{{ formatTime(props.data.timeCreated) }}</span>
        </div>
        <span class="font-bold"> {{ props.data.description }} </span>
        <div class="flex gap-2 justify-between">
          <div class="flex gap-2 items-center">
            <button class="relative w-[30px]">
              <img src="../../assets/images/svg/comment.svg" alt="comment" />
              <span
                  v-if="props.data?.comment"
                  class="w-[13px] h-[13px] absolute right-0 bg-counter text-white flex items-center justify-center rounded-full bottom-[-5px] text-[10px]"
              >
              {{ Object.keys(props.data?.comment).length || 0 }}
            </span>
            </button>
            <div class="text-a">{{ $t("blog.comments") }}</div>
          </div>
          <div class="flex gap-2 items-center" v-if="database.state?.data?.userStatus === 1">
            <inline-svg :src="'/src/assets/images/svg/edit-icon.svg'" alt="" class="w-[25px] h-[27px] cursor-pointer bg-no-repeat hover:scale-110 transition duration-300 ease-in-out"/>
            <inline-svg :src="'/src/assets/images/svg/delete-icon.svg'" alt="" class="w-[25px] h-[27px] cursor-pointer bg-no-repeat hover:scale-110 transition duration-300 ease-in-out"/>
          </div>
        </div>
        <div class="max-h-[300px] overflow-y-auto mini-scrollbar">
          <div
            class="flex justify-between gap-3 pe-3 px-2"
            v-if="auth.state.statusLogin"
          >
            <img
              :src="database.state.data.reloadUserInfo?.photoUrl"
              alt=""
              width="45"
              height="45"
              class="rounded-full bg-white h-[45px]"
            />
            <CommentBtnGroup
              @save-comment="
                (textComment) => {
                  onSaveComment(props.data?.id, textComment);
                }
              "
              @cancel-action="onCancelAction"
              :placeholder="$t('blog.addComment')"
            >
              <template v-slot:cancel-btn>{{ $t("reused.cancel") }}</template>
              <template v-slot:save-btn>{{ $t("blog.reply") }}</template>
            </CommentBtnGroup>
          </div>
          <div v-else class="w-full text-center p-3">
            <p class="flex gap-1 justify-center">
              {{ $t("blog.logOrRegisterStart") }}
              <span
                class="text-custom-blue cursor-pointer"
                @click="openModal('login')"
                >{{ $t("header.login") }}</span
              >
              {{ $t("blog.or") }}
              <span
                class="text-custom-blue cursor-pointer"
                @click="openModal('register')"
                >{{ $t("header.register") }}</span
              >
              {{ $t("blog.logOrRegisterEnd") }}
            </p>
          </div>
          <CommentItem
            :comments="props.data.comment"
            :blog-id="props.data.id"
          />
        </div>
      </div>
    </div>
  </MyModal>
</template>

<script lang="ts" setup>
import moment from "moment/moment";
import { formatTime } from "@/services/TimeFormat";
import { useEmitter } from "@nguyenshort/vue3-mitt";

const database = useDatabaseStore(),
  blog = useBlogStore(),
  auth = useAuthenticationStore(),
  emit = defineEmits(["closeModal"]),
  emitter = useEmitter(),
  { openBlogDescription } = toRefs(useGeneralStore());

moment.locale("uk");

const openModal = (type) => {
  emitter.emit("openModal", type);
};
const props = defineProps<{
  data: {};
  openModal: boolean;
}>();

const onSaveComment = async (blogId: string, textComment: string) => {
  try {
    await blog.addedComment(blogId, textComment);
  } catch (e) {}
};

const onCancelAction = () => {};
const closeModal = () => {
  emit("closeModal");
};
</script>
<style scoped>
.search-city {
  all: unset;
  width: 100%;
  text-align: start;
  border-bottom: 1px solid #d46110;
}

.search-city:focus {
  --tw-ring-color: transparent;
}
</style>
