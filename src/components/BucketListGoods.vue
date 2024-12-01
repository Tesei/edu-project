<template>
    <div class="main__bucket-list-goods">
        <div class="main__text">
            <div class="main__text-left-side">
                <h1 class="main__title">Ваша корзина</h1>
                <span class="main__amount-of-goods"> количе товара</span>
            </div>
            <div class="main__text-right-side">
                <button
                    class="main__clear-bucket"
                    @click="clearBucket"
                >
                    Очистить корзину
                </button>
            </div>
        </div>

        <div
            class="main__goods-wrap"
            v-if="amountGoods && goodsForBuy"
        >
            <ul class="main__goods-items goods">
                <transition-group name="post-list">
                    <bucket-list-goods-item
                        v-for="item in goodsForBuy"
                        :item="item"
                        :key="item.id"
                    />
                </transition-group>
            </ul>
            <div class="main__installation installation">
                <input
                    id="installationCheck"
                    class="installation__check-input"
                    type="checkbox"
                    value="true"
                    v-model="$store.state.needInstallation"
                    @change="changeInstallStatus"
                />
                <label
                    class="installation__check-label"
                    for="installationCheck"
                ></label>

                <div class="installation__image-wrap">
                    <img
                        src="@/assets/images/icons/tools.svg"
                        alt="installation"
                        class="installation__image"
                    />
                </div>
                <div class="installation__text">
                    <span class="installation__title">Установка</span>
                    <span class="installation__about"
                        >Отметьте, если Вам необходима консультация профессионала по монтажу выбранных товаров.</span
                    >
                </div>
            </div>
        </div>
        <my-preloader
            v-else-if="dataDownloading"
            class="main__goods-preloader"
        />
        <span
            class="main__goods-wrap-without-goods h2"
            v-else
            >В корзине нет товаров</span
        >
    </div>
</template>

<script setup>
    import BucketListGoodsItem from '@/components/BucketListGoodsItem'
</script>

<style scoped lang="scss">
    .main {
        // .main__bucket-list-goods
        &__bucket-list-goods {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-right: 55px;
        }

        // .main__text
        &__text {
            display: flex;
            justify-content: space-between;
            width: 100%;
            margin-bottom: 25px;
        }

        // .main__text-left-side
        &__text-left-side {
            display: flex;
            align-items: flex-end;
        }

        // .main__title
        &__title {
            font-weight: 700;
            font-size: 4rem;
            line-height: 1.2;
            margin-right: 27px;
            margin-bottom: -7px;
            letter-spacing: 0.5px;
        }

        // .main__amount-of-goods
        &__amount-of-goods {
            color: $gray-txt;
            font-size: 1.6rem;
        }

        // .main__text-right-side
        &__text-right-side {
            align-self: flex-end;
        }

        // .main__clear-bucket
        &__clear-bucket {
            color: $gray-txt;
            position: relative;
            cursor: pointer;

            &::before {
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                border-bottom: 1.5px solid $gray-txt;
            }

            @media (min-width: $md2) {
                &:hover {
                    color: lighten($gray-txt, 15%);

                    &::before {
                        border-bottom: 1.5px solid lighten($gray-txt, 15%);
                    }
                }
            }
        }

        // .main__goods-items
        &__goods-items {
            width: 100%;
        }

        // .main__installation
        &__installation {
            display: flex;
            align-items: center;
            border-radius: 5px;
            background-color: $bgn;
            padding: 25px;
            width: 100%;
        }

        // .main__goods-wrap
        &__goods-wrap {
            width: 100%;
        }

        // main__goods-wrap-without-goods
        &__goods-wrap-without-goods {
            font-size: 2rem;
        }
    }

    .goods-image {
    }

    .installation {
        // .installation__check-label
        &__check-label {
            cursor: pointer;
            position: relative;
            width: 19px;
            height: 19px;
            border: 1px solid $gray-txt;
            border-radius: 2px;
            background-color: $white;
            box-shadow: inset 2px 2px 1px rgba(0, 0, 0, 0.08);
            transition: all 0.2s ease 0s;
        }

        // .installation__check-input
        &__check-input {
            position: relative;
            z-index: -1;
            opacity: 0;

            &:checked + .installation__check-label::after {
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                background-color: $blue;
                border: 1px solid $white;
            }
        }

        // .installation__image-wrap
        &__image-wrap {
            border-radius: 4px;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: $white;
            margin: 0 20px;
        }

        // .installation__image
        &__image {
            width: 27px;
            height: 27px;
        }

        // .installation__text
        &__text {
            align-self: flex-start;
        }

        // .installation__title
        &__title {
            font-weight: 600;
            margin-bottom: 5px;
            font-size: 1.6rem;
            display: block;
        }

        // .installation__about
        &__about {
            color: $gray-txt;
            line-height: 1.5;
            font-size: 1.3rem;
        }
    }

    .post-list-item {
        display: inline-block;
        margin-right: 10px;
    }

    .post-list-enter-active,
    .post-list-leave-active {
        transition: all 0.4s ease;
    }

    .post-list-enter-from,
    .post-list-leave-to {
        opacity: 0;
        transform: translateX(-130px);
    }
</style>
