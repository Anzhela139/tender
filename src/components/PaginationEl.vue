<template>
    <div class="pagination">
        <Transition name="pagination">
            <div class="tender-list__container">
                <div class="tender-list__head" ref="head">
                    <div class="tender-list__cell">№</div>
                    <div class="tender-list__cell">Title</div>
                    <div class="tender-list__cell">Deadline</div>
                    <div class="tender-list__cell">Category</div>
                    <div class="tender-list__cell">Type</div>
                    <div class="tender-list__cell">Phase</div>
                </div>
                <div @click="linkHandler(tender.id)" v-for="tender, index in listToRender" :key="tender.id" class="tender-list__row">
                    <div class="tender-list__cell">{{ ((currentPage - 1) * props.limit) + index + 1 }}</div>
                    <div class="tender-list__cell">{{ tender.title }}</div>
                    <div class="tender-list__cell">{{ tender.deadline_date }}</div>
                    <div class="tender-list__cell">{{ tender.category }}</div>
                    <div class="tender-list__cell">{{ tender.type?.name }}</div>
                    <div class="tender-list__cell">{{ tender.phase }}</div>
                </div>
            </div>
        </Transition>
        <nav class="pagination-nav">
            <ul>
                <li v-for="pageNumber, index in pageNumbers" :key="pageNumber.id">
                    <span class="current" v-if="index + 1 === currentPage">{{ pageNumber.title }}</span>
                    <button type="button" @click="paginationLinkHandler(pageNumber.link)" class="btn pagination-link" v-else>{{ pageNumber.title }}</button>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, onMounted, watch  } from 'vue';
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const props = defineProps({
  list: Array,
  limit: Number,
  count: Number
})

const emit = defineEmits(["triggerTransition"])
const pageNumbers = ref([])
const listToRender = ref([])
const currentPage = ref(0)
const head = ref(null)

onMounted(() => {
    if (!route.query) {
        router.push({ name: 'tender-list', query: { page: 1 }})
    }
    currentPage.value = parseInt(route.query) || 1;
    const totalPages = Math.ceil(props.count / props.limit);

    for (let index = 0; index < totalPages; index++) {
        pageNumbers.value.push({
            title: index + 1,
            link: index + 1
        })
    }

    listToRender.value = props.list.slice(currentPage.value * props.limit, props.limit);
})

watch(currentPage, () => {
    const start = (currentPage.value - 1) * props.limit

    listToRender.value = props.list.slice(start, start + props.limit);
    head.value.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
})

const linkHandler = (id) => {
    router.push({ name: 'tender-detail', params: { id: id } })
}

const paginationLinkHandler = (link) => {
    router.push({ name: 'tender-list', query: { page: link }})
    currentPage.value = link;
    emit("triggerTransition")
}
</script>

<style scoped lang="scss">
.tender-list__container {
    display: grid;
    grid-template-columns: 1fr;
    position: relative;
}
.tender-list__head,
.tender-list__row {
    display: grid;
    grid-template-columns: 40px repeat(5, 1fr);
    border-bottom: 1px solid #42b983;
    text-decoration: none;

    .tender-list__cell {
        &:first-child {
            border-left: 1px solid #42b983;
        }
    }
}
.tender-list__head {
    border-top: 1px solid #42b983;
    position: sticky;
    top: 0;
    left: 0;
}
.tender-list__cell {
    padding: 12px 8px;
    border-right: 1px solid #42b983;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}

.pagination-nav {
    .current {
        background-color: #42b983;
        padding: 8px;
        border-radius: 50%;
        width: 16px;
        height: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
    }
    .pagination-link {
        padding: 0;
        background-color: transparent;
        box-shadow: none;
        color: #42b983;
    }
}
</style>