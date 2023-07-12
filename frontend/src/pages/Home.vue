<template>
    <div>
        <h4 @click="onClickModal"> 개발자 노트 </h4>
        <Sample/>
        <Sample2/>
        <isModal/>

        <div class="black-bg">
            <div class="white-bg">
            <h4>상세페이지</h4>
            <p>상세 페이지 내용임</p>
            <button>닫기</button>
            </div>
        </div>
    </div>

</template>

<script setup>
import Sample from '@/components/Sample.vue';
import Sample2 from '@/components/Sample2.vue';
import { useModalStore } from '@/stores/modal';

const modalStore = useModalStore();

const onClickModal = () => {
    console.log('modal open')
    modalStore.openModal('modalDetail')
}
</script>

<style scoped>
.dev-img {
    width: 50%;
    margin-top: 40px;
}

body {
    margin : 0
}

div {
    box-sizing: border-box;
}

.black-bg {
    width: 50%; height: 100%;
    background: rgba(0,0,0,0.5);
    position: fixed; padding: 20px;
    z-index: 99;
}
.white-bg {
    width: 50%; background: white;
    border-radius: 8px; 
    padding: 20px;
}



</style>
