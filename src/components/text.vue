<template>
 
  <div>
    <li><a href="#" @click="test">角度</a></li>
    <div v-for="(item,index) in imageIds" :key="index" class=".cornerstone-element" ref="thumbnails"
      oncontextmenu="return false" onmousedown="return false">
    </div>
  </div>
</template>
<link rel="stylesheet" href="../../static/tool/netlify-example/reset.css" />
<link rel="stylesheet" href="../../static/tool/netlify-example/app.css" />
<link rel="stylesheet" href="../../static/tool/netlify-example/icon-classes.css" />
<script src="../../static/tool/netlify-example/imageLoader.js"></script>
<script src="../../static/viewportSorce/exampleImageIdLoader.js"></script>
<script src="../../static/tool/netlify-example/metaDataProvider.js"></script>
<script src="../../static/viewportSorce/exampleImageIdLoader.js"></script>
<script>
  import screenfull from 'screenfull'
  import * as dicomParser from "dicom-parser";
  import * as cornerstone from "../../static/viewportSorce/cornerstone.js";
  import * as cornerstoneWADOImageLoader from "../../static/dist/cornerstoneWADOImageLoader.js";
  // import * as cornerstone from "cornerstone-core";
  import * as cornerstoneMath from "../../static/dist/cornerstoneMath.js";
  import * as metaDataProvider from "../../static/tool/netlify-example/metaDataProvider.js";
  import * as hammer from "../../static/dist/hammer.js";
  import * as cornerstoneTools from 'cornerstone-tools';
  import * as exampleImageIdLoader from "../../static/viewportSorce/exampleImageIdLoader.js";

  var config = {
    webWorkerPath: "../../static/dist/cornerstoneWADOImageLoaderWebWorker.js",
    taskConfiguration: {
      decodeTask: {
        codecsPath: "../../static/dist/cornerstoneWADOImageLoaderCodecs.js"
      }
    }
  };
  //指定要注册加载程序的基石实例
  cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
  cornerstoneTools.external.Hammer = Hammer;
  cornerstoneTools.external.cornerstone = cornerstone;
  cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
  cornerstoneWADOImageLoader.external.cornerstoneMath = cornerstoneMath;
  export default {
    data() {
      return {
      imageIds:[]
      }
    },
    watch: {
      imageIds() {
                this.$nextTick(() => {
                    this.initThumbnail()
                })
            },
        },
    methods: {
      getImageIds(){
        for(var i = 0;i<1000;i++){
          // this.imageIds.push('http://localhost:8686/static/image/4BA29A5E')
          this.imageIds.push('example://1')
        }
          console.log(this.imageIds)
      },
      initThumbnail() {
        console.log(1)
        let thumbnail = []
        if (this.$refs.thumbnails != undefined) {
          thumbnail = this.$refs.thumbnails
        }
        thumbnail.forEach((item, index) => {
          cornerstone.enable(item)
          this.displayThumbnail(item, index)
        })
      },
      displayThumbnail(item, index) {
        let url = this.imageIds[index]
        // console.log(url)
        // // 拼接url
        // url = "wadouri:" + url;
        // console.log(url)
        // 调用这个函数加载像,和激活工具
        this.loadAndViewImage(url, index, item);
      },
      //当点击加载图像时 调用 loadAndViewImage 加载 Dicom 图像
      loadAndViewImage(imageId, index, item) {
        console.log(item)
        console.log(index)
        //找到 要放置 Dicom Image 的元素
        // cornerstone.loadAndCacheImage 函数 负责加载图形 需要 图像地址 imageId
        cornerstone.loadAndCacheImage(imageId).then(
          function (image) {
            var viewport = cornerstone.getDefaultViewportForImage(item, image);
            cornerstone.displayImage(item, image, viewport);
          },
          function (err) {
            // alert(err);
          }
        );
      },
      getTime(){
         var loadTime = window.performance.timing.domContentLoadedEventEnd-window.performance.timing.navigationStart; 
         console.log('Page load time is '+ loadTime);
      },
      test() {
        cornerstoneTools.init();

// Enable any elements, and display images
// ...

// Add our tool, and set it's mode
const AngleTool = cornerstoneTools.AngleTool;
console.log(AngleTool)
cornerstoneTools.addTool(AngleTool)
cornerstoneTools.setToolActive('Angle', { mouseButtonMask: 1 })
        // const element = document.querySelectorAll('.cornerstone-element');
        // cornerstone.enable(element[0]);
        // let viewport = cornerstone.getViewport(element[0]);
        // console.log(viewport)
        // cornerstone.setViewport(element[0], viewport);
        // // Init cornerstone tools

      }
    },
    mounted(){
      // this.initThumbnail()
     this.getImageIds()
      this.getTime()
    }

  }
</script>

<style scoped>

</style>