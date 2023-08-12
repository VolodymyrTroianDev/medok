<template>
  <footer class="bg-footer w-screen lg:max-h-[351px] h-full py-[35px]">
    <div class="flex">
      <img src="../../assets/images/png/footer/footer.png" alt="" class="hidden lg:block">
      <div class="flex flex-wrap mx-auto max-w-[500px] text-center lg:text-start lg:max-w-[1145px] w-full justify-center lg:justify-between lg:flex-nowrap">
        <div class="pr-5 lg:pr-10 hidden lg:block">
          <router-link
            tag="button"
            :to="{ name: 'Main'}"
            class="flex items-center gap-3 font-marck-script text-[23px] lg:text-[30px] ">
            <img src="./../../assets/images/svg/logo.svg" class="w-9 h-9 hover:scale-110 transition-all duration-350"
                 alt="">
            {{ $t("header.title") }}
          </router-link>
        </div>
        <div class="mb-5 lg:mb-0 lg:border-l lg:border-r lg:border-footer-border w-[380px] px-2 lg:px-20">
          <div class="uppercase font-semibold text-[15px] md:text-[18px]">{{ $t("footer.quickUrl")}}</div>
          <nav class="mt-[10px] lg:mt-[25px]">
            <ul class="flex flex-col gap-[10px] md:flex-nowrap">
              <router-link
                active-class="text-main-color duration-300"
                tag="li"
                :to="{ name: 'Main' }"
                class="text-[15px] md:text-[17px] hover:text-main-color duration-300 "
              >
                {{ $t("header.main") }}
              </router-link>
              <router-link
                active-class="text-main-color duration-300"
                tag="li"
                :to="{ name: 'Products' }"
                class="text-[15px] md:text-[17px] hover:text-main-color duration-300 "
              >
                {{ $t("header.product") }}
              </router-link>
              <router-link
                active-class="text-main-color duration-300"
                tag="li"
                :to="{ name: 'Blog'}"
                class="text-[15px] md:text-[17px] hover:text-main-color duration-300 "
              >
                {{ $t("header.blog") }}
              </router-link>
              <router-link
                active-class="text-main-color duration-300"
                tag="li"
                :to="{ name: 'ContactUs'}"
                class="text-[15px] md:text-[17px] hover:text-main-color duration-300 "
              >
                {{ $t("header.contacts") }}
              </router-link>
            </ul>
          </nav>
        </div>
        <div class="lg:ps-20">
          <div class="uppercase font-semibold text-[15px] md:text-[17px]">{{ $t("header.contacts") }}</div>
          <div class="flex flex-col gap-[10px] mt-[10px] lg:mt-[25px] max-w-[325px]">
              <div class="text-[15px] md:text-[17px] font-normal	">{{ $t("footer.city") }}</div>
              <address class="flex flex-col gap-[10px]">
                <a class="hover:text-main-color duration-500 text-[15px] md:text-[17px]" href="tel:(096) 10 26 541">
                  +380(096) 10 26 541
                </a>
                <a class="hover:text-main-color duration-500 text-[15px] md:text-[17px]" href="tel:(068) 64 77 316">
                  +380(068) 64 77 316
                </a>
              </address>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>
