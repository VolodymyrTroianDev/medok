<template>
  <Carousel :wrapAround="true" :breakpoints="store.breakpoints">
    <Slide v-for="slide in props.data" :key="slide">
      <div class="carousel__item">
        <div class="blog">
          <img
            :src="getImageUrl(slide.img)"
            class="blog__img"
            height="350"
          />
          <h2 class="blog__title">{{ slide.title }}</h2>
          <p class="blog__desc">
            {{ slide.desription }}
          </p>
          <div class="blog__footer">
            <div class="blog__date">
              <img
                src="../../assets/images/svg/calendar.svg"
                class="blog__date-calendar"
              />
              <span class="blog__date-text">{{
                  slide.date
                }}</span>
            </div>
            <button class="flex items-center text-main-color">
              {{ $t("blog.blogBtnText") }}
              <img
                src="../../assets/images/svg/arrow-img.svg"
                alt=""
                class="ms-2 mt-1"
              />
            </button>
          </div>
        </div>
      </div>
    </Slide>

    <template #addons>
      <Navigation/>
      <Pagination/>
    </template>
  </Carousel>
</template>

<script lang="ts" setup>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: () => ({ name: "", description: "", img: "", data: "" }),
  },
});
const store = reactive({
  breakpoints: {
    // 100 and up
    100: {
      itemsToShow: 1,
      snapAlign: "center",
    },
    // 555 and up
    655: {
      itemsToShow: 2,
      snapAlign: "center",
    },
    // 555 and up
    1100: {
      itemsToShow: 3,
      snapAlign: "center",
    },
    // 555 and up
    1800: {
      itemsToShow: 4,
      snapAlign: "center",
    },
  },
});
const getImageUrl = (url: string) => {
  return new URL(
    `../../assets/images/jpg/main/blogs/${ url }.jpg`,
    import.meta.url
  ).href;
};
</script>

<style lang="scss">
.carousel__slide > .carousel__item {
  transform: scale(1);
  opacity: 0.5;
  transition: 0.5s;
}

.carousel__slide--visible > .carousel__item {
  opacity: 1;
  transform: rotateY(0);
}

.carousel__prev,
.carousel__next {
  background: #95410a !important;
  transition: 400ms all;

  &:hover {
    background: #ffffff !important;
    color: #95410a !important;
  }
}

.carousel__prev {
  @apply left-[15px] full-hd:left-4;
}

.carousel__next {
  @apply right-[15px] full-hd:right-4;
}

.carousel__pagination {
  .carousel__pagination-button {
    background: #ffffff;
  }

  .carousel__pagination-button--active {
    background: #95410a;
  }
}

.carousel__slide--next > .carousel__item {
  transform: scale(0.8) translate(-10px);
}

.carousel__slide--prev > .carousel__item {
  transform: scale(0.8) translate(10px);
}

.carousel__slide--active > .carousel__item {
  transform: scale(1);
}

@media (max-width: 1100px) {
  .carousel__slide--next > .carousel__item {
    transform: scale(0.7) translate(-10px);
  }
  .carousel__slide--prev > .carousel__item {
    transform: scale(0.7) translate(10px);
  }
  .carousel__slide--active > .carousel__item {
    transform: scale(0.9);
  }
}

.carousel {
  width: 100%;
}

.carousel__slide {
  padding: 5px;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}

.carousel__slide {
  opacity: 0.9;
  transform: rotateY(-20deg) scale(0.9);
}

.carousel__slide--active ~ .carousel__slide {
  transform: rotateY(20deg) scale(0.9);
}

.carousel__slide--prev {
  opacity: 1;
  transform: rotateY(-10deg) scale(0.95);
}

.carousel__slide--next {
  opacity: 1;
  transform: rotateY(10deg) scale(0.95);
}

.carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(1.1);
}

.carousel__item {
  .blog {
    width: 100%;
    padding: 20px;
    margin: 30px 0 30px 0;
    background-color: #fff;
    border-radius: 20px;

    .blog__img {
      width: 100%;
      margin-bottom: 20px;
    }

    .blog__title {
      margin-bottom: 20px;
      text-transform: uppercase;
      font-size: 25px;
      color: #121212;
    }

    .blog__desc {
      font-size: 14px;
      margin-bottom: 40px;
    }

    .blog__footer {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .blog__date {
        display: flex;

        img {
          margin-right: 10px;
        }
      }
    }
  }
}

.carousel {
}
</style>
