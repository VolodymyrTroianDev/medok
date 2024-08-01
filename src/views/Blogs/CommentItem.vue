<template>
    <div
        v-for="(comment, idx) in comments"
        :key="comment"
        class="flex flex-col gap-3"
    >
        <div class="flex gap-3">
            <img
                :src="comment.author?.photoUrl"
                alt=""
                width="45"
                height="45"
                class="rounded-full bg-white h-[45px]"
            />
            <div class="flex flex-col gap-2 w-full">
                <div class="flex flex-col">
                    <div class="flex gap-3">
                        <div class="font-bold">
                            {{ comment.author?.displayName }}
                        </div>
                        <div class="text-color-a">
                            <span v-if="comment?.edited">{{
                                $t("blog.edited")
                            }}</span>
                            {{ formatTime(comment?.timeCreated) }}
                        </div>
                    </div>
                    <div class="text-color-a">{{ comment.author?.email }}</div>
                </div>
                <div class="text-black" v-if="commentIdx !== idx">
                    {{ comment?.text }}
                </div>
                <Transition name="slide-fade">
                    <CommentBtnGroup
                        v-if="openEditComment && commentIdx === idx"
                        @save-comment="
                            (textComment) => {
                                onSaveComment(
                                    textComment,
                                    idx,
                                    props.commentId
                                );
                            }
                        "
                        @cancel-action="onCancelAction"
                        :model-value="comment.text"
                        :placeholder="$t('blog.addComment')"
                    >
                        <template v-slot:cancel-btn>{{
                            $t("reused.cancel")
                        }}</template>
                        <template v-slot:save-btn>{{
                            $t("reused.save")
                        }}</template>
                    </CommentBtnGroup>
                </Transition>
                <div class="flex gap-2 justify-between">
                    <div class="flex gap-2">
                        <img
                            src="../../assets/images/svg/like-icon.svg"
                            class="cursor-pointer hover:scale-110 transition duration-300 ease-in-out"
                            @click="updateLike(idx, props.commentId)"
                        />
                        <img
                            src="../../assets/images/svg/like-icon.svg"
                            class="rotate-180 cursor-pointer hover:scale-110 transition duration-300 ease-in-out"
                        />
                    </div>
                </div>
            </div>
            <div class="flex flex-col items-center justify-between gap-1">
                <div
                    class="flex max-h-[30px] max-w-[100px] items-center gap-1 justify-end w-full"
                    v-if="comment.id === auth.state.uid"
                >
                    <img
                        src="../../assets/images/svg/edit-icon.svg"
                        class="w-[20px] h-[20px] cursor-pointer bg-no-repeat bg-cover hover:scale-110 transition duration-300 ease-in-out"
                        :alt="$t('blog.editComment')"
                        :title="$t('blog.editComment')"
                        @click="editComment(idx)"
                    />
                    <img
                        src="../../assets/images/svg/delete-icon.svg"
                        :alt="$t('blog.deleteComment')"
                        :title="$t('blog.deleteComment')"
                        @click="deleteComment(idx, props.commentId)"
                        class="w-[20px] h-[20px] cursor-pointer bg-no-repeat bg-cover hover:scale-110 transition duration-300 ease-in-out"
                    />
                </div>

                <button
                    v-if="commentIdx !== idx"
                    @click="openReplyComment(idx)"
                >
                    {{ $t("blog.reply") }}
                </button>
            </div>
        </div>
        <Transition name="slide-fade">
            <CommentBtnGroup
                class="ps-[55px] pe-3"
                v-if="replyComment && commentIdx === idx"
                @save-comment="
                    (textComment) => {
                        onReplyComment(
                            textComment,
                            idx,
                            props.commentId,
                            comment.author?.displayName
                        );
                    }
                "
                @cancel-action="onCancelAction"
                :placeholder="$t('blog.addComment')"
            >
                <template v-slot:cancel-btn>{{ $t("reused.cancel") }}</template>
                <template v-slot:save-btn>{{ $t("blog.reply") }}</template>
            </CommentBtnGroup>
        </Transition>
        <ReplayComment :comment="comment" />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useBlogStore } from "../../store/blogStore";
import { useAuthenticationStore } from "../../store/authStore";
import CommentBtnGroup from "../../components/CustomUI/CommentBtnGroup.vue";
import ReplayComment from "./ReplayComment.vue";
import { formatTime } from "../../services/TimeFormat";

const props = defineProps<{
    comments: {};
    commentId: string;
}>();
const text = ref<string>(""),
    blog = useBlogStore(),
    auth = useAuthenticationStore(),
    openEditComment = ref<boolean>(false),
    replyComment = ref<boolean>(false),
    commentIdx = ref<string>("");

const onSaveComment = async (comment, idx, id) => {
    try {
        await blog.editComment(comment, idx, id);
    } catch (e) {}
};
const onReplyComment = async (comment, idx, id, displayName) => {
    console.log(comment, idx, id);
    try {
        await blog.replayComment(comment, idx, id, displayName);
    } catch (e) {}
};
const updateLike = (idx, id) => {
    blog.likeUpdate(id, idx, auth.state.uid);
};
const openReplyComment = (idx: string) => {
    commentIdx.value = idx;
    replyComment.value = true;
};
const editComment = (idx: string) => {
    openEditComment.value = true;
    commentIdx.value = idx;
};
const onCancelAction = () => {
    replyComment.value = false;
    openEditComment.value = false;
    commentIdx.value = "";
};
const deleteComment = (idx, id) => {
    blog.deleteComment(idx, id);
};
</script>

<style scoped>
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(-20px);
    opacity: 0;
}
</style>
