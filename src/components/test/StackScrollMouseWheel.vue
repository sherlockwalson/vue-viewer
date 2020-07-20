<template>

  <div>
    <div class="cornerstone-element-wrapper">
      <div id="firstElement" data-index="0" oncontextmenu="return false" onmousedown="return false"></div>
    </div>
    <p>---------------------------------------------------------------------------</p>
    <div class="cornerstone-element-wrapper">
      <div id="secondElement" data-index="0" oncontextmenu="return false" onmousedown="return false"></div>
    </div>
  </div>
</template>
<link rel="stylesheet" href="../../../static/tool/netlify-example/reset.css" />
<link rel="stylesheet" href="../../../static/tool/netlify-example/app.css" />
<link rel="stylesheet" href="../../../static/tool/netlify-example/icon-classes.css" />
<script src="../../../static/tool/netlify-example/imageLoader.js"></script>
<script src="../../../static/viewportSorce/exampleImageIdLoader.js"></script>
<script src="../../../static/tool/netlify-example/metaDataProvider.js"></script>
<script src="../../../static/viewportSorce/exampleImageIdLoader.js"></script>
<script>
  import screenfull from 'screenfull'
  import * as dicomParser from "dicom-parser";
  import * as cornerstone from "../../../static/viewportSorce/cornerstone.js";
  import * as cornerstoneWADOImageLoader from "../../../static/dist/cornerstoneWADOImageLoader.js";
  // import * as cornerstone from "cornerstone-core";
  import * as cornerstoneMath from "../../../static/dist/cornerstoneMath.js";
  import * as metaDataProvider from "../../../static/tool/netlify-example/metaDataProvider.js";
  import * as hammer from "../../../static/dist/hammer.js";
  import * as cornerstoneTools from 'cornerstone-tools';
  import * as exampleImageIdLoader from "../../../static/viewportSorce/exampleImageIdLoader.js";

  var config = {
    webWorkerPath: "../../../static/dist/cornerstoneWADOImageLoaderWebWorker.js",
    taskConfiguration: {
      decodeTask: {
        codecsPath: "../../../static/dist/cornerstoneWADOImageLoaderCodecs.js"
      }
    }
  };
  //指定要注册加载程序的基石实例
  cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
  cornerstoneTools.external.Hammer = Hammer;
  cornerstoneTools.external.cornerstone = cornerstone;
  cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
  cornerstoneWADOImageLoader.external.cornerstoneMath = cornerstoneMath;
  cornerstoneWADOImageLoader.external.dicomParser = dicomParser
  export default {
    data() {
      return {
        imageIds: [],
        secondSeries: [
          '2C6B550A',
          '2C6B550B',
          '2C6B550C',
          '2C6B550D',
          '2C6B5505',
          '2C6B5506',
          '2C6B5507',
          '2C6B5508',
          '2C6B5509',
          '2C6B5510',
          '2C6B5511',
          '2C6B5512',
          '2C6B5513',
          '2C6B5514',
          '2C6B5515',
          '60FF4BCB',
          '60FF4BCC',
          '60FF4BD0',
          '60FF4BD1',
          '60FF4BD2',
          '60FF4BD3',
          '60FF4BD4',
          '60FF4BD5',
          '60FF4BD6',
          '60FF4BD7',
          '60FF4BD8',
          '60FF4BDA',
          '60FF4BDB',
          '60FF4BDC',
          '60FF4BDD',
          '60FF4BDE'],
        index: 0
      }
    },
    watch: {
    },
    methods: {

    },
    mounted() {
      console.log(cornerstone)
      console.log(cornerstoneTools)
      // Init cornerstone tools
      cornerstoneTools.init()
      
      const scheme = 'wadouri'
      const baseUrl = 'http://localhost:8686/static/image/imagetest/'
      const series = [
        '2C6B550A',
        '2C6B550B',
        '2C6B550C',
        '2C6B550D',
        '2C6B5505',
        '2C6B5506',
        '2C6B5507',
        '2C6B5508',
        '2C6B5509',
        '2C6B5510',
        '2C6B5511',
        '2C6B5512',
        '2C6B5513',
        '2C6B5514',
        '2C6B5515',
        '60FF4BCB',
        '60FF4BCC',
        '60FF4BCD',
        '60FF4BCE'
      ]

      const imageIds = series.map(seriesImage => `${scheme}:${baseUrl}${seriesImage}`)


      const  StackScrollMouseWheelTool = cornerstoneTools.StackScrollMouseWheelTool
      console.log(StackScrollMouseWheelTool)

      //define the stack
      const stack = {
        currentImageIdIndex: 0,
        imageIds
      }
      console.log(stack)
      const element = document.getElementById('secondElement');
      cornerstone.enable(element);
      const a = cornerstone.imageCache.getCacheInfo(element)
      console.log(a)
      for (var i = 0; i < series.length; i++) {
        cornerstone.loadAndCacheImage(imageIds[i]).then(res => {
          //解决ct展示一片黑的情况
          // res.maxPixelValue = 4096
          // res.minPixelValue = 0
          console.log(res)
        })

      }
      // load images and set the stack
      cornerstone.loadImage(imageIds[0]).then((image) => {
        cornerstone.enable(element);
        cornerstone.displayImage(element, image)
        cornerstoneTools.addStackStateManager(element, ['stack'])
        cornerstoneTools.addToolState(element, 'stack', stack)
      })

      cornerstoneTools.addTool(StackScrollMouseWheelTool)
      cornerstoneTools.setToolActive('StackScrollMouseWheel', { })
    }
  }
</script>

<style scoped>
  #firstElement {
    height: 400px;
  }

  #secondElement {
    height: 400px;
  }
</style>