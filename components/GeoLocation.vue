<template>
    <div class="weather-widget__search">
        <input v-model="target" type="text" class="form-control" placeholder="Укажите город">
        <div v-if="showTargetList" class="weather-widget__target-list">
            <div 
                :key="key" 
                v-for="(item, key) in targetList" 
                @click="selectTarget(key, item.name)"
                class="weather-widget__target-item"
            >
                {{ item.name }}, {{ item.state }}
            </div>
        </div>
    </div> 
</template>
<script>
export default {
    name: 'GeoLocation',
    props: {},
    data() {
        return {
            apikey: '942413ebea59a8737c45b14b8b9f2009',
            target: 'Moscow',
            targetIndex: 0,
            showTargetList: false,
            geoLocation: {
                data: null,
                error: null,
            },
        }
    },
    computed: {
        targetList: function() {
            return this.geoLocation.data
        },
    },
    methods: {
        selectTarget: function(key, value) {
            this.target = value
            this.targetIndex = key
            let geo = []
            geo.push(this.geoLocation.data[key].lat)
            geo.push(this.geoLocation.data[key].lon)
            this.$emit('set-geo-location', geo)
            this.showTargetList = false
        },
        getLocation: function() {
            this.targetIndex = null
            this.$weatherApi.get('http://api.openweathermap.org/geo/1.0/direct?q=' + this.target + '&limit=5&appid=' + this.apikey)
                .then(response => {
                    this.geoLocation.data = response.data
                    if (Object.keys(this.geoLocation.data).length == 0) 
                        this.$emit('error-geo-location', true)
                })
                .catch(error => {
                    this.geoLocation.error = error
                    this.$emit('error-geo-location', true)             
                })            
        },
    },
    mounted() {
    },
    watch: {
        target() {
            this.getLocation()
        },
        targetIndex() {
            this.showTargetList = (this.targetIndex == null) ? true : false
        },
    },
}
</script>
<style scoped>
.weather-widget__search {
    flex: 1;
    position: relative;
}
.weather-widget__target-list {
    position: absolute;
    top: 38px;
    left: 0;
    width: 100%;
    max-height: 75px;
    overflow: auto;
    background-color: #fff;
    cursor: pointer;
}
.weather-widget__target-item {
    width: 100%;
    height: 25px;
    border-bottom: 1px solid #000;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.weather-widget__msgNotSearch {
    position: absolute;
    top: 38px;
    left: 0;
    width: 100%;
    color: brown;
}
</style>