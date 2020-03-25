<template>
    <div>
        <div class="container-all">

            <div class="ctn-text">
                <div class="capa"></div>
                <h1 class="title-description">Title</h1>
                <p class="text-description">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim voluptate, quidem omnis mollitia aliquam recusandae voluptatum architecto quaerat commodi laudantium et, reiciendis nobis non quae. Qui delectus magni cupiditate soluta.</p>
            </div>
			<div class="ctn-form">
                <img src="../img/logo.png" alt="Syncs" class="logo">
                <h1 class="title">Sign up</h1>

                <form action="">

					<label for="">Email</label>
                    <input type="email" name="email" v-model="input.email">
                    <label for="">Username</label>
                    <input type="text" name="username" v-model="input.username">
                    <label for="">Password</label>
                    <input type="password" name="password" v-model="input.password">
                    
                    <button type="submit" v-on:click="register()">Sign up</button>
                </form>
                <span class="text_footer">Not a member yet?
                    <a href="">Sign up</a>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Register",
        data() {
            return {
                input: {
					email: "",
                    username: "",
                    password: ""
                }
            }
        },
        methods: {
            register() {
                //Aquí va la lógica
				this.$router.replace({ name: "Login" });
            }
        }
    }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

*{
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'Roboto', sans-serif;
	text-decoration: none;
}

.container-all{
	width: 100%;
	max-width: 1000px;
	margin: auto;
	margin-top: 50px;
	display: flex;
	border-radius: 20px;
	overflow: hidden;
	padding: 20px;
	background: linear-gradient(90deg, #BF4222,
	#183A37);
}

/* LADO IZQUIERDO */

.ctn-form{
	width: 80%;
	padding: 40px;
	background: #f7f7f7;
}

.logo{
	width: 150px;
	display: block;
	margin: auto;
}

.title{
	text-align: center;
	margin-top: 20px;
	font-weight: 400;
	color: #183A37;
}

label{
	display: block;
	margin-top: 30px;
	font-size: 20px;
	font-weight: 300;
	color: #7a7a7a;
}
input[type="email"],
input[type="text"],
input[type="password"]{
	width: 100%;
	height: 30px;
	background: rgba(0,0,0,0);
	border: 0px;
	outline: 0px;
	border-bottom: 1px solid rgba(0,0,0,0.12);
	color: #183A37;
	font-size: 16px;
}

button[type="submit"]{
	width: 100%;
	height: 50px;
	margin-top: 60px;
	margin-bottom: 30px;
	color: white;
	border: 0px;
	background-color: #BF4222;
	font-weight: 300;
	cursor: pointer;
	font-size: 18px;
}

.text-footer{
	display: block;
	margin-top: 100px;
	text-align: center;
	color: #7a7a7a;
	font-weight: 300;
}

.text-footer a{
	color: #029EE1;
	font-weight: 500;
}

/* LADO DERECHO */

.ctn-text{
	width: 100%;
	background-image: url("../img/imagen.jpg");
	background-position: center;
	background-size: cover;
	padding: 40px;
	position: relative;
}

.capa{
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	background-color: #183A37;
	opacity: 0.5;
}

.title-description{
	position: relative;
	top: 80px;
	color: white;
	font-weight: 300;
	font-size: 40px;
}

.text-description{
	position: relative;
	top: 110px;
	color: white;
	font-size: 18px;
	font-weight: 200;
}

/* RESPONSIVE */

@media screen and (max-width: 800px){
	.ctn-text{
		display: none;
	}
	.ctn-form{
		margin: auto;
		width: 100%;
		background: white;
	}
}
</style>