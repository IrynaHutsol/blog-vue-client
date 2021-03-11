<template>
    <div id="spinner" class="sp_absolute">
        <div class="sp">
            <b-spinner
            large
            variant="white" 
            label="Text Centered"
            ></b-spinner>
        </div>
    </div>
</template>

<script>
export default {
}
</script>

<style>
.sp_absolute {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 2000;
    background: rgba(0,0,0,.4);
}
.sp {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: table;
}
</style>