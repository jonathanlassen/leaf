<template>
    <div id="app" class="" style="height: 100%">
     <nav class="flex items-center justify-between flex-wrap bg-blue-light p-6">
  <div class="flex items-center flex-no-shrink text-white mr-6">
      <span class="font-semibold text-xl tracking-tight">Find a Frameshop</span>
  </div>

  <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
    <div class="text-sm lg:flex-grow">
      <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-blue-lighter hover:text-white mr-4">
        A
      </a>
      <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-blue-lighter hover:text-white mr-4">
        B
      </a>
      <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-blue-lighter hover:text-white">
        C
      </a>
    </div>
    <div>
      <a href="#" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue hover:bg-white mt-4 lg:mt-0">Login</a>
    </div>
  </div>
</nav>
        <my-map></my-map>
      
  </div>
</template>

<script>

import Mymap from './components/Mymap';

export default {
  components: {
    'my-map': Mymap,
  }
  
}
</script>

<style>

</style>
