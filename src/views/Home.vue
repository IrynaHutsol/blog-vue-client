<template>
    <div class="home-container">
        <div class="title">Написати статтю</div>
        <vue-editor v-model="content" :editor-toolbar="customToolbar"></vue-editor>
        <div class="btn-container-editor">
            <b-button @click="saveContent" variant="secondary" class="btn-editor">
                Зберегти
            </b-button>
        </div>
    </div>
</template>

<script>
import { VueEditor, Quill } from "vue2-editor";
Quill.register(Quill.import('attributors/style/align'), true);
var SizeStyle = Quill.import('attributors/style/size');
Quill.register(SizeStyle, true);
import { postService } from '../services';

export default {
    components: {
        VueEditor
    },
    data() {
        return {
        content: null,
        customToolbar: [
            [{ header: [false, 1, 2, 3, 4, 5, 6] }],
            ["bold", "italic", "underline", "strike"],
            [
                { align: "" },
                { align: "center" },
                { align: "right" },
                { align: "justify" }
            ],
            [{ color: [] }, { background: [] }],
            ["image"]
        ]
        };
    },
    created() {
        this.$store.dispatch('GET_ME');
    },
    methods: {
        saveContent() {
            postService.addPost({content: this.content}).then((res) => {
                if (res.status == 'OK') {
                    this.$swal({
                        icon: 'success',
                        title: 'Вітаємо!',
                        text: 'Вашу статтю успішно збережено!'
                    }).then(() => {
                        this.$router.push({path:'/myposts'});
                    })
                }else {
                    this.$swal({
                        icon: 'warning',
                        title: 'Oops...',
                        text: 'Повторіть спробу!'
                    })
                }
            })
        }
    }
}
</script>

<style>
.home-container {
    background: linear-gradient(#cec5f1, #fca468);
    height: calc(100vh - 90px);
    display: grid;
    justify-content: center;
    align-items: start;
}
.title {
    text-align: center;
    color: white;
    font-size: 28px;
    margin-top: 10px;
}
.quillWrapper {
    width: 800px;
    height: 400px;
}
.quillWrapper, .ql-container {
    background: white;
}
.btn-container-editor {
    margin-top: 30px;
    width: 800px;
    text-align: center;
}
.btn-editor {
    margin: 10px;
}
</style>