<template>
  <div class="tender-detail ">
    <Transition name="detail">
      <div class="container" v-if="tender && loaded">
        <button type="button" class="btn" @click="linkHandler">Go back</button>
        <h1>Tender Detail</h1>
        <div class="tender-detail__container">
          <div class="tender-detail__name">Title</div>
          <div class="tender-detail__value">{{ tender.title }}</div>
          <div class="tender-detail__name">Deadline</div>
          <div class="tender-detail__value">{{ tender.deadline_date }}</div>
          <div class="tender-detail__name">Category</div>
          <div class="tender-detail__value">{{ tender.category }}</div>
          <div class="tender-detail__name">Type</div>
          <div class="tender-detail__value">{{ tender.type }}</div>
          <div class="tender-detail__name">Phase</div>
          <div class="tender-detail__value">{{ tender.phase }}</div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router'
interface Tender {
  title: string
  deadline_date: string
  category: string,
  type: object
  phase: string
}
const emptyTender = {
  title: '',
  deadline_date: '',
  category: '',
  type: {},
  phase: ''
}
const router = useRouter()
const linkHandler = () => {
  router.push({ name: 'tender-list' })
}

const tender = ref<Tender>(emptyTender)
const loaded = ref(false)

onBeforeMount(async () => {
  fetch('https://api.test-webest.ru/element/?id=1')
    .then(async (res) => {
      const data = await res.json();

      console.log(data)

      tender.value = data
      loaded.value = true
    })
    .catch((err) => console.log(err));
});
</script>

<style scoped lang="scss">
.tender-detail__container {
  display: grid;
  grid-template-columns: auto 1fr;
  text-align: left;
  column-gap: 36px;
}

.tender-detail__name {
  font-weight: 600;
}

.tender-detail__value {
  font-weight: 400;
}
</style>