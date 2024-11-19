<template>
    <TheHeader
        v-model:search-query-child="searchQuery"
        v-model:selected-sort-child="selectedSort"
    />

    <main class="main">
        <div class="main__content _container">
            <div class="main__row">
                <div class="main__column main__column_left">
                    <div class="main__column-left-contant">
                        <my-button
                            @click="openForm"
                            class="main__btn"
                            id
                            >{{ buttonFormOpenMessage ? 'Закрыть форму' : 'Открыть форму' }}
                        </my-button>
                        <my-dialog
                            :show="dialogVisible"
                            :showForm="animationDialog"
                        >
                            <post-form @create="createPost" />
                        </my-dialog>
                    </div>
                </div>

                <post-list
                    v-bind:posts="sortedAndSearchedPosts"
                    @remove="removePost"
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
    import axios from 'axios'

    const posts = ref([])

    const searchQuery = ref('')
    const selectedSort = ref('')

    onBeforeMount(async () => {
        try {
            let { data } = await axios.get('https://fakestoreapi.com/products')
            posts.value = data
                //         {
                //     "id": 1,
                //     "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
                //     "price": 109.95,
                //     "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
                //     "category": "men's clothing",
                //     "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
                //     "rating": {
                //         "rate": 3.9,
                //         "count": 120
                //     }
                // },
        } catch (error) {
            posts.value = [
                {
                    id: 1,
                    image: "https://tesei.github.io/sites/mockUp's/polaroid.jpg",
                    title: 'Наименование товара',
                    description: '3 Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
                    price: '10 000',
                },
                {
                    id: 2,
                    image: "https://tesei.github.io/sites/mockUp's/polaroid.jpg",
                    title: 'Наименование товара 2',
                    description: '2 Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
                    price: '12 000',
                },
                {
                    id: 3,
                    image: "https://tesei.github.io/sites/mockUp's/polaroid.jpg",
                    title: 'Наименование товара 3',
                    description: '1 Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
                    price: '13 000',
                },
                {
                    id: 4,
                    image: "https://tesei.github.io/sites/mockUp's/polaroid.jpg",
                    title: 'Наименование товара 4',
                    description: '4 Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
                    price: '14 000',
                },
                {
                    id: 5,
                    image: "https://tesei.github.io/sites/mockUp's/polaroid.jpg",
                    title: 'Наименование товара 4',
                    description: '4 Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
                    price: '14 000',
                },
                {
                    id: 6,
                    image: "https://tesei.github.io/sites/mockUp's/polaroid.jpg",
                    title: 'Наименование товара 4',
                    description: '4 Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
                    price: '14 000',
                },
                {
                    id: 7,
                    image: "https://tesei.github.io/sites/mockUp's/polaroid.jpg",
                    title: 'Наименование товара 4',
                    description: '4 Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
                    price: '14 000',
                },
                {
                    id: 8,
                    image: "https://tesei.github.io/sites/mockUp's/polaroid.jpg",
                    title: 'Наименование товара 4',
                    description: '4 Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
                    price: '14 000',
                },
            ]
        }
    })

    function createPost(post) {
        posts.value.push(post)
    }
    function removePost(post) {
        posts.value = posts.value.filter((p) => p.id !== post.id)
    }

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

    // todo доработать фильтрацию селекта
    const sortedPosts = computed(() => {
        if (selectedSort.value === 'price-from-max')
            return [...posts.value]
                .sort((post1, post2) => post1[selectedSort.value]?.localeCompare(post2[selectedSort.value]))
                .reverse()
        else return [...posts.value].sort((post1, post2) => post1[selectedSort.value]?.localeCompare(post2[selectedSort.value]))
    })

    const sortedAndSearchedPosts = computed(() => {
        return sortedPosts.value.filter((post) => post.title?.toLowerCase().includes(searchQuery.value.toLowerCase()))
    })
</script>

<style lang="scss" scoped>
    @use '@/styles/variables';
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
