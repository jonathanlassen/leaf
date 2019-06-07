<template>
    <div class="autocomplete">
         <input
            type="text"
            v-model="search"
            @input="onChange"
        />
        <ul
            v-show="isOpen"
            class="autocomplete-results"
        >
        <li
            v-for="(result, i) in results"
            :key="i"
            @click="setResult(result)"
            class="autocomplete-result"
        >
            {{ result }}
        </li>
        </ul>
    </div>
</template>

<script>

export default {

    created() {
   


  },

  methods: {
        onChange() {
        this.isOpen = true;
        this.filterResults();
      },
      filterResults() {
        this.results = this.items.filter(item => item.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
      },
       setResult(result) {
        this.search = result;
        this.isOpen = false;
      },
       handleClickOutside(evt) {
      if (!this.$el.contains(evt.target)) {
        this.isOpen = false;
        this.arrowCounter = -1;
      }
    }
  },
   props: {
      items: {
        type: Array,
        required: false,
        default: () => [],
      },
    },
  data(){
    return {
        search: '',
        results: [],
        isOpen: false,

    }
  }, 
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  destroyed() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  
  
}
</script>

<style>

    input{
    padding: 10px;

    }

  .autocomplete {
    position: relative;
    width: 130px;
    padding-left:15px;
    
  }

  .autocomplete-results {
     padding: 10px;
    margin: 0;
    
    border: 1px solid #eeeeee;
    height: 120px;
    width: 220px;
    overflow: auto;
    position: absolute;
    z-index:1000;
    background-color: white;
    color: black
  }

  .autocomplete-result {
    list-style: none;
    text-align: left;
    padding: 4px 2px;
    cursor: pointer;
  
  }

  .autocomplete-result:hover {
    background-color: #4AAE9B;
   
    
  }
</style>
