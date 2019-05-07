<template>
    <div id="mymap" style="height: 100%; display: flex;">
    
      <div id="map2"></div>
     
      <v-map  style="width: 60%;" ref="map" :zoom="zoom" :center="initialLocation" v-on:update:bounds="updateBounds($event)" v-on:ready="ready($event)"> 
        <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
        <div v-for="(data, index) in inMap(mapShops)">
          <l-marker :lat-lng="reversedGeo(data.geometry.coordinates)" @click="handleClick(index)" :ref="`mypopup${index}`">
            <l-popup :style="{ width: '350px' }" :options="{closeOnClick: false }">
              {{data.properties.Name}}
            <img v-if="details[index]" v-bind:src="details[index]" :style="{ 'max-width': '300px','max-height': '300px' }"  />    
            </l-popup>
          </l-marker>
        </div>
       
      </v-map>
      <div class="" style="width: 40%; display: flex; flex-direction: row; flex-wrap: wrap; overflow: auto; justify-content: space-evenly; padding: 30px; align-items: stretch;">
          <div class="cursor-pointer" v-for="(data, index) in inMap(mapShops)" @click="handleClick2(index)" style="margin: 5px; padding: 5px; max-width: 210px;  align-items: stretch; flex-grow: 1; " >  
                <div style="height: 100%;" class="max-w-sm rounded overflow-hidden shadow-lg">
                  <img class="w-full overflow-hidden" src="../assets/x.png" alt="Sunset in the mountains">
                  <div class="px-3 py-3">
                    <div class="font-bold text-xl mb-2">{{data.properties.Name}}</div>
                    <p class="text-grey-darker text-base">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                    </p>
                  </div>

                </div>
          </div>
      
      </div>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup, LControl } from "vue2-leaflet";
import { latLng, Icon, icon } from 'leaflet';
import shops from '../shops';
import * as VueGoogleMaps from 'vue2-google-maps';
import axios from 'axios';

export default {

  name: 'Mymap',
 
  components: {
    "v-map": LMap,
    "v-tilelayer": LTileLayer,
    'l-marker':LMarker,
    'l-popup':LPopup,
    'l-control': LControl,
  },
  data() {
    return {
      initialLocation: [42.3601, -71.0589],
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom: 13,
      markerLatLng: [42.3601, -71.0589],
      shopDatabase: shops.features,
      bounds: '',
      styleObject: {
        'background-color': 'white',
        fontSize: '13px',
        'z-index': '800',
        height: '400px',
        overflow: 'auto'
      },
      details: [],
      current_index:'',
      ran:''
    }
  },
  methods:
  {

    inMap(shops) {
        if (this.bounds)
        {
            shops = this.shopDatabase.filter((shop) => (
              this.bounds._northEast.lat > shop.geometry.coordinates[1] && 
              this.bounds._northEast.lng > shop.geometry.coordinates[0] &&
              this.bounds._southWest.lat < shop.geometry.coordinates[1] && 
              this.bounds._southWest.lng < shop.geometry.coordinates[0] 
            ));
        }
        return shops;
    },
    reversedGeo (coord) {
      return [coord[1], coord[0]]
    },
    updateBounds (e) {
      this.bounds = e;
    },
    ready (e) {
      this.bounds = this.$refs.map.mapObject.getBounds()
    },
    showpopup (e) {
     
      if (!this.ran ===1)
      {
         this.ran = 1
          e.target.openPop()
      }
     
    },

    testing(e)
    {

      console.log(e)
    },
    handleClick2(index)
    {
      this.current_index = index

      const current_shop = this.inMap(this.mapShops)[index]

      const newcenter=this.reversedGeo(current_shop.geometry.coordinates);
     // this.$refs['mypopup'+index][0].mapObject.panTo()

      this.$refs.map.mapObject.panTo(newcenter);
      this.zoom=13;
      this.$refs['mypopup'+index][0].mapObject.openPopup()
       var service;

        var request = {
          query: current_shop.properties.Name,
          fields: ['place_id', 'name', 'geometry'],
          locationBias: {lat: newcenter[0], lng: newcenter[1]}
        };

      this.center = newcenter;



        var service = new google.maps.places.PlacesService(document.createElement('div'));
      //  service.getDetails(request2, function(results, status) {
        service.findPlaceFromQuery(request, this.callback1);
    },


    handleClick(index)
    {
     // console.log('should not be at handleclick')
      this.current_index = index

      const current_shop = this.inMap(this.mapShops)[index]
      const newcenter=this.reversedGeo(current_shop.geometry.coordinates);
     //  this.$refs.map.mapObject.panTo(newcenter);
  //    this.$refs['mypopup'+index][0].mapObject.openPopup()
    //  this.$refs.mypopup[2].mapObject.openPopup()


    
  //    this.$set(this.initialLocation, 0, newcenter[0])
 
  //    this.$set(this.initialLocation, 1, newcenter[1])


      var service;

        var request = {
          query: current_shop.properties.Name,
          fields: ['place_id', 'name', 'geometry'],
          locationBias: {lat: newcenter[0], lng: newcenter[1]}
        };



        var service = new google.maps.places.PlacesService(document.createElement('div'));
      //  service.getDetails(request2, function(results, status) {
        service.findPlaceFromQuery(request, this.callback1);
    },

    callback1 (results, status){
              var request2 = {
               placeId: results[0].place_id,
               fields: ['name', 'geometry', 'url', 'photo']
                };
               var service = new google.maps.places.PlacesService(document.createElement('div'));
                service.getDetails(request2, this.callback2);
    },

    callback2 (results, status){


      if (results.photos)
      {
         const rand = Math.floor(Math.random() * results.photos.length); 
        this.$set(this.details, this.current_index, results.photos[rand].getUrl())
      }

    }



  },


  created() {
   
    this.mapShops = this.shopDatabase
  
  }
}
</script>

<style>
@import "~leaflet/dist/leaflet.css";
@import "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";
html,
body {
  height: 100%;
  margin: 0;
}
</style>
