import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { fileURLToPath } from "url";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
  plugins: [
    vue(),
    Components({
      dirs: ["src/components", "src/assets/images/svg", "src/views"],
      extensions: ["vue"],
      deep: true,
      dts: true,
      directoryAsNamespace: false,
      include: [/\.vue$/, /\.vue\?vue/],
    }),
    AutoImport({
      imports: [
        "vue",
        "vue-router",
        "pinia",
        "@vueuse/core",
        "vue-i18n",
        {
          "@/store/generalStore": ["useGeneralStore"],
          "@/store/authStore": ["useAuthenticationStore"],
          "@/store/databaseStore": ["useDatabaseStore"],
          "@/store/basketStore": ["useBasketStore"],
          "@/store/blogStore": ["useBlogStore"],
          "@/store/productsStore": ["useProductsStore"],
          "@/store/mainDescriptionStore": ["useMainDescriptionStore"],
          "@/store/deliveryStore": ["useDeliveryStore"],
          "@/store/OrderStore": ["useOrderStore"],
          "@/services/LocalStorage": ["getItem", "setItem"],
          "@/types/auth-types": [
            "Register",
            "Login",
            "Errors",
            "AuthStore",
            "ErrorsInterface",
          ],
          "@/types/profile-types": ["CropperInfo"],
          "@/types/products-types": [
            "ProductEntity",
            "ProductItem",
            "Category",
            "Quantity",
            "StateProducts",
          ],
          "@vueuse/components": ["vOnClickOutside"],
        },
      ],
      dts: "src/auto-imports.d.ts",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      custom: path.resolve(__dirname, "src/components/CustomUI"),
      modals: path.resolve(__dirname, "src/components/Modals"),
    },
    extensions: [".js", ".ts", ".vue"],
  },
});
