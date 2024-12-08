<template>
    <aside class="main__aside aside">
        <div class="aside__content">
            <form
                class="aside__form form"
                @submit.prevent
            >
                <div class="aside__forms">
                    <my-input
                        v-model.trim="post.title"
                        :nameId="1"
                        :req="true"
                        :clickButton="clickButton"
                        :placeHolder="placeholders[0]"
                        :data-error="dataError"
                        class="aside__forms-item"
                    >
                        Наименование товара
                    </my-input>

                    <my-textarea
                        v-model.trim="post.description"
                        :nameId="2"
                        :req="false"
                        :placeHolder="placeholders[1]"
                        :data-error="dataError"
                        class="aside__forms-item"
                    >
                        Описание товара
                    </my-textarea>

                    <my-input
                        v-model.trim="post.image"
                        :nameId="3"
                        :req="true"
                        :clickButton="clickButton"
                        :placeHolder="placeholders[2]"
                        :data-error="dataError"
                        :disabled="isStandartImage"
                        class="aside__forms-item"
                    >
                        Ссылка на изображение товара
                    </my-input>
                    <my-checkbox
                        class="aside__forms-checkbox"
                        v-model="isStandartImage"
                        >Применить стандартую картинку</my-checkbox
                    >

                    <my-input
                        v-model.trim="somePrice"
                        :nameId="4"
                        :req="true"
                        :clickButton="clickButton"
                        :placeHolder="placeholders[3]"
                        :data-error="dataError"
                        :oninpShow="true"
                        class="aside__forms-item"
                    >
                        Цена товара
                    </my-input>
                </div>

                <my-button
                    @click="createPost"
                    :hasAllData="checkAllData"
                    class="aside__button"
                >
                    Добавить товар
                </my-button>
            </form>
        </div>
    </aside>
</template>

<script setup>
import MyCheckbox from '@/components/UI/MyCheckbox.vue'
import MyInput from '@/components/UI/MyInput.vue'
import { reactive, ref, computed, watch, defineEmits } from 'vue'
import { useGoodsStore } from '@/store/goods.js'
const goodsStore = useGoodsStore()
const emit = defineEmits(['create'])

const placeholders = reactive(['Введите наименование товара', 'Введите описание товара', 'Введите ссылку', 'Введите цену'])
const dataError = ref('Поле является обязательным')
const isStandartImage = ref(false)

let post = reactive({
    title: '',
    description: '',
    image: '',
    price: '',
})
const somePrice = ref('')
const clickButton = ref(false)
function createPost() {
    let btnSend = document.querySelector('.aside__form .btn')
    if (btnSend.classList.contains('_active')) {
        post.id = Date.now()
        // Отправляем данные в родительский компонент:
        emit('create', post)
        // после отправки данных очищаем поля инпута:
        setTimeout(() => {
            post = {
                title: '',
                description: '',
                image: '',
                price: '',
            }
            somePrice.value = ''
            clickButton.value = false
        }, 300)
    } else clickButton.value = true
}
const checkAllData = computed(() => (post.title && post.image && post.price ? true : false))

watch(isStandartImage, (newValue) => {
    if (newValue) post.image = goodsStore.defaultImageLink
    else post.image = ''
})
watch(somePrice, (newPrice) => {
    post.price = newPrice.toLocaleString('ru-RU')
})
</script>

<style lang="scss" scoped>
.aside {
    background: #fffefb;
    box-shadow:
        0px 20px 30px rgba(0, 0, 0, 0.04),
        0px 6px 10px rgba(0, 0, 0, 0.02);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 332px;

    @media (max-width: $md2) {
        width: 252px;
    }

    @media (max-width: $md3) {
        width: 100%;
    }

    // .aside__content
    &__content {
        padding: 24px;
        width: 100%;
    }

    // .aside__form
    &__form {
        display: flex;
        flex-direction: column;
    }

    // .aside__forms
    &__forms {
        margin-bottom: 6px;
    }

    // .aside__forms-item
    &__forms-item {
        margin-bottom: 18px;
    }
    // .aside__forms-checkbox
    &__forms-checkbox {
        margin-bottom: 18px;
    }

    // .aside__button
    &__button {
    }
}
</style>
