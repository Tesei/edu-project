<template>
    <div class="main__bucket-finally-check check">
        <div class="check__wrapp">
            <div class="check__data">
                <div class="check__text check__text_top">
                    <span class="check__title h2">Итого</span>
                    <ul class="check__parametrs">
                        <li class="check__parametr-row row-1">
                            <span class="check__info text">Стоимость товаров</span>
                            <div class="check__parametr">{{ totalSumOfGoodsWithSpace }} ₽</div>
                        </li>
                        <li class="check__parametr-row row-2">
                            <span class="check__info text">Количество</span>
                            <div class="check__parametr">{{ cartStore.getCountOfGoodsItems }} шт</div>
                        </li>
                        <li class="check__parametr-row row-3">
                            <span class="check__info text">Необходима доставка</span>
                            <span
                                v-if="hasDeliveryFrom"
                                class="check__parametr"
                            >
                                Да
                            </span>
                            <span
                                v-else
                                class="check__parametr"
                            >
                                Нет
                            </span>
                        </li>
                    </ul>
                </div>
                <div class="check__text check__text_button">
                    <div class="check__summ-of-all-goods-row">
                        <span class="check__text-summ text">Сумма заказа</span>
                        <div class="check__summ-amount-rub">{{ totalSumOfGoodsAndServiceWithSpace }} ₽</div>
                    </div>
                </div>
                <div class="check__buttons-row">
                    <my-button
                        class="btn check__btn check__btn_confirm"
                        :hasAllData="cartStore.getCountOfGoodsNames > 0"
                        @click="cartStore.changeVisibleClientForm"
                        >Оформить заказ</my-button
                    >
                    <!-- <my-button class="btn btn_color-reverse check__btn check__btn_buy-in-one-click"> Купить в 1 клик </my-button> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '@/store/cart'
const cartStore = useCartStore()
const totalSumOfGoodsWithSpace = computed(() => {
    return cartStore.getTotalSumOfGoods.toLocaleString('ru-RU')
})
const totalSumOfGoodsAndServiceWithSpace = computed(() => {
    return cartStore.getTotalSumOfGoodsAndService.toLocaleString('ru-RU')
})
const hasDeliveryFrom = computed(() => {
    return cartStore.hasDelivery
})
</script>

<style scoped lang="scss">
.main {
    // .main__bucket-finally-check
    &__bucket-finally-check {
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

.check__data-send-message-anination-item {
    display: inline-block;
    margin-right: 10px;
}

.check__data-send-message-anination-enter-active,
.check__data-send-message-anination-leave-active {
    transition: all 0.4s ease;
}

.check__data-send-message-anination-enter-from,
.check__data-send-message-anination-leave-to {
    opacity: 0;
    transform: translateX(130px);
}
</style>
