<template>
    <div v-if="(obj !== null && wind !== null)" class="weather-today">
        <span class="weather-today__date">Сегодня {{ getDate }}</span>
        <img :src="getIconWeather" alt="">
        <span class="weather-today__temp">{{ Math.round(obj.temp_max) }} ℃</span>
        <span class="weather-today__humidity">{{ obj.humidity }}%</span>
        <span class="weather-today__wind-speed">{{ Math.round(wind.speed) }} м/с</span>
    </div>
</template>
<script>
export default {
    props: {
        obj: Object,
        wind: Object,
        time: Number,
        weather: Object,
    },
    data() {
        return {
            iconUrl: 'http://openweathermap.org/img/wn/',
        }
    },
    computed: {
        getIconWeather: function() {
            return this.iconUrl + this.weather.icon + '.png'
        },
        getDate: function() {
            const time = this.time * 1000
            const date = new Date(time)
            return date.toLocaleDateString()
        },
    },
}
</script>
<style scoped>
.weather-today {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding: 10px;
}
.weather-today__temp {
    font-size: 18px;
    font-weight: bold;
}
.weather-today__wind-speed {
    font-size: 16px;
    color: blue;
}
.weather-today__humidity {
    font-size: 16px;
    color: blueviolet;
}
</style>