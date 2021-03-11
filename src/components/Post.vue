<template>
    <div class="post-container-info" v-if="post">
        <div v-html="post" class="post"></div>
    </div>
</template>

<script>
export default {
    created() {
        this.$store.dispatch('GET_ME');
        if ('id' in this.$route.params && this.$store.getters.getPosts.length == 0) {
            this.$store.commit('SET_SPINNER', true);
            this.$store.dispatch('GET_POST',this.$route.params.id).then(res => {
                if (res) {
                    this.$store.commit('SET_SPINNER', false);
                }
            })
        }
    },
    computed: {
        post() {
            if (this.$store.getters.getPosts.length > 0) {
                return this.$store.getters.getPosts.filter(post => post.id == this.$route.params.id)[0].content; 
                 
            }else {
                return this.$store.getters.getPost.content;
            }
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
    margin: 10px auto 30px;
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
</style>