<template>
  <li class="goods__item">
    <div class="goods__row">
      <div class="goods__image-wrap _ibg">
        <img :src="props.item.image" :alt="props.item.title" class="goods__image" />
      </div>
      <ul class="goods__text-about">
        <li class="goods__title text">{{ props.item.title }}</li>
        <li class="goods__parametrs text"> {{ props.item.description }}</li>
        <li class="goods__article text">Артикул: {{ props.item.id }}</li>
      </ul>
      <div class="goods__amount-btns btns">
        <div class="btns__row">
          <button class="btns__minus btns__cube" @click="cartStore.removeFromCartList(props.item)">-</button>
          <div class="btns__amount btns__cube">{{ count }}</div>
          <button class="btns__plus btns__cube" @click="cartStore.addToCartList(props.item)">+</button>
        </div>
        <div class="btns__price-of-bit" v-if="props.item.price">{{ priceItemWithSpace }} ₽/шт.</div>
      </div>
      <span class="goods__summ h3">{{ sum }} ₽</span>
      <div class="goods__delete">
        <img
          src="@/assets/images/icons/close.svg"
          alt="Удалить товар"
          class="goods__delete-image"
          @click="cartStore.cleanItemFromBucket(props.item)"
        />
      </div>
    </div>
  </li>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '@/store/cart'
const cartStore = useCartStore()

const props = defineProps({
    item: {
        type: Object,
        required: true,
    },
})
const count = computed(() => cartStore.cartList[props.item.title])
const sum = computed(() => {  
    let price = props.item.price
    if (typeof price === 'string') price = Number(price.replaceAll(' ', ''))
    return (count.value * price).toLocaleString('ru-RU')
})
const priceItemWithSpace = computed (() => {
    if (typeof props.item.price === 'number') return props.item.price.toLocaleString('ru-RU')
    else return props.item.price
})

</script>

<style scoped lang="scss">
.goods {
  // .goods__item
  &__item {
    border-bottom: 1px solid #c4c4c4;
    margin-right: 5px;

    &:last-child {
      border-bottom: none;
      margin-bottom: 24px;
    }
  }

  // .goods__row
  &__row {
    display: flex;
    padding: 20px 0 20px;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  // .goods__image-wrap
  &__image-wrap {
    position: relative;
    padding-right: 100px;
    padding-bottom: 100px;
    margin: 0 2.7% 0 15px;
  }

  // .goods__text-about
  &__text-about {
    margin-right: 10%;
    flex: 0 1 350px;
  }

  // .goods__title
  &__title {
    margin-bottom: 5px;
    font-size: 1.6rem;
  }

  // .goods__parametrs
  &__parametrs {
    margin-bottom: 5px;
    font-size: 1.2rem;
  }

  // .goods__article
  &__article {
    color: $gray-txt;
    font-size: 1.2rem;
  }

  // .goods__amount-btns
  &__amount-btns {
    flex: 1 1 auto;
    margin-right: 6%;
    position: relative;
  }

  // .goods__summ
  &__summ {
    margin-right: 35px;
    flex: 0 0 100px;
    font-weight: 500;
    font-family: $font-family-accent;
    text-align: right;
  }

  // .goods__delete
  &__delete {
    align-self: flex-start;
    cursor: pointer;
    position: relative;
    z-index: 2;

    @media (min-width: $md2) {
      &:hover {
        &::after {
          content: "";
          position: absolute;
          width: 30px;
          height: 30px;
          top: -8px;
          left: -8.5px;
          background-color: $grey-color-strong;
          z-index: 1;
          border-radius: 50%;
        }
      }
    }
  }

  // .goods__delete-image
  &__delete-image {
    position: relative;
    z-index: 2;
  }
}

.btns {
  // .btns__row
  &__row {
    display: flex;
    margin-bottom: 10px;
  }

  // .btns__minus
  &__minus {
    border-radius: 4px 0 0 4px;

    @media (min-width: $md2) {
      &:hover {
        background-color: $bgn-color-darken;
      }
    }
  }

  // .btns__amount
  &__amount {
    margin: 0 2px;
  }

  // .btns__plus
  &__plus {
    border-radius: 0 4px 4px 0;

    @media (min-width: $md2) {
      &:hover {
        background-color: $bgn-color-darken;
      }
    }
  }

  // .btns__cube
  &__cube {
    width: 34px;
    height: 34px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 1.5;
    text-align: center;
    background-color: $bgn;
    cursor: pointer;
    transition: all 0.2s ease 0s;
  }

  // .btns__price-of-bit
  &__price-of-bit {
    position: absolute;
    bottom: -20px;
    left: 50%;
    font-family: $font-family-accent;
    font-size: 1.2rem;
    white-space: nowrap;
    transform: translateX(-50%);
  }
}
</style>
