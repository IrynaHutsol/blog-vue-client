<template>
   <div class="form-containers">
        <form class="forms">
            <div class="text-form">
                Реєстрація
            </div>
            <div role="group" class="name-form">
                <b-form-input 
                    id="input-name" 
                    aria-describedby="input-name-help input-name-feedback"
                    autocomplete="username" 
                    v-model="name" 
                    :state="validationName" 
                    placeholder="Ваш нікнейм" 
                    trim 
                    @click="getName"
                ></b-form-input>
                <!-- This will only be shown if the preceding input has an invalid state -->
                <b-form-invalid-feedback id="input-name-feedback">
                    Не менше 3-ох літер
                </b-form-invalid-feedback>
            </div>
            <div role="group" class="email-form">
                <b-form-input 
                    id="input-email" 
                    aria-describedby="input-email-help input-email-feedback" 
                    autocomplete="username" 
                    v-model="email" 
                    :state="validationEmail" 
                    placeholder="Email" 
                    trim 
                    @click="getEmail"
                ></b-form-input>
                <!-- This will only be shown if the preceding input has an invalid state -->
                <b-form-invalid-feedback id="input-email-feedback">
                    Введіть валідний email
                </b-form-invalid-feedback>
            </div>
			<div role="group" class="password-form">
                <b-form-input 
                    id="input-password" 
                    aria-describedby="input-password-help input-password-feedback" 
                    autocomplete="new-password"
                    v-model="password" 
                    :state="validationPassword" 
                    placeholder="Пароль" 
                    trim 
                    @click="getPassword"
                    type="password"
                ></b-form-input>
                <!-- This will only be shown if the preceding input has an invalid state -->
                <b-form-invalid-feedback id="input-password-feedback">
                    Не менше 6-ти символів
                </b-form-invalid-feedback>
			</div>
            <div role="group" class="password-form">
                <b-form-input 
                    id="input-password-confirm" 
                    aria-describedby="input-password-confirm-help input-password-confirm-feedback" 
                    autocomplete="new-password"
                    v-model="password_confirm" 
                    :state="validationPassword" 
                    placeholder="Підтвердіть свій пароль" 
                    trim 
                    @click="getPassword"
                    type="password"
                ></b-form-input>
                <!-- This will only be shown if the preceding input has an invalid state -->
                <b-form-invalid-feedback id="input-password-confirm-feedback">
                    Не менше 6-ти символів
                </b-form-invalid-feedback>
			</div>
            <div class="invalid-confirm_password" v-if="equalityPassword && password.length && password_confirm.length">Ваші паролі не співпадають</div>
            <b-button class="btn-form" variant="secondary" @click="signup">Продовжити</b-button>
        </form>
    </div>
</template>

<script>
import { authService } from '../services';

    export default {
        data(){
            return{
                name: '',
                email: '',
                password: '',
                password_confirm: '',
                validationName: true,
                validationEmail: true,
                validationPassword: true
            }
        },
        computed: {
            equalityPassword(){
                return this.password != this.password_confirm;
            },
        },
		methods: {
            validName() {
                return this.name.length > 2;
            },
			validEmail(){
                var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				return re.test(this.email);
			},
			validPassword(){
                var pas = /^[a-zA-Z0-9_]{6,25}$/;
                return pas.test(this.password);
			},
			signup() {
                if (!this.validName()) {
                    this.validationName= false;
                }
                if (!this.validEmail()) {
                    this.validationEmail = false;
                }
                if (!this.validPassword()) {
                    this.validationPassword = false;
                }
                if (!this.validationName || !this.validationEmail || !this.validationPassword || this.equalityPassword) {
                    return; 
                } 
                this.$store.commit('SET_SPINNER', true);	
                authService.signup({name: this.name, email: this.email, password: this.password, password_confirmation: this.password_confirm}).then((res) => {
                    if (res.message == 'Successfully created user!') {
                        this.$store.commit('SET_SPINNER', false);
                        this.name = '';
                        this.email = '';
                        this.password = '';
                        this.password_confirm = '';
                        this.$swal({
                            icon: 'success',
                            title: 'Вітаємо!',
                            text: 'Ви успішно зареєструвались!',
                            backdrop: `
                                rgba(0,0,123,0.4)
                                url("https://media.tenor.com/images/f1d68666fdc0a9fad5c3998215ea1eda/tenor.gif")
                                left top
                                no-repeat
                            `
                        }).then(() => {
                            this.$router.push({path:'/login'});
                        })
                    }else {
                        this.$swal({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Помилка сервера! Спробуйте, будь ласка, пізніше'
                        })
                        this.$store.commit('SET_SPINNER', false);
                    }
				})
			},
            getName() { 
                this.validationName = true; 
            },
            getPassword() { 
                this.validationPassword = true; 
            },
            getEmail() { 
                this.validationEmail = true; 
            }
		}
	}
</script>

<style>
.name-form {
    padding: 10px;
}
.invalid-confirm_password {
    font-size: 80%;
    color: #dc3545; 
}
</style>