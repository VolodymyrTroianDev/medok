<template>
  <div
    class="flex flex-wrap max-w-[1188px] md:justify-center my-[55px] md:my-[155px] md:flex-nowrap mx-auto"
  >
    <div class="flex flex-col gap-2 md:gap-0">
      <div class="flex flex-col">
        <div class="flex items-center">
          <img src="../../assets/images/svg/social/where-we-are.svg" alt="" />
          <div class="">{{ $t("contactUs.location") }}</div>
        </div>
        <div
          class="cursor-pointer hover:text-main-color duration-500 px-6 text-base 2md:text-start 2sm:pl-[88px] max-w-[544px]"
          @click="openLinks('location')"
        >
          {{ $t("contactUs.address") }}
          48°49'51.3"N 23°23'19.7"E
        </div>
      </div>
      <div class="flex flex-col">
        <div class="flex items-center">
          <img src="../../assets/images/svg/social/phone.svg" alt="" />
          <div class="">{{ $t("contactUs.contactPhone") }}</div>
        </div>
        <address
          class="pl-[25px] 2sm:pl-[88px] pt-2 md:pt-0 text-base 2md:text-start"
        >
          <a
            class="hover:text-main-color duration-500"
            href="tel:(096) 10 26 541"
          >
            +380(096) 10 26 541
          </a>
          <a
            class="hover:text-main-color duration-500"
            href="tel:(068) 64 77 316"
          >
            +380(068) 64 77 316
          </a>
        </address>
      </div>
      <div class="flex flex-col">
        <div class="flex items-center">
          <img src="../../assets/images/svg/social/email.svg" alt="" />
          <div class="">{{ $t("contactUs.email") }}</div>
        </div>
        <address class="pl-[25px] 2sm:pl-[88px] text-base 2md:text-start">
          <a
            class="hover:text-main-color duration-500 cursor-pointer"
            @click="openLinks('email')"
          >
            medok_karpatskyj@gmail.com
          </a>
        </address>
      </div>
    </div>
    <div class="flex flex-col">
      <div class="flex flex-col">
        <div class="flex items-center">
          <img src="../../assets/images/svg/social/social.svg" alt="" />
          {{ $t("contactUs.social") }}
        </div>
      </div>
      <div class="flex flex-col gap-10 pl-[25px] 2sm:pl-[88px]">
        <div class="flex items-center gap-5" @click="openLinks('facebook')">
          <img src="../../assets/images/svg/social/facebook.svg" alt="" />
          <div class="hover:text-main-color duration-500 cursor-pointer">
            medok_karpatskyj
          </div>
        </div>
        <div class="flex items-center gap-5" @click="openLinks('instagram')">
          <img src="../../assets/images/svg/social/instagram.svg" alt="" />
          <div class="hover:text-main-color duration-500 cursor-pointer">
            medok_karpatskyj
          </div>
        </div>
        <div class="flex items-center gap-5" @click="openLinks('telegram')">
          <img
            src="../../assets/images/svg/social/telegram.svg"
            alt=""
            class="rounded"
          />
          <div class="hover:text-main-color duration-500 cursor-pointer">
            @medok_karpatskyj
          </div>
        </div>
      </div>
    </div>
  </div>
  <iframe
    class="map w-full"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2626.4310197081954!2d23.388805599999998!3d48.830916699999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xed58f7da2900a8de!2zNDjCsDQ5JzUxLjMiTiAyM8KwMjMnMTkuNyJF!5e0!3m2!1suk!2sua!4v1660592563262!5m2!1suk!2sua"
    height="600"
    style="border: 0"
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
  ></iframe>
</template>

<script setup lang="ts">
import data from "../../json/links.json";

const openLinks = (name: string) => {
  for (const key in data.links) {
    if (Object.hasOwnProperty.call(data.links, key)) {
      const element = data.links[key];
      if (element.name === name) {
        window.open(`${element.url}`);
      }
    }
  }
};
</script>

<style scoped></style>
