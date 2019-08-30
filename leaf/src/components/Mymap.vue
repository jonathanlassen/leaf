<template>
    <div id="mymap" style="height: 90%; display: flex;">

      <div id="map2"></div>
     
      <v-map  style="width: 60%;" ref="map" :zoom="zoom" :center="initialLocation" v-on:update:bounds="updateBounds($event)" v-on:ready="ready($event)"> 
        <v-tilelayer url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png"></v-tilelayer>
  <l-marker-cluster :options="clusterOptions" @clusterclick="click()"  ref="clusterRef">

        <div v-for="(data, index) in inMap(mapShops)"> 
      
          <l-marker :lat-lng="reversedGeo(data.geometry.coordinates)" @click="handleClick(data.id)" cd .>
            <l-popup :style="{ width: '350px' }" :options="{ closeOnClick: false, autoPanPadding: 0 }">
             <span> {{data.properties.Name}}</span>
            <img v-if="details[data.id]" v-bind:src="details[data.id]" :style="{ 'max-width': '200px','max-height': '200px' }"  />    
            </l-popup>
             <l-tooltip> {{data.properties.Name}}</l-tooltip>
          </l-marker>
       
        </div>
        </l-marker-cluster>
      </v-map>
     
        
           <div v-if="view_single" style="width: 40%; display: flex; flex-direction: row; flex-wrap: wrap; overflow: auto; justify-content: space-evenly; padding: 30px; align-items: stretch;">
              <div class="rounded overflow-hidden shadow-lg">

                  <div class="px-3 py-3">
                  <img class="w-full overflow-hidden" :src="randomImage(showing_shop.id)" alt="" style="object-fit: cover; object-position: 100% 0; max-height: 400px;" >
                    <div class="font-bold text-l mb-2">{{showing_shop.properties.Name}}</div>
                    <p v-if="showing_shop.properties.Zip" class="text-grey-darker text-sm">
                     {{showing_shop.properties.Zip}}
                    </p>
                    <p v-if="!showing_shop.properties.Zip" class="text-grey-darker text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                    </p>
                    <div>
                      (978) 213-8369
                    </div>
                    <div>
                      1258 Gorham St.
                      Lowell, MA 01852
                    </div>
                    <div>
                  
                    </div>
                    <viewer :images="shopimages">
                      <img v-for="src in shopimages" :src="imgCompute(src)" :key="src" class='image' style="max-width: 50px; max-height: 50px; object-fit: cover">
                    </viewer>

                  <div v-if="user && !user.shop_id"> 
                       <router-link :to="{ name: 'claim', params: { id: showing_shop.id }}">  <a class="inline-block text-sm px-4 py-2 leading-none border rounded hover:border-transparent hover:text-blue hover:bg-white mt-4 mr-2 lg:mt-0">CLAIM</a></router-link></div>
                  </div>
                 
              </div>
               <button @click="closeShopView()">close</button>
          </div>



           <div v-if="!view_single" style="width: 40%; display: flex; flex-direction: row; flex-wrap: wrap; overflow: auto; justify-content: space-evenly; padding: 30px; align-items: stretch;">
              <div v-for="(data, index) in Max40(inMap(mapShops))" class="p-3 h-96 xl:w-1/2 lg:w-full rounded overflow-hidden shadow-lg">
                 
                  <img class=" h-32 w-full overflow-hidden" :src="randomImage(data.id)" alt="" style="object-fit: cover; object-position: 100% 0; max-height: 300px;" >
                    <div class="font-bold text-l mb-2">{{data.properties.Name}}</div>
                    <p v-if="data.properties.Zip" class="text-grey-darker text-sm">
                      {{data.properties.Zip}}
                      </p>
                      <p v-if="!data.properties.Zip" class="text-grey-darker text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                      </p>
                    <div>
                      (978) 213-8369
                    </div>
                    <div>
                      1258 Gorham St.
                      Lowell, MA 01852
                    </div>
                    <div>
                    
                    </div>



                  </div>
                 
             
               
          </div>



      
      </div>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup, LControl, LTooltip } from "vue2-leaflet";
import { latLng, Icon, icon } from 'leaflet';
import shops from '../shops';
import axios from 'axios'
import * as VueGoogleMaps from 'vue2-google-maps';
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster'

export default {

  name: 'Mymap',
 
  components: {

    "v-map": LMap,
    "v-tilelayer": LTileLayer,
    'l-marker':LMarker,
    'l-popup':LPopup,
    'l-control': LControl,
    'l-tooltip': LTooltip,
    'l-marker-cluster':Vue2LeafletMarkerCluster
  },
  data() {
    return {
      initialLocation: [42.3601, -71.0589],
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom: 13,
      markerLatLng: [42.3601, -71.0589],
     // shopDatabase: shops.features,
      shopDatabase: [],
      bounds: '',
      styleObject: {
        'background-color': 'white',
        fontSize: '13px',
        'z-index': '800',
        height: '400px',
        overflow: 'auto'
      },
      details: [],
      showing_shop:{},
      current_index:this.$route.params.id,
      ran:'',
      view_single: false,
      shopimages:['1.png', '2.png', '3.png' ],
          clusterOptions: {
            "disableClusteringAtZoom": 12
          },
    }
  },

  computed:{
      user() {
          return JSON.parse(localStorage.getItem('user'));
    }

  },

  methods:
  {
    click: function (e) {
       // alert("clusterclick")
      },
    closeShopView()
    {
        this.view_single = false
        this.$router.replace("/")
    },
    imgCompute(img)
    {
          
           return require('../assets/'+img);
    },

    randomImage (id) { 
        var random = id.toString().split('').pop();
        return require('../assets/'+random+'.png');
         

    },
    inMap(shops) {

      //console.log(shops[0])
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

    Max40(shops){

       if (shops)
        return shops.slice(0,40)
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

      this.view_single = !this.view_single;
      this.current_index = index
      this.$router.replace("/shop/"+index)
    // const current_shop = this.inMap(this.mapShops)[index]
   
       const current_shop = this.shopDatabase.filter((shop) => ( shop.id = index));
      

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
      this.view_single = !this.view_single;
      this.current_index = index
      console.log(index)
      const current_shop = this.shopDatabase.filter((shop) => ( shop.id === index));
       console.log(current_shop[0])
      this.showing_shop = current_shop[0];
      console.log(this.showing_shop)
      const newcenter=this.reversedGeo(current_shop[0].geometry.coordinates);
      this.$router.replace("/shop/"+index)
     //  this.$refs.map.mapObject.panTo(newcenter);
  //    this.$refs['mypopup'+index][0].mapObject.openPopup()
    //  this.$refs.mypopup[2].mapObject.openPopup()


    
  //    this.$set(this.initialLocation, 0, newcenter[0])
 
  //    this.$set(this.initialLocation, 1, newcenter[1])
        console.log(this.$refs.clusterRef.mapObject)

      var service;

        var request = {
          query: current_shop[0].properties.Name,
          fields: ['place_id', 'name', 'geometry'],
          locationBias: {lat: newcenter[0], lng: newcenter[1]}
        };



     //   var service = new google.maps.places.PlacesService(document.createElement('div'));
      //  service.getDetails(request2, function(results, status) {
    //    service.findPlaceFromQuery(request, this.callback1);
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
  // this.mapShops = this.shopDatabase
   // console.log(this.shopDatabase2)
   // get shops here
   // 
          let tempshops = [];
          axios.get('https://powerful-wildwood-94772.herokuapp.com/leaf').then((response) => {
          this.shops = response.data
          this.shops.map(shop => {
            let tempshop = {
              "id": shop.id, "type": "Feature", "properties": { "Name": shop.title, "Zip": shop.zip }, "geometry": { "type": "Point", "coordinates": [ parseFloat(shop.long), parseFloat(shop.lat) ] } 
            };
            tempshops.push(tempshop);
           // 
          })

          this.shopDatabase = tempshops
          this.mapShops = this.shopDatabase
        }, (error) => {
          console.log(error)
        })


        this.user = localStorage.getItem('user');



   // this.$router.replace("/")
    if (this.current_index)
      this.view_single=true;

  }
}
</script>

<style>
@import "~leaflet/dist/leaflet.css";
@import "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";
@import "~leaflet.markercluster/dist/MarkerCluster.css";
@import "~leaflet.markercluster/dist/MarkerCluster.Default.css";
html,
body {
  height: 100%;
  margin: 0;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .75s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}


</style>
