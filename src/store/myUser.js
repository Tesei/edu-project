import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'
import { useCartStore } from '@/store/cart.js'
const cartStore = useCartStore()
import VueCookies from 'vue-cookies'

export const useUserStore = defineStore(
    'myUser',
    () => {
        const jwtToken =
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MTgyMDQ1NDMsImp0aSI6ImY1YzhlMjhiLTljMzYtMTFlYi1hZDUwLTAwMjU5MDkyODk4YSIsImV0OTgzODAzNywiaXNzIjoibGueWFuZGV4LnJ1IiwidWlkIjoxMTQyMzQ1MTU4LCJsb2dpbiI6InluZHgtZWxlbmJhc2tha292YSIsInBzdWlkIjoiMS5BQWNPX2cuaDh6eFQxNGVRSFRMSURYd2s1d203dy50Uks4cIczJiVEp3IiwibmFtZSI6Ilx1MDQxNVx1MDQzYlx2MDQzNVx1MDQzZFx1MDQzMCBcdTA0MTFcdTA0MzBcdTA0NDFcdTA0M2FcdTA0MzBcdTA0M2FcdTA0M2VcdTA0MzJcdTA0MzAiLCJlbWFpbCI6InluZHgtZWxlbmJhc2tha292YUB5YW5kZXgucnUiLCJiaXJ0aGRheSI6IiIsImdlbmRlciI6bnVsbCwiZGlzcGxheV9uYW1lIjoieW5keC1lbGVuYmFza2Frb3ZhIiwiYXZhdGFyX2lkIjoiMC7wLTAifQ.O8NEvhJ0dI0OOnZSc7Bl-TvxZ1_JDrIpb7zYRW9Nzn'

        const usersPersonalData = reactive([
            {
                id: 'oneNum',
                status: 'administrator',
                name: 'Гудошников С.В.',
                city: 'Irkutsk',
                street: 'Leningradskaya',
                email: 'gud-stepan@mail.ru',
            },
        ])
        const getUsersPersonalData = computed(() => usersPersonalData.find((user) => user.id === 'oneNum'))
        const userAuthorized = ref(false)
        function fetchLogIn(data) {
            if (data.login === '1' && data.password === '1') {
                userAuthorized.value = true
                VueCookies.set('authToken', jwtToken)
            }
            cartStore.loadSavedUserData(usersPersonalData.id)
        }

        function fetchLogOut() {
            userAuthorized.value = false
            VueCookies.remove('authToken', jwtToken)
            cartStore.saveUserData(usersPersonalData.id)
        }

        return {
            userAuthorized,
            fetchLogIn,
            fetchLogOut,
            getUsersPersonalData,
        }
    },
    { persist: true },
)
