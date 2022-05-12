<script setup>
import { ref, onMounted } from "vue";
import * as pdfjs from "pdfjs-dist";
import * as workerSrc from "pdfjs-dist/build/pdf.worker.entry";
pdfjs.workerSrc = workerSrc;

const pdfHolderRef = ref([]);
const pages = ref([]);

onMounted(async () => {
  console.log(`current-time ${Date.now()}: onMounted`);
  const pdf = await pdfjs.getDocument({ url: "/jmyf.pdf" }).promise;
  console.log(`current-time ${Date.now()} pdf.numPages: `, pdf.numPages);
  pages.value = Array.from({ length: pdf.numPages });
  let winW = document.documentElement.clientWidth * 0.9;
  let winH = document.documentElement.clientHeight * 0.9;

  pages.value.forEach((i, j) => {
    const k = j + 1;
    pdf.getPage(k).then(function(page) {
      // 获取原始大小的数据
      var viewport = page.getViewport({
        scale: 1
      });

      let scale = (winW / viewport.width).toFixed(2);

      if (viewport.width / viewport.height < winW / winH) {
        scale = (winH / viewport.height).toFixed(2);
      }
      viewport = page.getViewport({
        scale: scale
      });
      var canvas = document.createElement("canvas");
      pdfHolderRef.value[j].appendChild(canvas);
      var context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      // 创建了一个canvas画板用来存放
      var renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      page.render(renderContext);
    });
  });
});
</script>

<template>
  <div ref="pdfWrapRef" class="pdf-wrap">
    <div
      v-for="(i, j) in pages"
      :key="j"
      :ref="ele =>pdfHolderRef.push(ele) "
      :class="['pdf-holder', `pdf-holder-${j}`]"
    ></div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}

.pdf-wrap {
  width: 100vw;
  height: 100vh;
}

.pdf-holder {
  width: 90vw;
  margin: 0 auto 12px;
  overflow: hidden;
  font-size: 0;
  box-shadow: 0 0 10px #a9a9a9;
}
</style>
