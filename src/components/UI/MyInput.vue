<template>
    <div class="form__line">
        <label
            :for="uniqNumber"
            class="form__label"
            :class="{ form__label_req: req }"
        >
            <slot></slot>
        </label>

        <input
            v-if="oninpShow"
            type="text"
            class="input"
            :class="{ _req: req, _active: inputValue, _error: dataError }"
            v-model="inputValue"
            :id="uniqNumber"
            autocomplete="off"
            name="name"
            data-value=""
            :placeholder="placeholder"
            :data-error="dataError"
            :disabled="disabled"
        />
        <input
            v-else
            type="text"
            class="input"
            :class="{ _req: req, _active: inputValue, _error: dataError }"
            v-model="inputValue"
            :id="uniqNumber"
            autocomplete="off"
            name="name"
            data-value=""
            :placeholder="placeholder"
            :data-error="dataError"
            :disabled="disabled"
        />

        <p
            v-if="dataError"
            class="form__error"
        >
            {{ dataError }}
        </p>
    </div>
</template>

<script setup>
const uniqNumber = Math.random()
const props = defineProps({
    req: {
        type: Boolean,
        required: false,
        default: false,
    },
    placeholder: {
        type: [String, Number],
        default: () => '',
    },
    dataError: {
        type: [String, Number],
        default: () => '',
    },
    oninpShow: {
        type: [Boolean],
        default: false,
    },
    disabled: {
        type: [Boolean, String],
        default: false,
    },
    name: {
        type: String,
        default: '',
    },
})
const inputValue = defineModel()

</script>

<style lang="scss" scoped>
input[type='text'],
input[type='email'],
input[type='tel'],
textarea {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    &:focus {
        outline: none;
    }
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
