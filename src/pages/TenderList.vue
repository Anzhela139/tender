<template>
    <div class="tender-list">
        <Transition name="list">
            <div class="container" v-if="(tenders && tenders.length) || transition">
                <h1>Tender list</h1>
                <SearchEl :list="tenders" />
                <PaginationEl 
                    @triggerTransition="handleTransition"
                    :list="tenders"
                    :count="count"
                    :limit="30"
                />
            </div>
        </Transition>
    </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import PaginationEl from './../components/PaginationEl'
import SearchEl from './../components/SearchEl'

const tenders = ref([])
const count = ref(0)
const transition = ref(false)

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
const handleTransition = () => {
    console.log('handleTransition')
    const temp = tenders.value;
    tenders.value = [];
    tenders.value = temp;
    // transition.value = false;
    // transition.value = true;
}
</script>


<style scoped lang="scss">

</style>