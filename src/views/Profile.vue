<template>
    <div class="form-containers">
        <div class="profile">
            <div class="profile-title">Мій профіль</div>
            <div class="profile-info">
                Ім'я: <p>{{me.name}};</p>
            </div>
            <div class="profile-info">
                Електронна пошта: <p>{{me.email}};</p>
            </div>
            <div class="profile-info">
                Загальна кількість моїх публікацій: <p>{{posts.length}};</p>
            </div>
            <div class="profile-info">
                Загальна кількість моїх коментарів: <p>{{comments.length}};</p>
            </div>
            <div role="group" class="email-form-profile">
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
            <div class="hint-email-profile">*Для запрошення друга введіть його електронну пошту</div>
            <div class="btn-profile">
                <b-button variant="secondary" @click.prevent="sendEmail">Запросити друга</b-button>
            </div>
        </div>
    </div>
</template>

<script>
import { commentService } from '../services';
import { authService } from '../services';
import Cookies from 'js-cookie';

export default ({
    data() {
        return {
            comments: [],
            email: '',
            validationEmail: true
        }
    },
    created() {
        if (this.$route.name && !Cookies.get('token')){
            this.$router.push('/login');
        }
        this.$store.dispatch('GET_ME');
        if (this.$store.getters.getPosts.length == 0) {
            this.$store.dispatch('GET_POSTS');
        }
        commentService.getComments().then(res => {
            this.comments = res.filter(comment => comment.user_id == this.me.id);
        })
    },
    computed: {
        me() { 
            return this.$store.getters.getMe; 
        },
        posts(){
            return this.$store.getters.getPosts.filter(post => post.user_id == this.me.id)
        }
    },
    methods: {
        validEmail(){
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(this.email);
        },
        sendEmail() {
            if( !this.validEmail()){
                this.validationEmail = false;
                return
            }else {
                this.$store.commit('SET_SPINNER', true);
                authService.sendEmail({email: this.email}).then((res) => {
                    if(res.status == "Email has been sent"){
                        this.$store.commit('SET_SPINNER', false);
                        this.$swal({
                            icon: 'success',
                            title: 'Вітаємо!',
                            text: 'Лист із запрошенням успішно відправлено!'
                        }).then(() => {
                            this.email = '';
                        })
                    }else {
                        this.$swal({
                            icon: 'warning',
                            title: 'Oops...',
                            text: 'Повторіть спробу!'
                        })
                        this.$store.commit('SET_SPINNER', false);
                    }
                })
            }	
        },
        getEmail() { 
            this.validationEmail = true;
        }
    }
})
</script>


<style>
.profile {
    width: 500px;
    height: 360px;
    background: white;
    border: 1px solid lightgray;
    padding: 20px;
    box-shadow: 0 1px 4px rgba(94, 92, 92, .1),
                -23px 0 20px -23px rgba(94, 92, 92, .1),
                23px 0 20px -23px rgba(94, 92, 92, 0.1),
                inset 0 0 40px rgba(94, 92, 92, 0.1);
}
.profile-title {
    widows: 100%;
    font-size: 24px;
    color: #fb7842;
    text-align: center;
    font-weight: 600;
}
.profile-info {
    color: #fb7842;
    font-size: 18px;
    display: flex;
}
.profile-info p {
    color: grey;
    margin-left: 10px;
    font-weight: 600;
}
.email-form-profile {
    padding-bottom: 10px;
}
.hint-email-profile {
    font-size: 12px;
    padding-bottom: 10px;
}
.btn-profile {
    width: 100%;
    text-align: center;
}
</style>