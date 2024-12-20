<template>
    <div>
        <div class="ui-login__wrapper">
            <div
                class="ui-login__content"
            >
                <div
                    class="ui-login__header"
                >
                    <slot name="header"></slot>
                </div>

                <div class="ui-login__body">
                    <slot name="default"></slot>
                </div>

                <div class="ui-login__footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

/**
Компонент-оболочка для создания окна с границами в центре экрана.
* наполнение через слоты
*/
</script>

<style scoped lang="scss">
.ui-login {
    // .ui-login__wrapper
    &__wrapper {
        
    }

    // .ui-login__content
    &__content {
        background-color: #fff;
        width: 100%;
        max-width: 570px;
        margin: 80px auto;
        padding: 24px;
        border-radius: 16px;
        border: 1px solid gray;
    }

    // .ui-login__header
    &__header {
    }

    // .ui-login__body
    &__body {
    }

    // .ui-login__footer
    &__footer {
    }
}

// .ui-contragent
.ui-contragent {
    // .ui-contragent__content
    &__content {
        max-width: 100%;
        margin: 40px auto 0 auto;
        // .ui-contragent__content_header
        &_header {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
        }
    }
}
.full-width {
    max-width: 100%;
}
</style>
