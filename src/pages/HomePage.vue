<template>
  <div class="home-wrapper">
    <div class="home">
      <div class="home-countries-wrapper">
        <input
          type="text"
          class="home-search"
          placeholder="Search"
          v-model="searchVal"
        />
        <h2 class="home-title">Countries List</h2>
        <div class="home-countries">
          <RouterLink
            :to="`/country/${el.countryCode}`"
            class="home-country"
            v-for="el in countriesDataFiltered"
            :key="el.countryCode"
          >
            <span>{{ el.name }}</span>
          </RouterLink>
        </div>
      </div>
      <div class="home-random">
        <h2 class="home-random-title">Random Countries Widget</h2>
        <div class="home-random-items">
          <div
            class="home-random-item"
            v-for="el in randData"
            :key="el.countryCode"
          >
            <p>{{ el.countryName }}</p>
            <p>{{ el.name }}</p>
            <p>{{ new Date(el.date).toLocaleDateString() }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { CountryData, CountryHoliday } from '../interfaces'
import { RouterLink } from 'vue-router'

const countriesData = ref<CountryData[]>([])
const randData = ref<CountryHoliday[]>([])
const searchVal = ref<string>('')

const countriesDataFiltered = computed<CountryData[]>(() =>
  searchVal.value
    ? countriesData.value.filter((el) =>
        el.name.toLowerCase().includes(searchVal.value.toLowerCase())
      )
    : countriesData.value
)

onMounted(async () => {
  const res = await fetch(`${import.meta.env.VITE_BASE_URL}/AvailableCountries`)
  const data: CountryData[] = await res.json()
  countriesData.value = data
  const randNumbers = Array.from({ length: 3 }, () =>
    Math.floor(Math.random() * countriesData.value.length)
  )
  randNumbers.map(async (el) => {
    const randRes = await fetch(
      `${import.meta.env.VITE_BASE_URL}/NextPublicHolidays/${
        countriesData.value[el].countryCode
      }`
    )
    const randResData: CountryHoliday[] = await randRes.json()
    if (randResData.length) {
      randData.value.push({
        ...randResData[0],
        countryName: countriesData.value[el].name,
      })
    }
  })
})
</script>

<style scoped lang="scss">
.home {
  display: flex;
  gap: 20px;
  max-width: 1000px;
  width: 100%;
  margin: 30px 20px;
  &-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &-countries {
    &-wrapper {
      width: 40%;
      display: flex;
      flex-direction: column;
    }
  }
  &-search {
    display: flex;
    position: relative;
    padding: 7px 14px;
    border-radius: 10px;
    background-color: rgb(234, 234, 239);
    font-family: Arial, Helvetica, sans-serif;
    border: none;
    outline: none;
    font-size: 15px;
    &::placeholder {
      color: rgb(142, 142, 147);
    }
  }
  &-title {
    font-size: 18px;
    font-weight: 400;
    margin: 15px 0;
  }
  &-country {
    display: flex;
    background-color: rgb(234, 234, 239);
    justify-content: center;
    padding: 10px 0;
    border-radius: 12px;
    cursor: pointer;
    color: #000000;
    text-decoration: none;
  }
  &-countries {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  &-random {
    width: 100%;
    &-title {
      font-size: 18px;
      font-weight: 400;
      margin: 0 0 15px 0;
    }
  }
  &-random {
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
}
</style>
