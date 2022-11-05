<template> 
    <div class="icon-blocks" style="width: 100%">
        <div v-for="genre in genres" class="block">
            <div class="image-container">
                <el-image style="width: 250px; height: 150px" class="rounded-image" :src="url" alt="Snow"/>
                <div class="text-container">{{genre}}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const genres = ['ROCK', 'POP', 'LATVIAN', 'RAP']
const url = "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
</script>

<style scoped> 
.icon-blocks {
  padding: 300px 0;
  display: inline-block;
  box-sizing: border-box;
}

.block {
  padding: 30px 0;
  display: inline-block;
  width: 25%;
  box-sizing: border-box;
  vertical-align: middle;
}

.rounded-image { 
    border-radius: 50%; 
}

.image-container {
  position: relative;
  text-align: center;
  color: white;
}

.text-container {
  position: absolute;
  top: -10%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: x-large;
  background-color: white;
  color: black;
}
</style>
