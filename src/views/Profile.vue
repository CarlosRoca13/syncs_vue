<template>
  <div class="main">
    <div class="container-all">
      <div class="ctn-form">
        <img src="../img/logo.png" alt="Syncs" class="logo" />
        <button type="button" @click="editData()">Edit profile</button>
        <ValidationObserver for="form" v-slot="{ handleSubmit }">
          <form name="form" id="form" v-on:submit.prevent="handleSubmit(saveChanges)">
            <ValidationProvider name="name" rules="required|alpha|min:2|max:30" v-slot="{ errors }">
              <label for="name">Name</label>
              <input type="text" v-model="input.name" name="name" :readonly="shouldDisable"/>
              <span>{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider
              name="lastname"
              rules="required|alpha|min:2|max:60"
              v-slot="{ errors }"
            >
              <label for="lastname">Lastname</label>
              <input type="text" v-model="input.lastname" name="lastname" :readonly="shouldDisable"/>
              <span>{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider name="email" rules="required|email|max:30" v-slot="{ errors }">
              <label for="email">Email</label>
              <input v-model="input.email" type="email" name="email" :readonly="shouldDisable"/>
              <span>{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider
              name="username"
              rules="required|alpha_dash|min:2|max:20"
              v-slot="{ errors }"
            >
              <label for="username">Username</label>
              <input type="text" v-model="input.username" name="username" :readonly="shouldDisable"/>
              <span>{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider
              name="password"
              rules="required|alpha_dash|min:6|max:20|confirmed:confirmation"
              v-slot="{ errors }"
            >
              <label for="password">Password</label>
              <input type="password" v-model="input.password" name="password" :readonly="shouldDisable"/>
              <span>{{ errors[0] }}</span>
            </ValidationProvider>
			<div v-if="editInfo==true">
				<ValidationProvider v-slot="{ errors }" vid="confirmation">
				<label for>Repeat password</label>
				<input v-model="pass.confirmation" type="password" :readonly="shouldDisable"/>
				<span>{{ errors[0] }}</span>
				</ValidationProvider>
			</div>
            <ValidationProvider name="birthday" rules="required" v-slot="{ errors }">
              <label for>birthday</label>
              <input type="date" name="birthday" v-model="input.birthday" :readonly="shouldDisable"/>
              <span>{{ errors[0] }}</span>
            </ValidationProvider>
			<div v-if="editInfo==true">
				<button type="submit">Save changes</button>
			</div>
          </form>
        </ValidationObserver>
		<button type="button"  @click="deleteAccount()">Delete account</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  methods: {
	editData(){
		this.editInfo = !this.editInfo;
		this.shouldDisable = !this.shouldDisable;
	},
	loadData(){
		//LLAMAR A ESTA FUNCION CUANDO CARGA LA PAGINA
		const user = JSON.parse(localStorage.getItem('activeUser'));
		this.$http.get("http://localhost:8000/api/clients/"+user.username)
		.then(response => {
			this.input = response.data[0];
			this.pass.confirmation = response.data[0].password;
		});
	},
    saveChanges() {
		const user = JSON.parse(localStorage.getItem('activeUser'));
		this.$http.put('http://localhost:8000/api/clients/'+user.id, this.input);
		this.editInfo = !this.editInfo;
		this.shouldDisable = !this.shouldDisable;
	},
	deleteAccount(){
		if (confirm('Are you sure you want to delete your account?')) {
			// Save it!
			const user = JSON.parse(localStorage.getItem('activeUser'));
			this.$http.delete("http://localhost:8000/api/clients/"+user.id);
			localStorage.removeItem('activeUser');
			this.$router.replace({ name: "Home" });
			this.$router.go(this.$router.currentRoute)
			console.log('Account deleted.');
		} else {
			// Do nothing!
			console.log('Account not deleted.');
		}
	}
  },
  data() {
	return {
		input: {
			name: null,
			lastname: null,
			email: null,
			username: null,
			password: null,
			verified: "0",
			birthday: null
		},
		pass: {
			confirmation: null
		},
		editInfo: false,
		shouldDisable: true
    };
  },
  mounted(){
		this.loadData()
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");

* {
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
  text-decoration: none;
}

.main {
  background: linear-gradient(90deg, #bf4222, #183a37);
}

.container-all {
  width: 100%;
  max-width: 1000px;
  margin: auto;
  margin-top: 50px;
  display: flex;
  border-radius: 20px;
  overflow: hidden;
  padding: 20px;
}

/* LADO IZQUIERDO */

.ctn-form {
  width: 80%;
  padding: 40px;
  background: #f7f7f7;
}

.logo {
  width: 150px;
  display: block;
  margin: auto;
}

.title {
  text-align: center;
  margin-top: 20px;
  font-weight: 400;
  color: #183a37;
}

label {
  display: block;
  margin-top: 30px;
  font-size: 20px;
  font-weight: 300;
  color: #7a7a7a;
}
input[type="email"],
input[type="text"],
input[type="password"],
input[type="date"] {
  width: 100%;
  height: 30px;
  background: rgba(0, 0, 0, 0);
  border: 0px;
  outline: 0px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  color: #183a37;
  font-size: 16px;
}

button[type="submit"],
button[type="button"] {
  width: 100%;
  height: 50px;
  margin-top: 60px;
  margin-bottom: 30px;
  color: white;
  border: 0px;
  background-color: #bf4222;
  font-weight: 300;
  cursor: pointer;
  font-size: 18px;
}

/* LADO DERECHO */

.ctn-text {
  width: 100%;
  background-image: url("../img/imagen.jpg");
  background-position: center;
  background-size: cover;
  padding: 40px;
  position: relative;
}

.capa {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #183a37;
  opacity: 0.5;
}

.title-description {
  position: relative;
  top: 80px;
  color: white;
  font-weight: 300;
  font-size: 40px;
}

/* RESPONSIVE */

@media screen and (max-width: 800px) {
  .ctn-text {
    display: none;
  }
  .ctn-form {
    margin: auto;
    width: 100%;
    background: white;
  }
}
</style>