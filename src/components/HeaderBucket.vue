<template>
  <header class="header">
    <div class="header__content _container">
      <div class="header__row">
        <div class="header__column">
          <div class="header__bucket-info info-bucket">
            <div class="info-bucket__row">
              <div class="info-bucket__image-wrap">
                <img
                  src="@/assets/images/icons/bucket3.svg"
                  alt="корзина товаров"
                  class="info-bucket__image"
                />
              </div>
              <div class="info-bucket__text">
                <span class="info-bucket__title">Ваша корзина</span>
                <span class="info-bucket__amount-of-goods"
                  >{{ 0 }}
                  товара
                </span>
                <span class="info-bucket__summ-of-goods text">{{ 0 }} ₽</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup></script>

<style scoped lang="scss">
.header {
  margin-bottom: 20px;

  // .header__content
  &__content {
  }

  // .header__row
  &__row {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
  }

  // .header__column
  &__column {
  }

  // .header__bucket-info
  &__bucket-info {
    margin: 19px 0 25px;
    cursor: pointer;
  }
}

.info-bucket {
  // .info-bucket__row
  &__row {
    display: flex;
    height: 100%;
    margin-right: 2px;
  }

  // .info-bucket__image-wrap
  &__image-wrap {
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  // .info-bucket__image
  &__image {
    margin: 10px;
    width: 32px;
    height: 32px;
  }

  // .info-bucket__text
  &__text {
  }

  // .info-bucket__title
  &__title {
    display: block;
    line-height: 1.2;
    font-size: 1.4rem;
  }

  // .info-bucket__amount-of-goods
  &__amount-of-goods {
    color: $gray-txt;
    display: block;
    line-height: 1.2;
    font-size: 1.2rem;
  }

  // .info-bucket__summ-of-goods
  &__summ-of-goods {
    font-size: 1.2rem;
  }
}
</style>
