<template>
  <TheHeader
    v-model:search-query-child="searchQuery"
    v-model:selected-sort-child="selectedSort"
  />

  <main class="main">
    <div class="main__content _container">
      <div class="main__row">
        <div class="main__column main__column_left">
          <div class="main__column-left-contant">
            <my-button @click="openForm" class="main__btn">
              {{ buttonFormOpenMessage ? "Закрыть форму" : "Открыть форму" }}
            </my-button>
            <my-dialog :show="dialogVisible" :showForm="animationDialog">
              <post-form @create="goodsStore" />
            </my-dialog>
          </div>
        </div>

        <post-list
          :goodsList="sortedAndSearchedPosts"
          @remove="goodsStore"
          class="main__column main__column_right"
        />
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onBeforeMount } from "vue";
import TheHeader from "@/components/TheHeader.vue";
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import { useGoodsStore } from "@/store/goods.js";
const goodsStore = useGoodsStore();

const goodsList = computed(() => goodsStore.goods);

const searchQuery = ref("");
const selectedSort = ref("");

function createPost(item) {
  console.log("Привет2", item);
  // item.push(post)
}
function removePost(item) {
  console.log("Привет", item);

  // goods.value = item.filter((p) => p.id !== goods.id)
}

onBeforeMount(async () => {
  await goodsStore.fetchGoodsFromFakestore();
});

// открытие - закрытие формы и анимация
const dialogVisible = ref(true);
const animationDialog = ref(true);
const buttonFormOpenMessage = ref(true);
function openForm() {
  if (dialogVisible.value) {
    setTimeout(() => {
      dialogVisible.value = false;
    }, 400);
    animationDialog.value = buttonFormOpenMessage.value = false;
  } else {
    dialogVisible.value = animationDialog.value = buttonFormOpenMessage.value = true;
  }
}

// todo доработать фильтрацию селекта
const sortedPosts = computed(() => {
  if (selectedSort.value === "price-from-max")
    return [...goodsList.value]
      .sort((post1, post2) =>
        post1[selectedSort.value]?.localeCompare(post2[selectedSort.value])
      )
      .reverse();
  else
    return [...goodsList.value].sort((post1, post2) =>
      post1[selectedSort.value]?.localeCompare(post2[selectedSort.value])
    );
});

const sortedAndSearchedPosts = computed(() => {
  const serchText = searchQuery.value.toLowerCase();
  return sortedPosts.value.filter(
    (post) =>
      post.title?.toLowerCase().includes(serchText) ||
      post.description?.toLowerCase().includes(serchText) ||
      post.price?.toLowerCase().includes(serchText)
  );
});
</script>

<style lang="scss" scoped>
.main {
  // .main__content
  &__content {
  }

  // main__row
  &__row {
    position: relative;

    @media (min-width: $md3) {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
    }
  }

  // .main__column_left
  &__column_left {
    position: relative;
    flex: 0 0 332px;
    margin-right: 16px;

    @media (max-width: $md2) {
      flex: 0 0 252px;
    }

    @media (max-width: $md3) {
      margin: 0px 0px 16px 0px;
    }
  }

  // main__column-left-contant
  &__column-left-contant {
    @media (min-width: $md3) {
      position: fixed;
    }
  }

  // .main__column_right
  &__column_right {
    flex: 1 1 auto;
  }

  // .main__goods
  &__goods {
  }

  // .main__btn
  &__btn {
    margin-bottom: 25px !important;
    width: 332px;

    @media (max-width: $md2) {
      width: 252px;
    }

    @media (max-width: $md3) {
      width: 100%;
    }

    button.btn {
      color: #ffffff;
      background: #7bae73;
    }
  }
}
</style>
