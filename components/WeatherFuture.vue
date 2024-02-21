<template>
    <div v-if="(objects !== null)" class="weather-future">
        <div :key="key" v-for="(object, key) in objects" class="weather-future__item">
            <span class="weather-future__date">{{ getDate(object) }} </span>
            <img :src="getIconWeather(object)" alt="">
            <span class="weather-future__temp">{{ Math.round(object.main.temp_max) }} ℃</span>
            <span class="weather-future__humidity">{{ object.main.humidity }}%</span>
            <span class="weather-future__wind-speed">{{ Math.round(object.wind.speed) }} м/с</span>            
        </div>

    </div>
</template>
<script>
export default {
    name: 'WeatherFuture',
    props: {
        objects: Object,
    },
    data() {
        return {
            iconUrl: 'http://openweathermap.org/img/wn/',
        }
    },
    methods: {
        getIconWeather: function(object) {
            return `${this.iconUrl}${object.weather[0].icon}.png`
        },
        getDate: function(object) {
            const time = object.dt * 1000
            const date = new Date(time)
            return date.toLocaleString()
        },
    },
}
</script>
<style scoped>
.weather-future {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding: 10px;
    overflow: auto;
    height: 160px;
}
.weather-future__item {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 10px;
}
.weather-future__temp {
    font-size: 18px;
    font-weight: bold;
}
.weather-future__wind-speed {
    font-size: 16px;
    color: blue;
}
.weather-future__humidity {
    font-size: 16px;
    color: blueviolet;
}
</style>