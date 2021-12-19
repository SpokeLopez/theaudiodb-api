<template>
    <div>
        <img class="imm" :src="url" @click="showModal" />
        <Modal v-show="isModalVisible" @close="closeModal" :url="url" />
    
    </div>
</template>

<script>
import Modal from './Modal.vue'

export default {
    components: {
        Modal
    },
    name: 'Imagen',
    props: {
        url: {
            type: String
        }
    },
    data() {
        return {
            isModalVisible: false
        }
    },
    methods: {
        showModal() {
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        },
    }

}
</script>

<style>
.imm {
    height: 100px;
    width: 100px;
    z-index: 2;
}
</style>