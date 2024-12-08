<template>
    <aside class="buy-form">
        <div class="buy-form__content">
            <transition-group name="check__data-send-message-anination">
                <form
                    class="buy-form form"
                    @submit.prevent
                    v-if="isOrderSend === 'false'"
                >
                    <my-input
                        v-model.trim="formData.name"
                        :nameId="1"
                        :req="true"
                        :clickButton="clickButton"
                        :placeHolder="'Фамилия Имя Отчество'"
                        :data-error="dataError"
                        class="form__input"
                    >
                        Введите ваше ФИО
                    </my-input>

                    <my-input
                        v-model.trim="formData.birthDate"
                        :nameId="2"
                        :req="false"
                        :placeHolder="'01 01 1900'"
                        :data-error="dataError"
                        class="form__input"
                    >
                        Дата рождения
                    </my-input>

                    <div
                        class="form__adress"
                        v-show="cartStore.hasDelivery"
                    >
                        <span class="form__subtitle">Адрес:</span>
                        <my-input
                            v-model.trim="formData.adress.city"
                            :nameId="3"
                            :req="true"
                            :clickButton="clickButton"
                            :placeHolder="'City'"
                            :data-error="dataError"
                            class="form__input"
                        >
                            Город
                        </my-input>
                        <my-input
                            v-model.trim="formData.adress.street"
                            :nameId="3"
                            :req="true"
                            :clickButton="clickButton"
                            :placeHolder="'Улица'"
                            :data-error="dataError"
                            class="form__input"
                        >
                            Улица
                        </my-input>
                        <my-input
                            v-model.trim="formData.adress.home"
                            :nameId="3"
                            :req="true"
                            :clickButton="clickButton"
                            :placeHolder="'2'"
                            :data-error="dataError"
                            class="form__input"
                        >
                            Номер дома
                        </my-input>
                    </div>

                    <span class="form__subtitle">Банковские реквизиты:</span>
                    <div class="form__banking">
                        <my-input
                            v-model.trim="formData.bankCardData.number"
                            :nameId="3"
                            :req="true"
                            :placeHolder="'0000 0000 0000 0000'"
                            :clickButton="clickButton"
                            :data-error="dataError"
                            class="form__input"
                        >
                            Номер карты
                        </my-input>
                        <my-input
                            v-model.trim="formData.bankCardData.usessBefore"
                            :nameId="3"
                            :req="true"
                            :clickButton="clickButton"
                            :placeHolder="'01/26'"
                            :data-error="dataError"
                            class="form__input"
                        >
                            Карта действительна до
                        </my-input>
                    </div>

                    <my-checkbox
                        class="form__input"
                        v-model="formData.agreement"
                    >
                        Соглашение об обработке персональных данных
                    </my-checkbox>

                    <my-button
                        @click="sendOrder"
                        :hasAllData="true"
                        class="form__button"
                    >
                        Отправить
                    </my-button>
                </form>

                <my-preloader
                    v-else-if="isOrderSend === 'sending'"
                    class="check__data-send"
                />

                <span
                    class="check__data-send-message text"
                    v-else-if="isOrderSend === 'error'"
                    >Во время отправки данных произошёл сбой! Попробуйте оформить заказ заново.</span
                >
                <span
                    class="check__data-send-message text"
                    v-else-if="isOrderSend === 'success'"
                    >Заказ сформирован!</span
                >
            </transition-group>
        </div>
    </aside>
</template>

<script setup>
import { reactive, ref } from 'vue'
import MyCheckbox from '@/components/ui/MyCheckbox.vue'
import MyInput from '@/components/UI/MyInput.vue'

import { useCartStore } from '@/store/cart'
const cartStore = useCartStore()

const formData = reactive({
    name: '',
    birthDate: '',
    adress: {
        city: '',
        street: '',
        home: '',
    },
    bankCardData: {
        number: null,
        usessBefore: '',
    },
    agreement: false,
})

const isOrderSend = ref('false')
async function sendOrder() {
    isOrderSend.value = 'sending'

    try {
        await cartStore.sendBuyForm(formData)
        isOrderSend.value = 'success'
    } catch (e) {
        console.log('Ошибка в sendOrder', e)
        isOrderSend.value = 'error'
    }
}
</script>

<style lang="scss" scoped>
.buy-form {
    width: 100%;
    // .buy-form__content
    &__content {
    }
}
.form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    // .form__input
    &__input {
        margin-bottom: 20px;
    }
    // .form__subtitle
    &__subtitle {
        display: inline-block;
        margin-bottom: 10px;
    }

    // .form__adress
    &__adress {
    }

    // .form__banking
    &__banking {
    }

    // .form__input-label
    &__input-label {
    }

    // .form__button
    &__button {
        margin-top: 20px;
        width: 100%;
    }
}

.check {
    // .check__wrapp
    &__wrapp {
        background-color: $bgn;
        padding: 10% 9%;
    }

    // .check__data-send
    &__data-send {
        display: flex;
        justify-content: center;
        margin: 35px 0 20px;
    }

    // .check__data-send-message
    &__data-send-message {
    }

    // .check__text
    &__text {
        &_top {
            border-bottom: 1px solid $gray-txt;
            margin-bottom: 15px;
            padding-bottom: 25px;
        }

        &_button {
        }
    }

    // .check__title
    &__title {
        font-weight: 600;
        font-size: 2.4rem;
        line-height: 1.2;
        display: block;
        margin-bottom: 30px;
        font-weight: 500;
    }

    // .check__parametrs
    &__parametrs {
        font-weight: 500;
    }

    // .check__parametr-row
    &__parametr-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;

        &:last-child {
            margin-bottom: 0;
        }
    }

    // .check__info
    &__info {
        font-size: 1.6rem;
    }

    // .check__parametr
    &__parametr {
    }

    // .check__summ-of-all-goods-row
    &__summ-of-all-goods-row {
        margin-bottom: 25px;
        display: flex;
        justify-content: space-between;
    }

    // .check__text-summ
    &__text-summ {
        font-weight: 600;
        align-self: flex-end;
        height: 100%;
        display: block;
        margin-bottom: 4px;
        font-size: 1.8rem;
    }

    // .check__summ-amount-rub
    &__summ-amount-rub {
        font-family: $font-family-accent;
        font-weight: 700;
        font-size: 2.6rem;
        line-height: 1;
        align-self: flex-end;
    }

    // .check__buttons-row
    &__buttons-row {
    }

    // .check__btn-confirm
    &__btn {
        // .check__btn_confirm
        &_confirm {
            margin-bottom: 12px;
        }

        // .check__btn_buy-in-one-click
        &_buy-in-one-click {
            margin-bottom: 0;
        }
    }

    // .check__data-send-message
    &__data-send-message {
        font-size: 1.8rem;
        margin-top: 10px;
    }
}
</style>
