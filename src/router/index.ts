import { createRouter, createWebHistory } from "vue-router";
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
    },
    meta: {
      title: "header.main"
    }
  },
  {
    path: "/:locale/contact-us",
    name: "ContactUs",
    components: {
      Header,
      default: ContactUs,
      Footer
    },
    meta: {
      title: "header.contacts"
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
    meta: {
      title: "header.blog"
    }
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
    meta: {
      title: "header.product"
    }
  },
  {
    path: "/:locale/profile",
    name: "Profile",
    components: {
      Header,
      default: Profile,
      Footer
    },
    meta: {
      title: "profile.title"
    }
  },
  {
    path: "/:locale/profile/edit",
    name: "EditProfile",
    components: {
      Header,
      default: EditProfile,
      Footer
    },
    meta: {
      title: "profile.edit"
    }
  },
  {
    path: "/:locale/order/process-creating",
    name: "OrderingOrder",
    components: {
      Header,
      default: OrderingOrder,
      Footer
    },
    meta: {
      title: "basket.checkout"
    }
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
