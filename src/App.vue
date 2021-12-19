<template>
    <div id="app" class="flex flex-col items-center justify-center h-screen">
        <img class="background-artist" :src="Url" />
        <Title/>
        <Info />
    </div>
</template>

<script>
import Info from './components/Info'
import Title from './components/Title'

export default {
    name: 'App',
    data() {
        return {
            Url: ''
        }
    },
    components: {
        Info,
        Title
    }
}
</script>

<style>
.background-artist {
    position: absolute;
    height: 100vh;
    width: 100%;
    z-index: -1;
    opacity: 0.4;
}
</style>
