<template>
    <aside class="buy-form">
        <div class="buy-form__content">
            <transition-group name="check__data-send-message-anination">
                <form
                    class="buy-form form"
                    @submit.prevent="onSubmit"
                    v-if="isOrderSend === 'false'"
                >
                    <my-input
                        v-model.trim="name"
                        :req="true"
                        :placeHolder="'Фамилия Имя Отчество'"
                        :data-error="errors.name"
                        class="form__input"
                    >
                        Введите ваше ФИО
                    </my-input>

                    <my-input-date
                        v-model.trim="birthDate"
                        :req="false"
                        :data-error="errors.birthDate"
                        class="form__input"
                    >
                        Дата рождения
                    </my-input-date>

                    <my-input
                        name="email"
                        v-model.trim="email"
                        type="email"
                        :req="true"
                        :placeHolder="'e-mail'"
                        :data-error="errors.email"
                        class="form__input"
                    >
                        Электронная почта
                    </my-input>

                    <div
                        class="form__adress"
                        v-show="cartStore.hasDelivery"
                    >
                        <span class="form__subtitle">Адрес:</span>
                        <my-input
                            v-model.trim="city"
                            :req="true"
                            :placeHolder="'Город'"
                            :data-error="errors.city"
                            class="form__input"
                        >
                            Город
                        </my-input>
                        <my-input
                            v-model.trim="street"
                            :req="true"
                            :placeHolder="'Улица'"
                            :data-error="errors.street"
                            class="form__input"
                        >
                            Улица
                        </my-input>
                        <my-input
                            v-model.trim="building"
                            :req="true"
                            :placeHolder="'2'"
                            :data-error="errors.building"
                            class="form__input"
                        >
                            Номер дома
                        </my-input>
                    </div>

                    <span class="form__subtitle">Банковские реквизиты:</span>
                    <div class="form__banking">
                        <my-input
                            v-model.trim="bankCardNumber"
                            :req="true"
                            :placeHolder="'0000 0000 0000 0000'"
                            :data-error="errors.bankCardNumber"
                            class="form__input"
                        >
                            Номер карты
                        </my-input>
                        <my-input
                            v-model.trim="bankCardUsessBefore"
                            :req="true"
                            :placeHolder="'01/26'"
                            :data-error="errors.bankCardUsessBefore"
                            class="form__input"
                        >
                            Карта действительна до
                        </my-input>
                    </div>

                    <my-checkbox
                        class="form__input"
                        v-model="agreement"
						:error="errors.agreement"
                    >
                        Соглашение об обработке персональных данных
                    </my-checkbox>

                    <my-button
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
import { ref } from 'vue'
import MyCheckbox from '@/components/ui/MyCheckbox.vue'
import MyInput from '@/components/UI/MyInput.vue'
import MyInputDate from '@/components/UI/MyInputDate.vue'

import { useCartStore } from '@/store/cart'
const cartStore = useCartStore()
//===============================================================

import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { object, string, boolean, any } from 'zod'
// import * as zod from 'zod'

let deliveryCheck = cartStore.hasDelivery ? string({ message: 'Обязательное поле' }) : any()

const validationSchema = toTypedSchema(
    object({
        email: string({ message: 'Обязательное поле' }).email({ message: 'Нужен корректный email' }).default('something@email.com'),
        name: string({ message: 'Обязательное поле' }).min(1, { message: 'Обязательное поле' }),
        birthDate: string({ message: 'Обязательное поле' }).date(),
        city: deliveryCheck,
        street: deliveryCheck,
        building: deliveryCheck,
        agreement: boolean(),
        bankCardNumber: string({ message: 'Обязательное поле' }).min(10, { message: 'Минимум 10 символов' }),
        bankCardUsessBefore: string({ message: 'Обязательное поле' }).min(5, { message: 'Нужно 5 символов' }),
        // password: zod.string().min(1, { message: 'This is required' }).min(8, { message: 'Too short' }),
    }),
)

const { handleSubmit, errors } = useForm({ validationSchema })

const { value: email } = useField('email', {validateOnModelUpdate: false})
// const { value: password } = useField('password')
const { value: name } = useField('name')

const { value: birthDate } = useField('birthDate')
const { value: city } = useField('city')
const { value: street } = useField('street')
const { value: building } = useField('building')
const { value: bankCardNumber } = useField('bankCardNumber')
const { value: bankCardUsessBefore } = useField('bankCardUsessBefore')
const { value: agreement } = useField('agreement')

const onSubmit = handleSubmit((values) => {
    // alert(JSON.stringify(values, null, 2))
    sendOrder(values)
})
// ====================================================
// Для приведения к стандарту числа карты банка
// const r = /\b(?:\d{4}[ -]?){3}(?=\d{4}\b)/gm
// const subst = '**** **** **** '

// console.log(cardNumber.replace(r, subst))
//===============================================================
// Для одного поля
// const fieldSchema = toTypedSchema(
//   zod.string().min(1, { message: 'Обязательное поле' }).email({ message: 'нужен корректный email' })
// )
// const { value, errorMessage } = useField('email', fieldSchema)
//===============================================================

const isOrderSend = ref('false')
async function sendOrder(data) {
    isOrderSend.value = 'sending'

    try {
        await cartStore.sendBuyForm(data)
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
