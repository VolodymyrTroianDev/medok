<template>
    <MyModal
        :show="general.openAddArticlePanel"
        :styles="'w-full min-h-[500px] pt-[20px]'"
        @close-modal="general.openAddArticlePanel = false"
    >
        <div class="flex flex-col gap-5">
            <img
                @click="general.openAddArticlePanel = false"
                src="../../../assets/images/svg/basket/basket-close-btn.svg"
                alt=""
                class="w-4 h-4 absolute right-3 top-3 cursor-pointer"
            />
            <label class="text-custom-gray">
                {{ $t("blog.addTitle") }}
            </label>
            <InputText type="text" v-model="dataArticle.title">
                {{ $t("blog.titleArticle") }}
            </InputText>
            <div class="relative min-h-[200px]">
                <label class="text-custom-gray">
                    {{ $t("blog.addImg") }}
                </label>
                <img
                    v-show="dataArticle.imgUrl"
                    class="object-cover cursor-pointer"
                    :src="dataArticle.imgUrl"
                    alt=""
                    width="300"
                    height="300"
                />
                <label
                    for="file-upload"
                    class="photo-add absolute bottom-4 right-12 w-[59px] h-[70px] cursor-pointer bg-no-repeat bg-cover"
                >
                    <i></i>
                </label>
                <input
                    id="file-upload"
                    type="file"
                    ref="photo"
                    v-on:change="handleUpload"
                    accept="image/*"
                />
            </div>
            <label class="text-custom-gray">
                {{ $t("blog.addDescription") }}
            </label>
            <TextArea v-model="dataArticle.description" />
            <button class="red-btn" @click="saveArticle()">
                {{ $t("blog.addArticle") }}
            </button>
        </div>
    </MyModal>
</template>
<script setup lang="ts">
const database = useDatabaseStore();
const blogsDataBase = useBlogStore();
const general = useGeneralStore();
const dataArticle = reactive({
    title: "",
    description: "",
    imgUrl: "",
});
const cropperInfo = ref<CropperInfo>({
    selectedImage: "",
});
const saveArticle = async () => {
    general.statusLoader = true;
    try {
        await blogsDataBase.createBlogArticle(dataArticle);
        general.openAddArticlePanel = false;
        general.statusLoader = false;
    } catch (e) {}
};
const handleUpload = (e) => {
    const file = e.target.files[0];

    if (file.size > 10485760) {
        console.log("Занадто велике фото");
    } else {
        const reader = new FileReader();
        reader.onload = (event) => {
            dataArticle.imgUrl = event.target.result;
        };
        reader.readAsDataURL(file);
        general.openCropperModal = true;
    }
};
</script>
