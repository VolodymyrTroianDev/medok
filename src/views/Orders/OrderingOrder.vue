<template>
    <div class="font-marck-script text-[54px] text-center">
        {{ $t("basket.checkout") }}
    </div>
    <VForm
        class="flex justify-center 2xl:justify-between flex-wrap 2xl:flex-nowrap"
        @submit="onSubmit"
        v-slot:default="{ values }"
        :validation-schema="validationScheme"
        @invalid-submit="onInvalidSubmit"
    >
        <div
            class="flex flex-col xl:ms-14 xl:mr-14 mx-6 gap-7 xl:gap-0 mb-5 w-full lg:w-2/5"
        >
            <div class="flex flex-col gap-4 xl:gap-0">
                <div class="flex gap-4">
                    <div class="bg-main-color rounded-full w-[24px] h-[24px]">
                        <div class="text-white text-center">1</div>
                    </div>
                    <div class="text-[18px] font-semibold">
                        {{ $t("basket.contactDetails") }}
                    </div>
                </div>
                <div class="flex flex-col gap-8 p-0 lg:p-6">
                    <div
                        class="flex justify-between lg:justify-center gap-8 lg:w-full flex-wrap xl:flex-nowrap"
                    >
                        <div class="relative w-full min-w-[250px]">
                            <Field v-slot="{ field }" name="surname">
                                <input-text
                                    v-bind="field"
                                    v-model="field.value"
                                    class="focus:ring-0 focus:ring-offset-0 w-full"
                                >
                                    {{ $t("basket.surname") }}
                                </input-text>
                            </Field>
                            <ErrorMessage
                                as="div"
                                name="surname"
                                class="invalid-tooltip absolute text-red-600 inline-block text-xs leading-4 mt-[5px]"
                            />
                        </div>
                        <div class="relative w-full min-w-[250px]">
                            <Field v-slot="{ field }" name="name">
                                <input-text
                                    v-bind="field"
                                    v-model="field.value"
                                    class="focus:ring-0 focus:ring-offset-0 w-full"
                                >
                                    {{ $t("basket.name") }}
                                </input-text>
                            </Field>
                            <ErrorMessage
                                as="div"
                                name="name"
                                class="invalid-tooltip absolute text-red-600 inline-block text-xs leading-4 mt-[5px]"
                            />
                        </div>
                    </div>
                    <div
                        class="flex justify-between lg:justify-center gap-8 lg:w-full flex-wrap xl:flex-nowrap"
                    >
                        <div class="relative w-full min-w-[250px]">
                            <Field v-slot="{ field }" name="phoneNumber">
                                <input-phone
                                    v-bind="field"
                                    v-model="field.value"
                                    class="focus:ring-0 focus:ring-offset-0 w-full"
                                >
                                    {{ $t("basket.phoneNumber") }}
                                </input-phone>
                            </Field>
                            <ErrorMessage
                                as="div"
                                name="phoneNumber"
                                class="invalid-tooltip absolute text-red-600 inline-block text-xs leading-4 mt-[5px]"
                            />
                        </div>
                        <div class="relative w-full min-w-[250px]">
                            <Field v-slot="{ field }" name="email">
                                <input-text
                                    type="email"
                                    v-bind="field"
                                    v-model="field.value"
                                    class="focus:ring-0 focus:ring-offset-0 w-full"
                                >
                                    {{ $t("profile.email") }}
                                </input-text>
                            </Field>
                            <ErrorMessage
                                as="div"
                                name="email"
                                class="invalid-tooltip absolute text-red-600 inline-block text-xs leading-4 mt-[5px]"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col gap-4">
                <div class="flex gap-4">
                    <div class="bg-main-color rounded-full w-[24px] h-[24px]">
                        <div class="text-white text-center">2</div>
                    </div>
                    <div class="text-[18px] font-semibold">
                        {{ $t("basket.delivery") }}
                    </div>
                </div>
                <div class="relative w-full xl:mt-2 mb-6">
                    <LocationSelect
                        @update-city="onUpdateCity"
                        class="mt-0 xl:0"
                    />
                    <Field
                        type="hidden"
                        name="city"
                        v-model="selectCity"
                        :value="selectCity"
                    />
                    <ErrorMessage
                        as="div"
                        name="city"
                        class="invalid-tooltip absolute text-red-600 inline-block text-xs leading-4 mt-[5px]"
                    />
                </div>
            </div>
            <div class="flex flex-col gap-4 mt-3">
                <div class="flex gap-4">
                    <div class="bg-main-color rounded-full w-[24px] h-[24px]">
                        <div class="text-white text-center">3</div>
                    </div>
                    <div class="text-[18px] font-semibold">
                        {{ $t("basket.payment") }}
                    </div>
                </div>
                <div class="relative w-full">
                    <Field
                        name="paymentType.codPayment"
                        v-model="paymentType"
                        :value="paymentType"
                    >
                        <RadioBtn
                            @update:model-value="
                                (modelValue) => {
                                    onUpdateRadioBtn(modelValue);
                                }
                            "
                        >
                            {{ $t("basket.paymanentText") }}
                        </RadioBtn>
                    </Field>
                    <ErrorMessage
                        as="div"
                        name="paymentType"
                        class="invalid-tooltip absolute text-red-600 inline-block text-xs leading-4 mt-[5px]"
                    />
                </div>
                <Field
                    type="hidden"
                    name="products"
                    :value="basket.state.selectedProducts"
                />
                <Field type="hidden" name="date" :value="new Date()" />
                <Field type="hidden" name="total" :value="basket.total" />
            </div>
        </div>
        <div
            class="flex flex-wrap flex-col-reverse xl:flex-row xl:flex-nowrap lg:w-3/5 mx-4 lg:mx-0 gap-4 xl:pt-10"
        >
            <BasketItem class="lg:w-3/5 lg:min-w-[500px] px-2 pt-1" />
            <div class="w-full xl:w-2/5 px-2 flex flex-col items-center gap-7">
                <TotalsPrice :total="basket.total" />
                <button class="red-btn max-w-[263px]">
                    {{ $t("basket.confirmOrder") }}
                </button>
                <div class="text-color-green max-w-[323px] flex gap-2">
                    <span class="text-red-600">*</span>
                    <span class="">{{ $t("basket.deliveryText") }}</span>
                </div>
            </div>
        </div>
    </VForm>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import BasketItem from "@/components/Modals/Basket/BasketItem.vue";
import TotalsPrice from "@/views/Orders/TotalsPrice.vue";
import { useBasketStore } from "@/store/basketStore";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { object, string, boolean } from "yup";
import { useI18n } from "vue-i18n";
import InputPhone from "@/components/CustomUI/InputPhone.vue";
import { onInvalidSubmit } from "@/services/sroll";
import { useOrderStore } from "@/store/OrderStore";
import { useAuthenticationStore } from "@/store/authStore";
const basket = useBasketStore();
const order = useOrderStore();
const paymentType = ref(false);
const selectCity = ref("");

const { t } = useI18n();
const onUpdateRadioBtn = (flag) => {
    paymentType.value = flag;
};
const onUpdateCity = (city) => {
    selectCity.value = city;
};
const onSubmit = async (val) => {
    await order.sendEmail(val);
};
const validationScheme = object().shape({
    surname: string()
        .nullable()
        .required(t("error.required") + " *"),
    name: string()
        .nullable()
        .required(t("error.required") + " *"),
    email: string()
        .nullable()
        .email()
        .required(t("error.required") + " *"),
    city: string()
        .nullable()
        .required(t("error.required") + " *"),
});
</script>

<style scoped></style>
