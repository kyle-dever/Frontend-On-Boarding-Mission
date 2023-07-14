<template>
  <teleport to="#modal">
    <div class="backdrop">
      <div class="modal-container">
        <slot></slot>
      </div>
    </div>
  </teleport>
</template>

<script setup></script>

<style>
.backdrop {
  z-index: 1050;
  margin: 0 auto;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #00000033;
}

.modal-container {
  display: flex;
  flex-direction: column;
  justify-items: center;
  margin-top: 10px;
}
</style>
