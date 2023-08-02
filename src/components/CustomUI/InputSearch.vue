<template>
  <div class="input-search">
    <input type="text" class="input" :placeholder="$t('blog.search')" />
    <search-img class="search" />
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";

const props = defineProps(["disabled", "placeholder"]);
const store = reactive({
  valueInput: "",
});
</script>
<style lang="scss" scoped>
.input-search input {
  width: 100%;
  padding: 10px;
  border: 1px solid #c8c8c8;
  background-color: #fff;
  border-radius: 30px;
  outline: none;
  color: #121212;
  font-size: 1em;
  .input-text input:valid ~ .input-text__title,
  .input-text input:focus ~ .input-text__title {
    color: #fff;
    transform: translateX(10px) translateY(-7px);
    font-size: 0.65em;
    padding: 0 10px;
    background-color: #e67a17;
    border-left: 1px solid #e67a17;
    border-right: 1px solid #e67a17;
    letter-spacing: 0.2em;
  }
  .input-text input:valid,
  .input-text input:focus {
    border: 1px solid #e67a17;
  }
}
.search {
  position: absolute;
  top: 13px;
  right: 20px;
  width: 17px;
  height: 19px;
  background-repeat: no-repeat;
}
</style>
