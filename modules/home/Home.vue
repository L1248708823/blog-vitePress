<template>
  <div class="flex ">
      <img src="/img/bg2.png" alt=""/>
      <p data-text='笑一个吧! 功成名就不是目的 让自己快乐快乐这才叫做意义~'>笑一个吧! 功成名就不是目的,让自己快乐快乐这才叫做意义~</p>
  </div>
</template>
<script setup lang="ts">
import { ref,Component } from 'vue'

defineProps<{ msg: string }>()
const date = ref(new Date())
</script>

<style lang="stylus" scoped>
  .flex {
    position fixed;
    left: 0px;
    width 100vw;
    top 100px;
    display: flex;
    justify-content: center;
    align-content: center
    border-radius: 5px;
    min-width 960px;
    height auto
    

    // width 1376px;
    img {
       width 70vw;
      // max-width: 1300px;
      // min-width: 900px;
      border-radius: 5px;
         backdrop-filter: blur(6px);
    }

    p {
    position: absolute;
    margin: auto;
    font-size: 18px;
    word-spacing: 0.2em;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    color: transparent;
    background-color: #E8A95B;
     -webkit-background-clip: text;
     left: calc(50% - (476px / 2)) ;
     bottom: 30px;
}

p::after {
    content: attr(data-text);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
    background-image: linear-gradient(120deg, transparent 0%, transparent 6rem, white 11rem, transparent 11.15rem, transparent 15rem, rgba(255, 255, 255, 0.3) 20rem, transparent 25rem, transparent 27rem, rgba(255, 255, 255, 0.6) 32rem, white 33rem, rgba(255, 255, 255, 0.3) 33.15rem, transparent 38rem, transparent 40rem, rgba(255, 255, 255, 0.3) 45rem, transparent 50rem, transparent 100%);
    -webkit-background-clip: text;
    background-size: 150% 100%;
    background-repeat: no-repeat;
    animation: shine 5s infinite linear;
}

@keyframes shine {
    0% {
        background-position: 50% 0;
    }
    100% {
        background-position: -190% 0;
    }
}
  }

</style>


