
<template>
    <div class="main__wrap">
        <div class="main__top">
            <span class="main__bread-crumbs h6">Главная <span class="_arrow"></span>
                <span class="_active">Корзина</span>
            </span>
        </div>
        <div class="main__body">
            <bucket-list-goods class="main__column main__column_left" />
            <bucket-finally-check class="main__column main__column_right" />
        </div>
    </div>
</template>


<script setup>
import BucketListGoods from "@/components/BucketListGoods.vue";
import BucketFinallyCheck from "@/components/BucketFinallyCheck.vue";

</script>


<style scoped lang="scss">
.main {

    // .main__wrap
    &__wrap {}

    // .main__top
    &__top {}

    // .main__bread-crumbs
    &__bread-crumbs {
        display: flex;
        align-items: center;
        cursor: pointer;
        margin-bottom: 50px;

        ._arrow {
            &::before {
                content: '\1F892';
            }

            font-size: 2.2rem;
            padding: 0 8px 0 10px;
            margin-bottom: 2px;
        }

        ._active {
            color: $gray-txt;
        }
    }

    // .main__body
    &__body {
        display: flex;
        align-items: flex-start;
        margin-bottom: 95px;
    }

    // main__column_left
    &__column_left {
        flex: 1 1 auto;
    }

    // main__column_right
    &__column_right {
        flex: 0 0 425px;
        align-self: center;
    }
}
</style>