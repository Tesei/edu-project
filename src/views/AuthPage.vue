<template>
    <div class="wrapper">
        <the-header>
			<template #title>Авторизация</template> 
			<template #undefined>&nbsp; </template> 
		</the-header>
        <main class="main">
            <div class="main__content _container auth">
                <form @submit.prevent="onSubmit">
                    <my-wrapper-ticket>
                        <template #header>
                            <h2 class="auth__title">Авторизация</h2>
                        </template>
                        <template #default>
                            <my-input
                                v-model.trim="login"
                                placeholder="Логин"
                                class="auth__input"
                                name="name"
                                :data-error="errors.login"
                            >Логин</my-input>
                            <my-input-password
                                v-model="password"
                                placeholder="Пароль"
                                class="auth__input"
                                :data-error="errors.password"
                            >Пароль</my-input-password>
                        </template>
                        <template #footer>
                            <my-button>Отправить</my-button>
                        </template>
                    </my-wrapper-ticket>
                </form>
            </div>
        </main>
    </div>
</template>

<script setup>
import TheHeader from '@/components/TheHeader.vue'
import MyWrapperTicket from '@/components/UI/MyWrapperTicket.vue'
import MyInputPassword from '@/components/UI/MyInputPassword.vue'
import MyInput from '@/components/UI/MyInput.vue'
import MyButton from '@/components/UI/MyButton.vue'
import { useUserStore } from '@/store/myUser'
const userStore = useUserStore()
import { useRouter } from 'vue-router'
const router = useRouter()

// Валидация
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { object, string } from 'zod'

const validationSchema = toTypedSchema(
    object({
        login: string({ message: 'Обязательное поле' }).default('1'),
        password: string({ message: 'Обязательное поле' }).default('1'),
    }),
)

const { handleSubmit, errors } = useForm({ validationSchema })
const { value: login } = useField('login')
const { value: password } = useField('password')

const onSubmit = handleSubmit((values) => {
    userStore.fetchLogIn(values)
    console.log('value',values)
    if(userStore.userAuthorized) router.push({ name: 'goods' })
})
</script>

<style lang="scss" scoped>
.auth {
    // .auth__title
    &__title {
        margin-bottom: 25px;
    }

    // .auth__input
    &__input {
        margin-bottom: 20px;
    }
}
</style>
