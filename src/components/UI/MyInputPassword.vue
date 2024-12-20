<template>
        <div class="form__line">
            <label
            for="password"
            class="form__label"
            :class="{ 'form__label_req': isRequired }"
        >
            <slot></slot>
            </label>
            <input
                class="input"
                v-model="internalValue"
                :type="showPassword ? 'text' : 'password'"
                :placeholder="placeholder"
                :data-error="dataError"
                @focus="handleFocus"
                @blur="handleBlur"
                @keyup.enter="emit('submit')"
                name="password"
                id="password"
            />
            <button @click="togglePasswordVisibility" >
                <img
                    v-if="!showPassword"
                    src="@/assets/images/icons/eye.svg"
                    alt="Показать пароль"
                    class="input__svg-eye"
                />
                <img
                    v-else
                    src="@/assets/images/icons/eye-off.svg"
                    alt="Показать пароль"
                    class="input__svg-eye"
                />
            </button>
            <p
            v-if="dataError"
            class="form__error"
        >
            {{ dataError }}
        </p>
        </div>
    
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    placeholder: {
        type: String,
        required: false,
        default: 'Пароль'
    },
    isRequired: {
        type: Boolean,
        default: false,
    },
    dataError: {
        type: [String, Number],
        default: () => '',
    },
})

const emit = defineEmits(['focus', 'blur', 'submit'])
const internalValue = defineModel()

const showPassword = ref(false)

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value
}

</script>

<style lang="scss" scoped>

.input__svg-eye {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
}

.input {
    display: block;
    background: #fffefb;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    width: 100%;
    padding: 10px 16px;
    font-style: normal;
    font-weight: 400;
    font-size: 1.2rem;
    line-height: 1.5rem;
    color: #b4b4b4;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;

    &:focus {
        box-shadow: 1px 3px 8px rgba(0, 128, 0, 0.3);
    }

    &._focus {
        color: #3f3f3f;
    }

    &._error {
        border: 1px solid #ff8484;
    }
}
</style>
