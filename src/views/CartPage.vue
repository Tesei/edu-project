<template>
  <div class="wrapper">
    <header-bucket />

    <main class="main">
      <div class="main__content _container">
        <bucket-two-column />
      </div>
    </main>
    <footer class="footer">
      <div class="footer__content _container">
        <div class="footer__top">
          <h2 class="footer__title">Просмотренные товары</h2>
        </div>
        <div class="footer__bottom">
          <slider-viewed-goods />
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import BucketTwoColumn from "@/components/BucketTwoColumn.vue";
import SliderViewedGoods from "@/components/SliderViewedGoods.vue";
import HeaderBucket from "@/components/HeaderBucket.vue";
</script>

<style scoped lang="scss">
.wrapper {
}

.main {
  margin-bottom: 95px;

  // .main__content
  &__content {
  }
}

.footer {
  // .footer__content
  &__content {
    margin-bottom: 100px;
  }

  // .footer__top
  &__top {
    margin-bottom: 60px;
  }

  // .footer__title
  &__title {
    font-size: 3rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1.2;
  }

  // .footer__part-of-slider
  &__part-of-slider {
  }

  // .footer__bottom
  &__bottom {
  }
}
</style>
