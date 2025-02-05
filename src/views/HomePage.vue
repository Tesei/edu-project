<template>
    <the-header
        @input-search="($event) => (searchQuery = $event)"
        @select-sort="($event) => (selectedSort = $event)"
    />

    <main class="main">
        <div class="main__content _container">
            <div class="main__row">
                <div class="main__column main__column_left">
                    <div class="main__column-left-contant">
                        <my-button
                            @click="openForm"
                            class="main__btn"
                        >
                            {{ buttonFormOpenMessage ? 'Закрыть форму' : 'Открыть форму' }}
                        </my-button>
                        <my-dialog
                            :show="dialogVisible"
                            :showForm="animationDialog"
                        >
                            <post-form />
                        </my-dialog>
                    </div>
                </div>

                <post-list
                    :goodsList="sortedAndSearchedPosts"
                    class="main__column main__column_right"
                />
            </div>
        </div>
    </main>
</template>

<script setup>
import { ref, computed, onBeforeMount } from 'vue'
import TheHeader from '@/components/TheHeader.vue'
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import MyButton from '@/components/UI/MyButton.vue'
import { useGoodsStore } from '@/store/goods.js'
const goodsStore = useGoodsStore()

onBeforeMount(async () => {
    if (useGoodsStore().goods.length === 0) await useGoodsStore().fetchGoodsFromFakestore()
})

// открытие - закрытие формы и анимация
const dialogVisible = ref(true)
const animationDialog = ref(true)
const buttonFormOpenMessage = ref(true)
function openForm() {
    if (dialogVisible.value) {
        setTimeout(() => {
            dialogVisible.value = false
        }, 400)
        animationDialog.value = buttonFormOpenMessage.value = false
    } else {
        dialogVisible.value = animationDialog.value = buttonFormOpenMessage.value = true
    }
}

const searchQuery = ref('')
const selectedSort = ref('')

const sortedPosts = computed(() => {
    if (selectedSort.value === 'price-from-max')
        return [...goodsStore.goodsList]
            .sort((post1, post2) => post1[selectedSort.value]?.localeCompare(post2[selectedSort.value]))
            .reverse()
    else
        return [...goodsStore.goodsList].sort((post1, post2) =>
            post1[selectedSort.value]?.localeCompare(post2[selectedSort.value]),
        )
})
// todo доработать фильтрацию селекта
// const getSortTrips = computed(() => {
//             if (sort.value === 'По убыванию') {
//                 return trips.value.sort((a, b) => {
//                     return new Date(b.startDate) - new Date(a.startDate)
//                 })
//             } else if (sort.value === 'По возрастанию') {
//                 return trips.value.sort((a, b) => {
//                     return new Date(a.startDate) - new Date(b.startDate)
//                 })
//             } else return trips.value
//         })

const sortedAndSearchedPosts = computed(() => {
    const serchText = searchQuery.value.toLowerCase()
    return sortedPosts.value.filter(
        (item) =>
            item.title?.toLowerCase().includes(serchText) ||
            item.description?.toLowerCase().includes(serchText) ||
            String(item).price?.toLowerCase().includes(serchText),
    )
})
</script>

<style lang="scss" scoped>
.main {
    // .main__content
    &__content {
    }

    // main__row
    &__row {
        position: relative;

        @media (min-width: $md3) {
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
        }
    }

    // .main__column_left
    &__column_left {
        position: relative;
        flex: 0 0 332px;
        margin-right: 16px;

        @media (max-width: $md2) {
            flex: 0 0 252px;
        }

        @media (max-width: $md3) {
            margin: 0px 0px 16px 0px;
        }
    }

    // main__column-left-contant
    &__column-left-contant {
        @media (min-width: $md3) {
            position: fixed;
        }
    }

    // .main__column_right
    &__column_right {
        flex: 1 1 auto;
    }

    // .main__goods
    &__goods {
    }

    // .main__btn
    &__btn {
        margin-bottom: 25px !important;
        width: 332px;

        @media (max-width: $md2) {
            width: 252px;
        }

        @media (max-width: $md3) {
            width: 100%;
        }

        button.btn {
            color: #ffffff;
            background: #7bae73;
        }
    }
}
</style>
