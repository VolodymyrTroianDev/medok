<template>
  <Slider
    v-model="productsStore.priceLimit"
    :format="{
      prefix: '₴',
    }"
    show-tooltip="drag"
    :max="3000"
    :step="30"
    @update:modelValue="updatePrice"
  />

  <div class="price">
    {{ $t("products.price") }}: {{ productsStore.priceLimit[0] }} ₴ &horbar;
    {{ productsStore.priceLimit[1] }} ₴
  </div>
  <div></div>
</template>
<script setup lang="ts">
import Slider from "@vueform/slider";
import {useProductsStore} from "@/store/productsStore";
import {useRoute, useRouter} from "vue-router";
const productsStore = useProductsStore()
const router = useRouter();
const route = useRoute();

if (Object.keys(route.query).length > 0) productsStore.priceLimit = [Number(route.query.minPrice),Number(route.query.maxPrice)];

const updatePrice = (value) => {
  router.push({
    name: `ProductsItems`,
    params: {
      locale: route.params.locale,
      id: route.params.id,
    },
    query: { minPrice: value[0], maxPrice: value[1] },
  });
}
</script>
<!--<script>

export default {
  components: { Slider },
  data() {
    return {
      initialPrice: [0, 3000],
    };
  },
  props: ["price", "modelValue"],
  mounted() {
    this.initialPrice = this.price || this.modelValue;
  },
  methods: {
    updatePrice() {
      this.$emit("change", this.initialPrice);
      this.$emit("update:modelValue", this.initialPrice);
    },
  },
};
</script>-->

<style lang="scss">
@import "@vueform/slider/themes/default.css";
.price {
  margin-top: 8px;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  color: #272529;
}
.slider-target {
  width: 208px;
  margin: 0 auto;
  @media (max-width: 600px) {
    margin: 25px auto;
  }
}

.slider-connect {
  background: #d15d0d;
}
.slider-tooltip {
  background: #d15d0d;
  border: 1px solid #d15d0d;
}
.slider-focused {
  background-color: var(--medok-orange);
}
.slider-handle:focus {
  box-shadow: var(
    --slider-handle-shadow,
    0.5px 0.5px 2px 1px rgba(0, 0, 0, 0.32)
  );
}
</style>
