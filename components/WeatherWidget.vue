<template>
    <div class="weather-widget">
        <div class="weather-widget__header">
            <h3>{{ title }}</h3>
            <GeoLocation 
                @set-geo-location="setGeoLocation"
                @error-geo-location="setGeoLocationError"
            />    
        </div>
        <span v-if="msgNotSearch">Данные о погоде отсутствуют.</span>
        <WeatherToday 
            v-if="!msgNotSearch"
            :obj=getWeatherToday
            :wind=getWeatherTodayWind
            :time=getWeatherTodayTime
            :weather=getTodayWeather
        />
        <WeatherFuture
            v-if="!msgNotSearch"
            :objects=getObjectsWeatherFuture
        />
    </div>
</template>
<script>
export default {
    name: 'WeatherWidget',
    props: {
        title: String,
    },
    data() {
        return {
            apikey: '942413ebea59a8737c45b14b8b9f2009',
            lat: '55.7504461',
            lon: '37.6174943',
            targetIndex: 0,
            showTargetList: false,
            msgNotSearch: false,
            weather: {
                data: {
                    data: {
                        main: null,
                        wind: null,
                        dt: null,
                        weather: [{

                        }],
                    },
                },
                error: null,                
            },
            weatherFuture: {
                data: {
                    data: [{
                        main: null,
                        wind: null,
                        dt: null,
                    }],
                },
                error: null,                
            },
        }
    },
    computed: {
        targetList: function() {
            return this.geoLocation.data.data
        },
        getTodayWeather: function() {
            return (typeof this.weather.data.data.weather[0] !== 'undefined') ? this.weather.data.data.weather[0] : null
        },        
        getWeatherToday: function() {
            return (typeof this.weather.data.data.main !== 'undefined') ? this.weather.data.data.main : null
        },
        getWeatherTodayWind: function() {
            return (typeof this.weather.data.data.wind !== 'undefined') ? this.weather.data.data.wind : null
        },
        getWeatherTodayTime: function() {
            return (typeof this.weather.data.data.dt !== 'undefined') ? this.weather.data.data.dt : null
        },
        getObjectsWeatherFuture: function() {
            const timeStart = Math.round(Date.now() / 1000)
            const timeFinish = timeStart + 259200
            const list = this.weatherFuture.data.data.list
            let array = []
            for (const key in list) 
                if ( Number(list[key].dt) >= timeStart && Number(list[key].dt) <= timeFinish) 
                    array.push(list[key])
            return array
        },            
    },
    methods: {
        setGeoLocationError: function($value) {
            this.msgNotSearch = $value
        },
        setGeoLocation: function($value) {
            this.lat = $value[0]
            this.lon = $value[1]
            this.getWeather()
            this.getWeatherFuture()
            this.msgNotSearch = false
        },
        selectTarget: function(key, value) {
            this.target = value
            this.targetIndex = key
            this.getWeather()
            this.getWeatherFuture()
            this.showTargetList = false
        },
        getLocation: function() {
            this.$weatherApi.get('http://api.openweathermap.org/geo/1.0/direct?q=' + this.target + '&limit=5&appid=' + this.apikey)
                .then(response => {
                    this.geoLocation.data = response
                })
                .catch(error => {
                    this.geoLocation.error = error
                    this.msgNotSearch = true
                    this.showTargetList = false
                })            
        },
        getWeather: function() {
            this.$weatherApi.get('https://api.openweathermap.org/data/2.5/weather?units=metric&lat=' + this.lat + '&lon=' + this.lon + '&appid='  + this.apikey)
                .then(response => {
                    this.weather.data = response
                })
                .catch(error => {
                    this.weather.error = error
                })              
        },
        getWeatherFuture: function() {
            this.$weatherApi.get('https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=' + this.lat + '&lon=' + this.lon + '&appid='  + this.apikey)
                .then(response => {
                    this.weatherFuture.data = response
                })
                .catch(error => {
                    this.weatherFuture.error = error
                })              
        },        
    },
    mounted() {
        this.getWeather()
        this.getWeatherFuture()
    },
    watch: {
    },
}
</script>
<style scoped>
.weather-widget {
    width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border: 1px solid #000;
    border-radius: 8px;
    padding: 5px;
}
.weather-widget__header {
    display: flex;
    justify-content: space-between;
    gap: 10px;
}
.weather-widget__header h3 {
    flex: 1;
    text-align: center;
}
</style>