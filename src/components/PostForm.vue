<template>
    <aside class="main__aside aside">
        <div class="aside__content">
            <form
                class="aside__form form"
                @submit.prevent="onSubmit"
            >
                <div class="aside__forms">
                    <my-input
                        v-model.trim="title"
                        :req="true"
                        :placeholder="'Введите наименование товара'"
                        :data-error="errors.title"
                        class="aside__forms-item"
                        data-testid="title"
                    >
                        Наименование товара
                    </my-input>

                    <my-textarea
                        v-model="description"
                        :req="false"
                        :placeholder="'Введите описание товара'"
                        :data-error="errors.description"
                        class="aside__forms-item"
                    >
                        Описание товара
                    </my-textarea>

                    <my-input
                        v-model.trim="image"
                        :req="true"
                        :placeholder="'Введите ссылку'"
                        :data-error="errors.image"
                        class="aside__forms-item"
                        data-testid="image-link"
                    >
                        Ссылка на изображение товара
                    </my-input>
                    <!-- <my-checkbox
                        class="aside__forms-checkbox"
                        v-model="isStandartImage"
                        >
                        Применить стандартую картинку
                    </my-checkbox> -->

                    <my-input
                        v-model.trim="price"
                        :req="true"
                        :placeholder="'Введите цену'"
                        :data-error="errors.price"
                        :oninpShow="true"
                        class="aside__forms-item"
                        data-testid="price"
                    >
                        Цена товара
                    </my-input>
                </div>

                <my-button
                    type="submit"
                    class="aside__button"
                >
                    Добавить товар
                </my-button>
            </form>
        </div>
    </aside>
</template>

<script setup>
import MyInput from '@/components/UI/MyInput.vue'
import MyTextarea from '@/components/UI/MyTextarea.vue'
import MyButton from '@/components/UI/MyButton.vue'
import { useGoodsStore } from '@/store/goods.js'
const goodsStore = useGoodsStore()
// Валидация
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { object, string, any } from 'zod'

const validationSchema = toTypedSchema(
    object({
        title: string().min(3, { message: 'Обязательное поле' }),
        description: any(),
        image: string({ message: 'Обязательное поле' }).default(goodsStore.defaultImageLink),
        price: string({ message: 'Ввести число' }),
    }),
)

const { handleSubmit, errors } = useForm({ validationSchema })
const { value: title } = useField('title')
const { value: description } = useField('description')
const { value: image } = useField('image')
const { value: price } = useField('price')

const onSubmit = handleSubmit((values) => {
    values.id = Date.now()
    goodsStore.createPost(values)
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
