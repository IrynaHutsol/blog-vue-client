<template>
    <div>
        <div class="posts" v-for="post in posts" :key="post.id">
            <div class="post-container">
                <div v-if="post.image" class="image-post-container" v-html="post.image[0]"></div>
                <div v-else class="image-post-container">
                    <img src="../assets/Default_image.jpg" alt="Image">
                </div>
                <div class="content-container">
                    <div class="text-post-container" v-html="post.content"></div>
                    <div class="read-more"><a href="">Читати повністю</a></div>
                </div>
            </div>
            <div class="user-post">
                <div class="user-image">
                    <b-img :src="`${url1}${post.user_avatar}`"></b-img>
                </div>
                <div class="user-post-surname-date">
                    <div class="user-surname">
                        {{post.user_name}}
                    </div>
                    <div class="post-date">
                        {{post.date}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { postService } from '../services';
import { url } from '../services/config';

    export default {
        data() {
            return {
                posts: [],
                url1: url
            }
        },
        created() {
            this.$store.dispatch('GET_ME');
            postService.getPosts().then((res) => {
                if(res) {
                    this.posts = res.map(post => {
                        return {
                            user_id: post.user.id,
                            image: post.content.match(/<img[^>]*\/?>/g),
                            content: post.content.replace(/<p><img[^>]*><\/p>/g,"").split('</p>').slice(0,1)[0],
                            user_avatar: post.user.avatar_url,
                            user_name: post.user.name,
                            date: post.date
                        }
                    })
                }     
            })
        }
    }
</script>

<style>
.posts {
    width: 940px;
    border: 1px solid lightgray;
    margin: 10px auto 30px;
    background-color: white;
    box-shadow: 0 1px 4px rgba(94, 92, 92, .4),
                -23px 0 20px -23px rgba(94, 92, 92, .4),
                23px 0 20px -23px rgba(94, 92, 92, 0.4),
                inset 0 0 40px rgba(94, 92, 92, 0.1);
}
.posts:last-child {
    margin-bottom: 0px;
}
.post-container, .user-post {
    display: flex;
    width: 100%;
    margin: 0 auto;
}
.image-post-container {
    width: 378px;
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.image-post-container img {
    height: 250px;
    width: 378px;
}
.text-post-container {
    height: 230px;
    width: 550px;
    padding: 10px 10px 10px 0px;
    overflow: hidden; 
}
.content-container {
    margin-left: 10px;
}
.user-image {
    height: 70px;
    width: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.user-image img {
    border-radius: 50%;
    padding: 5px;
    /* max-width: none;
    min-width: auto;
    min-height: auto; */
    height: 100%;
}
.user-post-surname-date {
    width: 100%;
    padding: 10px 25px 0px;
}
.read-more a {
    font-size: 15px;
    font-weight: 400;
    color: #999;
}
.read-more a:hover {
    color: orangered !important;
}
</style>