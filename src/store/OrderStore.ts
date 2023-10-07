import {defineStore} from "pinia";
import {reactive} from "vue";
import {addDoc,setDoc, collection,doc} from "firebase/firestore";
import {db} from "@/main";
import {useI18n} from "vue-i18n";
import {useAuthenticationStore} from "@/store/authStore";

export const useOrderStore = defineStore("orderStore", () => {
  const state = reactive({});
  const {t} = useI18n();
  const auth = useAuthenticationStore();

  const sendEmail = async (data) => {
    console.log(data)
    try {
      const docRef = await setDoc(doc(db, 'mail', auth.state.uid), {
        to: [data.email],
        message: {
          subject: `${t("message.hello")}, ${data.surname} ${data.name}`,
          html: `<html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                </head>

                <body style="font-family: Arial; margin: 0;">
                    <div style="background-color: #f3f3f5;padding: 16px 12px;margin: 0 auto;">
                        <div style="vertical-align: top">
                            <div style="margin: 0 auto;">
                                <div style="position: relative; width: 100%; background: #FFFFFF; border-radius: 6px; margin: 0 auto; text-align: center; z-index: 0; background-repeat: no-repeat; background-position: center; background-image: url(https://lh3.googleusercontent.com/hUOK-ZxrWplNiyEuf-UR3Q9YTKzDTSZ1lqnhlxCJT57lr4ZuNpRPwW-JO_njzo9m_jhR3fe8e0qQMtBGy0EhodLuialn213K48X8N8uj-BFfhB7B5FA2-9gAZIFxZSdhEbsJIQjxANRXb8dawLqg_focglkQpSF9IbCAzH5JkTDAglZTY9LxBhvOAf8uC24QBwhMCFfnl4Ie84udNRnESWUgYRW6vQD37OYV9St6tkCOygx8elRRUqvyKSrNgkilW0feSybucQv9FGibvDLWi5Dgq3gnRZSw5N-M1o7hm-vmUTiYAhS_V8pW0YnS1bogi-pTxrpmqLMCZMepq4va3YOnGWfrhYF5MXKYZxn55u7kDK1jvLfuBUmj8QX_a8qXAM1w9M0S2wu2M-6OhXoe34w6xnK-RxRoxhaORQKpefKAWhqXpAyj-mMx52rxg4igvQKV_4YUu-7RDtXf46rCFaYI-7MnOYohEippwgtBzFzK3aYfAMtM4G_w86dIGHQ7fbW0BxwtrFSLQMC5RMVVc_3Hh26Oj97lhrXbDtNPggUi5vCzeVMHbQg-EidEQXtQqB4pw4_Ma7kAX11SzbAsPY5bU3OSYoO5Mebg3SPCUyZF4mgyNHQAUm9zmAZ1SNcAFLQMv5CIV5CtTRAHjZw5X5dzUEv2p238sZ_9XOv6pk1YIY-H_ntWD6nBwjZC3lbcnNQOxQl9oVq6ZemcLbyG3RYA5-lUHKh9tCccFvkM4gy7CI4TUTwXkcqLRJ1BxgxyZofrG_6IDnzoM0zI2NHRIvd2ccluY5w4n4LADZxA1PMAKVmwURNmjqppT7esfEHqLSEGwISaFs94SCpOur34CFoB_bg_SoZ0b0vCUqpTL_rOitgFpJIq1j_l6WOoUninNCLD_9Y_7LXeU6dRXOUkeYSvk1hOiaFdn2gqhH5C7AznTLrwXaAwUb6ZUUlrbQ1l6tM00nH_JE-TGfqZABdCjwgQdFX_wII6bhmI1IURpPt_efPBNqWEQKcDvLBpLT2APK44ex9EHtxw8B5kbZQUR8cN3qaw72FUy-3yM-XgpkRik7rH5MVYn1XAgWx0xtB18oLE5VKOybVPbO3bY4405F1Q5zhuwO5a=s405-no?authuser=5); ">
                                    <div style="background-image:url(https://lh3.googleusercontent.com/pw/AIL4fc8aLLkHT3YIPhMDqtt5WxYbjw5HtoWr-w7vh1ppM_7S1tMRMX6NcPxMjyjomVV-sB3fZI5zGGV531Qu2PWPkad0rkee9ar7FVi4a6G9Yq9PYFQg9SnA-DujWFUYvP0eEsKuvoljTfKXeKOpdATZ5YbWMytQj3qeyYioCiUyfrIQgglTjj-8DmWY4RczjTkaoVduzNVMwfznDkkBQHkfTojfS0WbzdfggpPRt7j8PlmNPj2te26WP1PEJ5Ccoufiy7mGJivnqZDk1YP98wMHXXwKTLOcCe3cUyC7SgZjSl8bHNbfW-JruARbwF36Lzk6lDPyeFCA9I7FzdteVPbvIgIEBZpHuwXmZfGOBuNndc7T2F_9qCNfxqX8qeQB4hmc8Pso3bdLuOiZvMS1WREqPCUME87h6Ib98lcg6I2q9VmjiybdbEnbjca3mRmznvQTun9tgCB8R7OuQ4yjPpkKF5gzUVBD-GTMpT_431bAL9dww1y2oa4w1BQ9n55b__Xobgswc-J7PKdaF6QBpQIcGsOkIRyv-yUZWfTh4c3p1Q_YnDIr5I6BOZ2lB2d8fyslmKoRiVkKAYM5zYbxtdetmJucWI3lwoC8o9jISovVx9-N73uM9xADu-FgUdAwe3JsuROViQxYzLkm6i2WJ32NrnkX_okv6lIag3SWwYjawUeyUrPwg6xuyi5d2nt1MqJRxNBylD_QxMZCqt5fQCWWjcepfLzleYKNWMzIl1r_Es9NnCVvDWbmdlL1-tG4Re4AciHUFjh4ZQABwFCsEnLoEnE1qEErsyg9Y-snNQUP5mCAQsH90yizK1WumgvbyNEUgZjtjgD0gbUiLK3YGnO3WCc5aNGCWOge-wjo4bI7u3iXZcRLHnLehH_6UHTXkddOFDn-1e5Jid24lrYoGXSHr8qxyQkpZMdGpdkX2QzEBndrO9F4HxGN5NMfMISubdSl2K5MNhpSMSST2q9b7rw2PXHkTyNMWQXvHVxXz9sGIGUoVP5UNwBhHErG3q3YzNY=w1529-h126-s-no?authuser=1); width:100%">
                                    <div style="font-family: 'MarckScript';font-size: 40px;padding-top: 29px;padding-bottom: 12px;">${t("message.hello")}, ${data.name}</div>
                                    <div style="font-family: 'Open Sans';font-style: normal;font-weight: 600;font-size: 14px;line-height: 19px;">Наша команда вдячна що ви обрали саме нас</div>

                                    <div style="display: flex; justify-content: space-between; align-items: center; max-width: 340px; padding: 0 7px 0 7px; margin: 0 auto; margin-top: 32px;">
                                        <div style="font-family:'Open Sans';font-style: normal;font-weight: 600;font-size: 14px;line-height: 19px;">Посилання на наш сайт:</div>
                                        <a
                                            href="https://medok-karpatskyj.web.app/ua" target="_blank"
                                                style="
                                                text-decoration: none;
                                                font-family: 'Open Sans';
                                                font-style: normal;
                                                font-weight: 300;
                                                font-size: 12px;
                                                line-height: 16px;
                                                margin-left: 5px;
                                                margin-top:1px"
                                        >
                                            https://medok-karpatskyj.web.app/ua
                                        </a>
                                    </div>
                                    <div
                                        style="
                                            display: flex;
                                            justify-content: space-between;
                                            align-items: center;
                                            max-width: 340px;
                                            padding: 0 7px 0 7px;
                                            margin: 0 auto;
                                            margin-top: 32px;
                                        "
                                    >
                                        <div
                                        style="
                                        font-family:'Open Sans';
                                        font-style: normal;
                                        font-weight: 600;
                                        font-size: 14px;
                                        line-height: 19px;
                                        "
                                    >
                                        Адреса електронної пошти:
                                    </div>
                                    <div
                                        style="font-family: 'Open Sans'; font-style: normal; font-weight: 300; font-size: 12px; line-height: 16px; margin-left: 20px; margin-top:1px">${data.email}</div>
                                    </div>
                                    <div style="display: flex; justify-content: space-between; align-items: center; max-width: 340px; padding: 0 7px 0 7px; margin: 0 auto; margin-top: 32px;">
                                        <div style="font-family:'Open Sans';font-style: normal;font-weight: 600;font-size: 14px;line-height: 19px;">Загальна сума:</div>
                                        <div style="font-family: 'Open Sans'; font-style: normal; font-weight: 300; font-size: 12px; line-height: 16px; margin-left: 20px; margin-top:1px">
                                            ${data.total.totalProduct} - товар(ів) на суму - ${data.total.totalPrice}
                                        </div>

                                </div>
                                <div style="display: flex; justify-content: center; align-items: center; max-width: 340px; padding: 0 7px 0 7px; margin: 0 auto; margin-top: 32px;">
                                        <div style="font-family:'Open Sans';font-style: normal;font-weight: 600;font-size: 14px;line-height: 19px;">Дякуємо за покупку !</div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </body>
                </html>`
        }
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  return {
    state,
    sendEmail
  }
})
