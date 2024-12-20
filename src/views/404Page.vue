<template>
    <div class="wrapper">
        <the-header>
			<template #title>404</template> 
			<template #undefined>&nbsp; </template> 
		</the-header>
        <main class="main" style="text-align: center;">
            <span>Страница не найдена, 404</span>
        </main>
    </div>
</template>

<script setup>
import TheHeader from '@/components/TheHeader.vue'
</script>

<style lang="scss" scoped>
</style>
