<template>
    <div class="tender-list container">
        <h1>Tender list</h1>
        <Transition name="list" >
            <PaginationEl 
                v-if="tenders && tenders.length"
                :list="tenders"
                :count="count"
                :limit="30"
            />
        </Transition>
    </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import PaginationEl from './../components/PaginationEl'

const tenders = ref([])
const count = ref(0)

onBeforeMount(async () => {
    fetch('https://api.test-webest.ru/list/?page=2')
    .then(async (res) => {
        const data = await res.json();

        console.log(data)

        tenders.value = data?.data
        count.value = data?.page_size
    })
    .catch((err) => console.log(err));

});
</script>


<style scoped lang="scss">

</style>