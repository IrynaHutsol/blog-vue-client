<template>
    <div class="post-container-info">
        <div v-if="post.content">
            <div v-html="post.content" class="post"></div>
            <div class="user-post-info">
                <div class="user-image">
                    <b-img :src="`${url1}${post.user.avatar_url}`"></b-img>
                </div>
                <div class="user-post-surname-date">
                    <div class="unc">
                        {{post.user.name}}
                    </div>
                    <div class="post-date">
                        {{post.date}}
                    </div>
                </div>
            </div>
            <h4 class="title-comment">Коментарі - {{comments.length}}</h4>
            <div class="comments-container" v-if="token">
                <div class="comment-input">
                    <textarea placeholder="Залишити коментар" v-model="text"></textarea>
                </div>
                <b-button variant="secondary" class="btn-editor" @click="saveComment">
                    Відправити
                </b-button>
            </div>
            <div class="all-comments-container" v-if="comments.length > 0">
                <div class="user-comment" v-for="comment in comments" :key="comment.id">
                    <div class="user-contaniner-content">
                        <div class="user-name-comment">
                            <div class="user-avatar-comment">
                                <div class="avatar-img">
                                    <b-img :src="`${url1}${comment.user.avatar_url}`"></b-img>
                                </div>
                            </div>
                            <p class="unc">{{comment.user.name}}</p> 
                            <p>{{comment.date}}</p>
                        </div>
                        <div class="user-comment-text">
                            {{comment.text}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { url } from '../services/config';
import { commentService } from '../services';
import Cookies from 'js-cookie';
import moment from 'moment';

    export default {
        data() {
            return {
                token: '',
                url1: url,
                text: '',
                comments: []
            }
        },
        created() {
            this.token = Cookies.get('token');

            if (this.token) {
                this.$store.dispatch('GET_ME');
            }
            if ('id' in this.$route.params && this.$store.getters.getPosts.length == 0) {
                this.$store.commit('SET_SPINNER', true);
                this.$store.dispatch('GET_POST',this.$route.params.id).then(res => {
                    if (res) {
                        this.$store.commit('SET_SPINNER', false);
                    }
                })
            }
            commentService.getComments().then(res => {
                this.comments = res.filter(comment => comment.post_id == this.post.id);
                this.comments.reverse();
            })
        },
        computed: {
            post() {
                if (this.$store.getters.getPosts.length > 0) {
                    return this.$store.getters.getPosts.filter(post => post.id == this.$route.params.id)[0]; 
                }else {
                    return this.$store.getters.getPost;
                }
            }
        },
        methods: {
            saveComment() {
                var now = moment();
                commentService.addComment({text: this.text, post_id: this.post.id, date: now.format('DD-MM-YYYY - HH:mm:ss')}).then((res) => {
                    if(res.status == 'OK') { 
                        this.text = '';
                        commentService.getComments().then(res => {
                            this.comments = res.filter(comment => comment.post_id == this.post.id);
                            this.comments.reverse();
                        })
                    }
                })
            }
        }
    }
</script>

<style>
.post-container-info {
    background: linear-gradient(#cec5f1, #fca468);
    min-height: calc(100vh - 90px);
    padding: 20px 20px 20px;
}
.post {
    width: 940px;
    height: max-content;
    border: 1px solid lightgray;
    margin: 10px auto 0px;
    padding: 20px 20px 10px;
    background-color: white;
    box-shadow: 0 1px 4px rgba(94, 92, 92, .1),
                -23px 0 20px -23px rgba(94, 92, 92, .1),
                23px 0 20px -23px rgba(94, 92, 92, 0.1),
                inset 0 0 40px rgba(94, 92, 92, 0.1);
}
.post > p > img {
    height: 50%;
    width: 50%;
}
.user-post-info {
    display: flex;
    width: 940px;
    margin: 0px auto 10px;
    border: 1px solid lightgray;
    background: white;
    border-top: none;
}
.title-comment {
    text-align: center;
    color: white;
}
.comments-container {
    width: 940px;
    height: 200px;
    background: white;
    margin: 0px auto 20px;
    padding: 20px;
    text-align: center;
}
textarea {
    height: 105px;
    width: 865px;
    border: none
}
textarea:focus {
    outline: none;
}
.all-comments-container {
    background: white;
    padding: 10px;
    width: 940px;
    margin: 0px auto 20px;
    height: max-content;
}
.user-comment {
    display: flex;
    border-bottom: 1px solid lightgrey;
}
.user-avatar-comment {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.avatar-img {
    width: 25px;
    height: 25px;
}
.avatar-img img {
    height: 100%;
}
.user-contaniner-content {
    margin: 6px 10px;
    width: 100%;
    word-break: break-word !important;
}
.user-name-comment {
    display: flex;
    align-items: center;
    font-size: 13px;
}
.user-name-comment p {
    margin: 5px;
}
.unc {
    font-weight: 600;
}
h4 {
    margin-bottom: 1rem;
}
</style>