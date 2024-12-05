<template>
  <header class="header">
    <div class="header__content _container">
      <div class="header__row">
        <div class="header__column">

          <the-bucket class="header__bucket-info"/>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import TheBucket from '@/components/TheBucket.vue'
</script>

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
  }
}

</style>
