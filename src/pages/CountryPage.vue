<template>
  <div class="country-wrapper">
    <div class="country">
      <div class="country-header">
        <h2 class="country-title">{{ countryInfo?.commonName || '' }}</h2>
        <RouterLink to="/" class="country-link-home">Go back Home</RouterLink>
      </div>
      <div class="holidays-items">
        <div
          class="holidays-item"
          v-for="el in holidays"
          :key="el.name + el.date + el.types[0]">
          <p>{{ el.name }}</p>
          <p>{{ new Date(el.date).toLocaleDateString() }}</p>
          <p>{{ el.types[0] }}</p>
        </div>
      </div>
      <div class="years">
        <div
          class="year"
          v-for="(el, i) in years"
          :key="el"
          @click="() => (curYearInd = i)">
          <span class="year-text">{{ el }}</span>
        </div>
        <div
          class="year-selected"
          :style="{ left: curYearInd * 75.59 - 1 + 'px' }"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { CountryFullInfo, CountryHoliday } from '../interfaces';
import { useRoute } from 'vue-router';
import { years } from '../consts';

const route = useRoute();
const countryInfo = ref<CountryFullInfo>();
const curYearInd = ref<number>(
  years.findIndex(el => +el === new Date().getFullYear()),
);
const holidays = ref<CountryHoliday[]>([]);

onMounted(async () => {
  const countryRes = await fetch(
    `${import.meta.env.VITE_BASE_URL}/CountryInfo/${route.params.id}`,
  );
  const conutryData: CountryFullInfo = await countryRes.json();
  countryInfo.value = conutryData;
  fetchHolidays();
});

const fetchHolidays = async () => {
  const holidaysRes = await fetch(
    `${import.meta.env.VITE_BASE_URL}/PublicHolidays/${
      years[curYearInd.value]
    }/${route.params.id}`,
  );
  const holidaysData: CountryHoliday[] = await holidaysRes.json();
  holidays.value = holidaysData;
};

watch(curYearInd, () => {
  fetchHolidays();
});
</script>

<style scoped lang="scss">
.country {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1000px;
  width: 100%;
  margin: 30px 20px;
  &-wrapper {
    display: flex;
    justify-content: center;
    min-height: 100vh;
  }
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-weight: 400;
  }
  &-title {
    font-size: 20px;
  }
  &-link-home {
    text-decoration: none;
    color: #000000;
    &:hover {
      text-decoration: underline;
    }
  }
}
.years {
  display: flex;
  flex-wrap: wrap;
  margin-top: auto;
  position: relative;
}
.year {
  padding: 7px 20px;
  text-align: center;
  position: relative;
  cursor: pointer;
  &-text {
    position: relative;
    z-index: 3;
  }
  &::after {
    content: '';
    width: 1px;
    background-color: rgb(220, 220, 225);
    height: 18px;
    right: 0;
    display: flex;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
  }
  &-selected {
    position: absolute;
    left: 0;
    top: 0;
    width: 76.59px;
    height: 100%;
    background-color: rgb(234, 234, 239);
    border-radius: 7px;
    z-index: 2;
    transition: 0.3s;
  }
}
.holidays {
  &-items {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  &-item {
    display: flex;
    background-color: rgb(234, 234, 239);
    flex-direction: column;
    gap: 5px;
    padding: 10px 15px;
    border-radius: 12px;
    color: #000000;
    text-decoration: none;
  }
}
</style>
