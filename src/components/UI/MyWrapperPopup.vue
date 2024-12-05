<template>
  <div>
    <div class="ui-pop-up__wrapper" @click.self="$emit('close')">
      <div class="ui-pop-up__content">
        <div class="ui-pop-up__header">
          <div><slot name="header"></slot></div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            class="ui-pop-up__close-icon"
            v-if="hasCloseIcon"
            @click="$emit('close')"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.1785 9.99996L14.756 6.42246C15.0819 6.09663 15.0819 5.56996 14.756 5.24413C14.4302 4.9183 13.9035 4.9183 13.5777 5.24413L10.0002 8.82163L6.42271 5.24413C6.09687 4.9183 5.57021 4.9183 5.24437 5.24413C4.91854 5.56996 4.91854 6.09663 5.24437 6.42246L8.82187 9.99996L5.24437 13.5775C4.91854 13.9033 4.91854 14.43 5.24437 14.7558C5.40687 14.9183 5.62021 15 5.83354 15C6.04687 15 6.26021 14.9183 6.42271 14.7558L10.0002 11.1783L13.5777 14.7558C13.7402 14.9183 13.9535 15 14.1669 15C14.3802 15 14.5935 14.9183 14.756 14.7558C15.0819 14.43 15.0819 13.9033 14.756 13.5775L11.1785 9.99996Z"
              fill="currentColor"
            />
          </svg>
        </div>

        <div class="ui-pop-up__body">
          <slot name="default"></slot>
        </div>

        <div class="ui-pop-up__footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
Компонент-оболочка для создания окна поп апа в центре экрана.
* нажатие вне границ поп апа приводит к вызову эмита close
* пропс на наличие закрывающей иконки
* наполнение через слоты
*/
defineEmits(['close'])
const props = defineProps({
    hasCloseIcon: {
        type: Boolean,
        default: true,
    },
})

</script>

<style scoped lang="scss">
.ui-pop-up {
  // .ui-pop-up__wrapper
  &__wrapper {
    background: rgba(65, 65, 65, 0.7);
    height: 100%;
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 2000;
    
  }

  // .ui-pop-up__content
  &__content {
    background-color: white;
    border-radius: 16px;
    position: absolute;
    overflow: hidden;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-height: 90%;
    overflow-y: auto;
    padding: 24px;
  }

  // .ui-pop-up__header
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  // .ui-pop-up__close-icon
  &__close-icon {
    height: 32px;
    width: 32px;
    cursor: pointer;
    z-index: 2000;
    color: #000;
    transition: all 0.2s ease 0s;

    @media (min-width: $md2+px) {
      &:hover {
        transform: scale(1.15);
      }
    }
  }

  // .ui-pop-up__body
  &__body {
  }

  // .ui-pop-up__footer
  &__footer {
  }
}
</style>
