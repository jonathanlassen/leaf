<template>
    <div  id="register">
      <h1>Register</h1>
        <div>
            <input type="text" name="username" v-model="input.username" placeholder="Username" /></br />
            <input type="password" name="password" v-model="input.password" placeholder="Password" /></br />
            <input type="text" name="email" v-model="input.email" placeholder="email" /></br />
            <button type="button" v-on:click="register()">Register</button>
        </div>


    </div>
</template>

<script>
    import axios from 'axios'
    import { authHeader } from '../auth/auth-header';

    export default {
        name: 'Register',
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
                if(this.input.username != "" && this.input.password != "" && this.input.email != "") {
   
                    axios.post('https://powerful-wildwood-94772.herokuapp.com/leaf/register', this.input, authHeader).then((user) => {

                        if (user.token) {
                            // store user details and jwt token in local storage to keep user logged in between page refreshes
                            localStorage.setItem('user', JSON.stringify(user));
                        }

                        this.$router.push({ path: '/' })

                        });

                } else {
                    console.log("A username and password and email must be present");
                }
            }
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