<template>
    <div class="form__line">
        <label
            :for="uniqNumber"
            class="form__label"
            :class="{ form__label_req: req }"
        >
            <slot></slot>
        </label>

        <textarea
            type="text"
            class="input"
            v-model="inputValue"
            :class="{ _req: req }"
            :id="uniqNumber"
            autocomplete="off"
            name="form[]"
            data-value=""
            :placeholder="placeholder"
            :data-error="dataError"
        >
        </textarea>
    </div>
</template>

<script setup>
const uniqNumber = Math.random()
const inputValue = defineModel({ required: true })

const props = defineProps({
    modelValue: [String, Number],
    req: {
        type: Boolean,
        required: true,
        default: () => false,
    },
    placeholder: {
        type: [String, Number],
        default: () => '',
    },
    dataError: {
        type: [String, Number],
        default: () => '',
    },
})
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

textarea.input {
    height: 108px;
    resize: none;
    padding: 10px 16px;
}
</style>
