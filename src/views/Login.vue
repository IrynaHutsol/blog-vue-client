<template>
    <div class="form-containers">
        <form class="forms">
            <div class="text-form">
                Авторизація
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
                    autocomplete = "current-password" 
                    v-model="password" 
                    :state="validationPassword" 
                    placeholder="Пароль" 
                    trim 
                    @click="getPassword"
                    type="password"
                ></b-form-input>
                <!-- This will only be shown if the preceding input has an invalid state -->
                <b-form-invalid-feedback id="input-password-feedback">
                    Не менше 6 символів
                </b-form-invalid-feedback>
			</div>
            <b-form-checkbox 
                class="mb-2 mr-sm-2 mb-sm-0" 
                v-model="remember_me"
                :value="true">
                Запам'ятати мене
            </b-form-checkbox>
            <b-button class="btn-form" variant="secondary" @click.prevent="login">Увійти</b-button>
		</form>
    </div>
</template>

<script>
import { authService } from '../services';
import Cookies from 'js-cookie';

    export default {
        data(){
            return{
                email: '',
                password: '',
                remember_me: false,
                validationEmail: true,
                validationPassword: true,
            }
        },
		methods: {
			validEmail(){
                var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				return re.test(this.email);
			},
			validPassword(){
                var pas = /^[a-zA-Z0-9_]{6,25}$/;
                return pas.test(this.password);
			},
			login() {
                if( !this.validEmail()){
                    this.validationEmail = false;
                }
                if( !this.validPassword()){
                    this.validationPassword = false;
                }
                if( !this.validationEmail || !this.validationPassword ){
                    return; 
                } 	
                this.$store.commit('SET_SPINNER', true);
                authService.login({email: this.email, password: this.password, remember_me: this.remember_me}).then((res) => {
                    if(res.access_token){
                        this.$store.commit('SET_SPINNER', false);
                        Cookies.set('token', `${res.access_token}`);
                        window.location.assign('/');
                    }else {
                        this.$swal({
                            icon: 'warning',
                            title: 'Oops...',
                            text: 'Повторіть спробу! Не правильний email або пароль.'
                        })
                        this.$store.commit('SET_SPINNER', false);
                    }
				})
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
.form-containers {
    background: linear-gradient(#cec5f1, #fca468);
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 90px);
    box-sizing: border-box;
}
.forms {
    width: 450px;
    text-align: center;
}
.email-form, .password-form {
    padding: 10px;
}
.text-form {
    font-size: 34px;
    color: white;
    margin-bottom: 20px;
}
.custom-control-label {
    color: white;
}
.btn-form {
    margin-top: 20px;
}
.form-control.is-valid {
    border-color: #ced4da !important;
    background-image: none !important; 
}
</style>