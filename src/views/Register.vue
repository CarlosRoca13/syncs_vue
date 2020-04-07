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
				<ValidationObserver for="form" v-slot="{ handleSubmit }">
					<form name="form" id="form" v-on:submit.prevent="handleSubmit(register)">

						<ValidationProvider name="name" rules="required|alpha|min:2|max:30" v-slot="{ errors }">
							<label for="name">Name</label>
							<input type="text" v-model="input.name" name="name">
							<span>{{ errors[0] }}</span>
						</ValidationProvider>
						<ValidationProvider name="lastname" rules="required|alpha|min:2|max:60" v-slot="{ errors }">
							<label for="lastname">Lastname</label>
							<input type="text" v-model="input.lastname" name="lastname">
							<span>{{ errors[0] }}</span>
						</ValidationProvider>
						<ValidationProvider name="email" rules="required|email|max:30" v-slot="{ errors }">
							<label for="email">Email</label>
							<input v-model="input.email" type="email" name="email">
							<span>{{ errors[0] }}</span>
						</ValidationProvider>
						<ValidationProvider name="username" rules="required|alpha_dash|min:2|max:20" v-slot="{ errors }">
							<label for="username">Username</label>
							<input type="text" v-model="input.username" name="username">
							<span>{{ errors[0] }}</span>
						</ValidationProvider>
						<ValidationProvider name="password" rules="required|alpha_dash|min:6|max:20|confirmed:confirmation" v-slot="{ errors }">
							<label for="password">Password</label>
							<input type="password" v-model="input.password" name="password">
							<span>{{ errors[0] }}</span>
						</ValidationProvider>
						<ValidationProvider v-slot="{ errors }" vid="confirmation">
							<label for="">Repeat password</label>
							<input v-model="input.confirmation" type="password">
							<span>{{ errors[0] }}</span>
						</ValidationProvider>
						<ValidationProvider name="birthday" rules="required" v-slot="{ errors }">
							<label for="">birthday</label>
							<input type="date" name="birthday" v-model="input.birthday">
							<span>{{ errors[0] }}</span>
						</ValidationProvider>
						
						<button type="submit">Sign up</button>
					</form>
				</ValidationObserver>
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
					name: "",
					lastname: "",
					email: "",
                    username: "",
					password: "",
					confirmation: "",
					verified: "0",
					avatar: "0",
					birthday: ""
                }
            }
        },
        methods: {
            register() {
				this.$http.post("http://localhost:8000/api/clients", this.input);
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
input[type="password"],
input[type="date"]{
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