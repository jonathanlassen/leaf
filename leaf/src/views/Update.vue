<template>
    <div id="update">
      <h1>Update Shop Info</h1>
            <div class="field">
            <label class="label"></label>
                <label class="label">Name</label>
                    <div class="control">
                    <input v-model="form.name" class="input" type="text" placeholder="Text input">
                    </div>

                    <label class="label">Telephone</label>
                    <div class="control">
                    <input v-model="form.telephone" class="input" type="text" placeholder="Text input">
                    </div>

                    <label class="label">State</label>
                    <div class="control">
                    <input v-model="form.statecode" class="input" type="text" placeholder="Text input">
                    </div>

                    <label class="label">Message</label>
                    <div class="control">
                        <textarea class="textarea" placeholder="Message" v-model="form.zip"></textarea>
                    </div>
            </div>

            <button type="button" v-on:click="update()">Update</button>


    </div>
</template>

<script>
   
    import axios from 'axios'
    import { authHeader } from '../auth/auth-header';

    export default {
        props: {
           id: {

            required: true
            },
        },
        computed:{
            user() {
                return JSON.parse(localStorage.getItem('user'));
            }

        },
        name: 'Update',
        data() {
            return {
                form: {
                    name: "",
                    telephone: "",
                    statecode: "",
                    zip: ""
                }
            }
        },
        methods: {
            update() {
                 axios.patch('http://localhost:3000/shop/'+this.id, this.form, {headers: authHeader()}).then((shop) => {
                             this.$router.push({ path: '/' })
                        });

            }
        },
        created() {
            console.log(this.id)
                axios.get('http://localhost:3000/shop/'+this.id).then((response) => {
               // console.log(response.data)
                    this.form = response.data
             

                }, (error) => {
                console.log(error)
                })



        }
}

</script>

<style scoped>
    #update {
        width: 500px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 200px;
        padding: 20px;
    }
</style>