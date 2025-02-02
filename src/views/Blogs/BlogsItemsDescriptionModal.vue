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
        <img
            :src="props.data.imgUrl"
            class="object-cover mx-auto w-[300px]"
            alt=""
        />
        <div class="flex flex-col w-full h-full gap-2">
            <div class="py-3 flex flex-col gap-6 text-custom-gray text-sm">
                <div class="flex gap-2">
                    <img src="../../assets/images/svg/calendar.svg" alt="" />
                    <span>{{
                        moment(props.data.timeCreated).format("LLLL")
                    }}</span>
                </div>
                <span class="font-bold"> {{ props.data.description }} </span>
                <div class="flex gap-2">
                    <button class="relative w-[30px]">
                        <img
                            src="../../assets/images/svg/comment.svg"
                            alt="comment"
                        />
                        <span
                            v-if="props.data?.comment"
                            class="w-[13px] h-[13px] absolute right-0 bg-counter text-white flex items-center justify-center rounded-full bottom-[-5px] text-[10px]"
                        >
                            {{ Object.keys(props.data?.comment).length || 0 }}
                        </span>
                    </button>
                    <div class="text-a">{{ $t("blog.comments") }}</div>
                </div>
                <div class="max-h-[300px] overflow-y-auto mini-scrollbar">
                    <div class="flex justify-between gap-3 pe-3">
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
                                    onSaveComment(textComment, props.data?.id);
                                }
                            "
                            @cancel-action="onCancelAction"
                            :placeholder="$t('blog.addComment')"
                        >
                            <template v-slot:cancel-btn>{{
                                $t("reused.cancel")
                            }}</template>
                            <template v-slot:save-btn>{{
                                $t("blog.reply")
                            }}</template>
                        </CommentBtnGroup>
                    </div>
                    <CommentItem
                        :comments="props.data.comment"
                        :comment-id="props.data.id"
                    />
                </div>
            </div>
        </div>
    </MyModal>
</template>

<script lang="ts" setup>
import moment from "moment/moment";

const general = useGeneralStore(),
    database = useDatabaseStore(),
    blog = useBlogStore(),
    emit = defineEmits(["closeModal"]),
    { openBlogDescription } = toRefs(useGeneralStore()),
    text = ref<string>("");

const props = defineProps<{
    data: {};
    openModal: boolean;
}>();

const onSaveComment = async (textComment, idx) => {
    try {
        await blog.addedComment(idx, textComment);
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
