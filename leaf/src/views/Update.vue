<template>
    <div  id="register">
      <h1>title here</h1>
            <div class="field">
            <label class="label">Message</label>
            <div class="control">
                <textarea class="textarea" placeholder="Message" v-model="form.message"></textarea>
            </div>
            </div>


    </div>
</template>

<script>
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
            login() {
                if(this.input.username != "" && this.input.password != "" && this.input.email != "") {
   
                    // axios request here

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