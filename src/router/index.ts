import {createRouter, createWebHistory} from "vue-router";
import Main from "../views/Main/Main.vue";
import Header from "@/components/Header/Header.vue";
import Footer from "@/components/Footer/Footer.vue";
import type { RouteRecordRaw } from "vue-router";
import ContactUs from "@/views/ContactUs/ContactUs.vue";
import Blog from "@/views/Blogs/Blog.vue";
import Products from "@/views/Products/Products.vue";
import i18n from "@/localization/i18n";
import ProductItems from "@/views/Products/ProductItems.vue";
import Profile from "@/views/Profile/Profile.vue";
import EditProfile from "@/views/Profile/EditProfile.vue";
import OrderingOrder from "@/views/Orders/OrderingOrder.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/:locale",
    name: "Main",
    components: {
      default: Main,
      Footer
    }
  },
  {
    path: "/:locale/contact-us",
    name: "ContactUs",
    components: {
      Header,
      default: ContactUs,
      Footer
    }
  },
  {
    path: "/:locale/blog",
    name: "Blog",
    components: {
      Header,
      default: Blog,
      Footer
    },
  },
  {
    path: "/:locale/products",
    name: "Products",
    components: {
      Header,
      default: Products,
      Footer
    },
    redirect: (to) => {
      return {
        name: "ProductsItems",
        params: { locale: to.params.locale, id: "all" },
      };
    },
    children: [
      {
        path: ":id",
        name: "ProductsItems",
        component: ProductItems,
      },
    ],
  },
  {
    path: "/:locale/profile",
    name: "Profile",
    components: {
      default: Profile,
      Header,
    },
  },
  {
    path: "/:locale/profile/edit",
    name: "EditProfile",
    components: {
      default: EditProfile,
      Header,
    },
  },
  {
    path: "/:locale/order/process-creating",
    name: "OrderingOrder",
    components: {
      default: OrderingOrder,
      Header,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
    const locale = to.params.locale;
    let globalLocale: any = i18n.global.locale;
    const supported_locales =
        import.meta.env.VITE_APP_I18N_SUPPORTED_LOCALE.split(",");
    if (!supported_locales.includes(locale)) return next("ua");
    if (globalLocale.value !== locale) {
        globalLocale.value = locale;
    }
    return next();
});
export default router;
