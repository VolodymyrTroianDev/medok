<template>
  <article
    class="relative flex max-w-[1600px] justify-between items-center mx-auto mt-28 md:px-5"
  >
    <div class="">
      <h4 class="text-main-color text-center md:text-xl uppercase font-medium">
        {{ $t("why.subTitle") }}
      </h4>
      <h2
        class="font-marck-script text-black text-center px-2 text-[24px] 2sm:text-[54px] md:px-0"
      >
        {{ $t("why.title") }}
      </h2>
      <p class="mx-auto mb-[95px] max-w-[475px] text-center">
        Sed ut perspiciatis unde omnis iste natus volup tatem acceptantium
        dolore dantiu totam reperiam, eaque ipsa quae ab illo inventore
        veritatis et qrchitecto
      </p>
      <div class="flex flex-wrap gap-10 max-w-[900px] justify-center mb-10">
        <div
          class="max-w-[320px] flex flex-col items-center gap-3"
          data-aos="fade-up"
        >
          <inline-svg
            src="/assets/images/svg/main/why-item-img.svg"
            class="w-[82px]"
          />
          <h3 class="font-medium">Lorem ipsum</h3>
          <p class="text-center">
            Sed ut perspiciatis unde omnis iste natus volup tatem acceptantium
            dolore dantiu totam.
          </p>
        </div>
        <div
          class="max-w-[320px] flex flex-col items-center gap-3"
          data-aos="fade-up"
        >
          <inline-svg
            src="/assets/images/svg/main/why-item-img.svg"
            class="w-[82px]"
          />
          <h3 class="font-medium">Lorem ipsum</h3>
          <p class="text-center">
            Sed ut perspiciatis unde omnis iste natus volup tatem acceptantium
            dolore dantiu totam.
          </p>
        </div>
        <div
          class="max-w-[320px] flex flex-col items-center gap-3"
          data-aos="fade-up"
        >
          <inline-svg
            src="/assets/images/svg/main/why-item-img.svg"
            class="w-[82px]"
          />
          <h3 class="font-medium">Lorem ipsum</h3>
          <p class="text-center">
            Sed ut perspiciatis unde omnis iste natus volup tatem acceptantium
            dolore dantiu totam.
          </p>
        </div>
        <div
          class="max-w-[320px] flex flex-col items-center gap-3"
          data-aos="fade-up"
        >
          <inline-svg
            src="/assets/images/svg/main/why-item-img.svg"
            class="w-[82px]"
          />
          <h3 class="font-medium">Lorem ipsum</h3>
          <p class="text-center">
            Sed ut perspiciatis unde omnis iste natus volup tatem acceptantium
            dolore dantiu totam.
          </p>
        </div>
      </div>
    </div>
    <img src="/assets/images/png/main/why-ill.png" class="hidden lg:block" />
  </article>
</template>

<script setup lang="ts"></script>

<style scoped></style>
