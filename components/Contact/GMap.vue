<template>
        <div class="col-md-12 map mt-5">
            <GmapMap
                :center='center'
                :zoom='12'
                style='width:100%;  height: 450px;'
              >
                <GmapMarker
                  :key="index"
                  v-for="(m, index) in markers"
                  :position="m.position"
                  @click="center=m.position"
                />
              </GmapMap>
        </div>
</template>

<script>
export default {
    data () {
        return {
            markers: [],
            center: null,
        }
    },
    mounted() {
        this.center = { lat: 38.7223, lng: -9.1393 }
        this.markers.push({ position: this.center })
    }
}
</script>