<template>
    <div class="">{{ $t("profile.myOrders") }}</div>
    <div class="my-[26px] w-full max-w-[500px] custom-shadow rounded-[17px]">
        <OrderItem />
    </div>
    <div class="flex gap-2 mb-3">
        <div class="font-normal text-xs leading-4 first:ml-0">
            {{ $t("profile.status") }}
        </div>
        <div class="flex gap-2">
            <img src="../../assets/images/svg/profile/confirmed.svg" alt="" />
            <div class="font-normal text-xs leading-4">
                {{ $t("profile.confirmed") }}
            </div>
        </div>
        <div class="flex gap-2">
            <img src="../../assets/images/svg/profile/is-expected.svg" alt="" />
            <div class="font-normal text-xs leading-4">
                {{ $t("profile.isExpected") }}
            </div>
        </div>
        <div class="flex gap-2">
            <img src="../../assets/images/svg/profile/rejected.svg" alt="" />
            <div class="font-normal text-xs leading-4">
                {{ $t("profile.rejected") }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped></style>
