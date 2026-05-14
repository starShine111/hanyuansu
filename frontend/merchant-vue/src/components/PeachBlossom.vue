<template>
  <div class="petal-container">
    <div
        v-for="(petal, index) in petals"
        :key="index"
        class="petal"
        :style="{
        left: petal.left,
        width: petal.width,
        height: petal.height,
        animationDuration: petal.duration + 's',
        animationDelay: petal.delay + 's'
      }"
        @animationend="removePetal(petal.id)"
    ></div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const petals = ref([])
let intervalId = null

const random = (min, max) => {
  return Math.random() * (max - min) + min
}

const addPetal = () => {
  const size = random(15, 25)
  petals.value.push({
    id: Date.now() + Math.random(),
    left: random(0, 100) + '%',
    width: size + 'px',
    height: size * 0.8 + 'px',
    duration: random(6, 12),
    delay: random(0, 5)
  })
}
const removePetal = (id) => {
  const petal = document.querySelector(`.petal[data-id="${id}"]`)
  if (petal) {
    petal.style.opacity = '0'
    setTimeout(() => {
      const idx = petals.value.findIndex(p => p.id === id)
      if (idx !== -1) petals.value.splice(idx, 1)
    }, 200)
  }
}

const startFalling = () => {
  if (intervalId) clearInterval(intervalId)
  const scheduleNext=()=>{
    const count = Math.floor(random(1, 2))
    for (let i = 0; i < count; i++) {
      addPetal()
    }
    intervalId = setTimeout(scheduleNext,random(400,800))
  }
  scheduleNext()
}

const stopFalling = () => {
  if (intervalId) {
    clearTimeout(intervalId)
    intervalId = null
  }
  petals.value = []
}

onMounted(() => {
  startFalling()
})

onUnmounted(() => {
  stopFalling()
})
</script>

<style scoped>
.petal-container {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  overflow: hidden;
  z-index: 9999;
  transition: opacity 0.2s ease;
}

.petal {
  position: absolute;
  top: -20px;
  background: linear-gradient(135deg, #ffb7c5, #ff69b4);
  border-radius: 50% 50% 50% 0;
  opacity: 0.7;
  transform-origin: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  animation: fall linear forwards;
}

@keyframes fall {
  0% {
    transform: translateY(-30px) translateX(0px) rotate(0deg);
    opacity: 0;
  }
  10% {
    transform: translateY(10vh) translateX(8px) rotate(15deg);
    opacity: 0.9;
  }
  20% {
    transform: translateY(20vh) translateX(-6px) rotate(30deg);
    opacity: 0.9;
  }
  30% {
    transform: translateY(30vh) translateX(12px) rotate(50deg);
    opacity: 0.9;
  }
  40% {
    transform: translateY(42vh) translateX(-10px) rotate(70deg);
    opacity: 0.85;
  }
  50% {
    transform: translateY(54vh) translateX(8px) rotate(95deg);
    opacity: 0.85;
  }
  60% {
    transform: translateY(66vh) translateX(-6px) rotate(125deg);
    opacity: 0.8;
  }
  70% {
    transform: translateY(78vh) translateX(10px) rotate(160deg);
    opacity: 0.7;
  }
  80% {
    transform: translateY(88vh) translateX(-5px) rotate(200deg);
    opacity: 0.55;
  }
  90% {
    transform: translateY(98vh) translateX(3px) rotate(250deg);
    opacity: 0.35;
  }
  95% {
    transform: translateY(105vh) translateX(0px) rotate(290deg);
    opacity: 0.2;
  }
  100% {
    transform: translateY(110vh) translateX(0px) rotate(330deg);
    opacity: 0;
  }
}
</style>