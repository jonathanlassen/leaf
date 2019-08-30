<template>
    <div id="app" class="" style="height: 100%">
     <nav class="flex items-center justify-between flex-wrap bg-blue-light p-6">
  <div class="flex items-center flex-no-shrink text-white mr-6">
  <router-link to="/"> <span class="font-semibold text-xl tracking-tight">Find a Frameshop</span></router-link>
      <autocomplete :items="[ 'Apple', 'Banana', 'Orange', 'Mango', 'Pear', 'Peach', 'Grape', 'Tangerine', 'Pineapple']"></autocomplete>
  </div>

  <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
    <div class="text-sm flex-grow">
      <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-blue-lighter hover:text-white mr-4">
        A
      </a>
    </div>
    <div>
    <div v-if="!user">
      <router-link to="/login">  <a class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue hover:bg-white mt-4 mr-2 lg:mt-0">Login</a></router-link>
      <router-link to="/register">  <a class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue hover:bg-white mt-4 lg:mt-0">Register</a></router-link>
    </div>
        <div v-if="user">
       <a v-on:click="logout()" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue hover:bg-white mt-4 mr-2 lg:mt-0">Logout</a>

        <span v-if="user.shop_id">

          <router-link :to="{ name: 'update', params: { id: user.shop_id }}">  <a class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue hover:bg-white mt-4 mr-2 lg:mt-0">Update Shop</a></router-link>
        </span>
      </div>
    </div>
  </div>
</nav>   
  <router-view class="view"></router-view>
  </div>
  
</template>
<script>

import Autocomplete from './components/Autocomplete';
export default {
  components: {

    'autocomplete': Autocomplete,
  },

   data() {
            return {
               user: JSON.parse(localStorage.getItem('user'))
            }
        },

    methods: {
      logout() {
         localStorage.removeItem('user');
          this.user ='';
        },
    },
    created() {},

  watch:{
    user() {
          return JSON.parse(localStorage.getItem('user'));  
    },

  }
  
}
</script>

<style>
  a {  text-decoration: none; }
</style>
