<template>
  <aside class="main__aside aside">
    <div class="aside__content">
      <form class="aside__form form" @submit.prevent>
        <!-- <div class="aside__forms">
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
                        class="aside__forms-item"
                    >
                        Ссылка на изображение товара
                    </my-input>
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

                </div> -->

        <my-button @click="" :hasAllData="false" class="aside__button">
          Продолжить
        </my-button>
      </form>
    </div>
  </aside>
</template>

<script setup>
const props = defineProps({
  formData: {
    name: "",
    birthDate: "",
    adress: {
      city: "",
      street: "",
      home: "",
    },
    bankCardData: {
      number: null,
      usessBefore: "",
    },
    agreement: false,
  },
});
</script>

<style lang="scss" scoped>
.aside {
  background: #fffefb;
  box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04), 0px 6px 10px rgba(0, 0, 0, 0.02);
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

  // .aside__button
  &__button {
  }
}
</style>
