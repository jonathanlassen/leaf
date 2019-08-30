<template>
    <div id="register">
      <h1>Claim</h1>
        <div>{{id}}
            <input type="text" name="username" v-model="input.username" placeholder="Username" /></br />
            <input type="password" name="password" v-model="input.password" placeholder="Password" /></br />
            <input type="text" name="email" v-model="input.email" placeholder="email" /></br />
            <button type="button" v-on:click="register()">Register</button>{{id}}
        </div>


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
        name: 'Claim',
        data() {
            return {
                input: {
                    username: "",
                    password: "",
                    email: ""
                }
            }
        },
        methods: {
            register() {
               
                    this.data = {user: this.user,
                        id: this.id}
                   
                     axios.post('https://powerful-wildwood-94772.herokuapp.com/claim', this.data, {headers: authHeader()}).then((user) => {

                                console.log(this.id)
                            this.$router.push({ path: `/update/${parseInt(this.id)}` })
                            //this.$router.push({ path: '/update', params: {id: this.id}})

                        });

              
            }
        },

         created() {
                this.data = {user: this.user,
                        id: this.id}
                   
                     axios.post('https://powerful-wildwood-94772.herokuapp.com/leaf/claim', this.data, {headers: authHeader()}).then((user) => {

                                console.log(this.id)
                            this.$router.push({ path: `/update/${parseInt(this.id)}` })
                            //this.$router.push({ path: '/update', params: {id: this.id}})

                        });



        }
    }
</script>

<style scoped>
    #register {
        width: 500px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 200px;
        padding: 20px;
    }
</style>