<template>
    <div class="search">
        <input ref="input" @input="handleChange"/>
        <ul v-if="results && results.length" class="search-list">
            <li v-for="result, index in results" @click="linkHandler(result.id)" :key="result.id">
               <span>{{ index + 1 }}.</span> <span>{{ result.title }}</span>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import { useRouter } from 'vue-router'
const props = defineProps({
  list: Array,
})

const router = useRouter()
const input = ref(null)
const results = ref([])

const handleChange = () => {
    const temp = props.list.filter((el) => {
        const title = el.title.toLowerCase();
        return title.includes(input.value.value)
    });
    results.value = temp;
}

const linkHandler = (id) => {
    router.push({ name: 'tender-detail', params: { id: id } })
}
</script>

<style scoped lang="scss">
.search {
    position: relative;
    z-index: 5;
    margin-bottom: 48px;
}
.search-list {
    position: absolute;
    top: 15px;
    left: 0;
    width: 576px;
    box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
    background-color: #fff;
    padding: 16px 36px;
    color: #42b983;
    cursor: pointer;
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 16px;

    li {
        display: grid;
        grid-template-columns: auto 1fr;
        column-gap: 12px;
    }
}
</style>