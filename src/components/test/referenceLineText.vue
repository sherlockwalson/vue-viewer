<template>

  <div>
    <div class="cornerstone-element-wrapper">
      <div id="firstElement" data-index="0" oncontextmenu="return false" onmousedown="return false"></div>
    </div>
    <p>---------------------------------------------------------------------------</p>
    <div class="cornerstone-element-wrapper">
      <div id="secondElement" data-index="0" oncontextmenu="return false" onmousedown="return false"></div>
    </div>
    <button @click="nextPage">下一张</button>
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
        secondSource:[
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
        '60FF4BDE',
        ],
        secondSeries:[
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
        '60FF4BDE',],
        index:0
      }
    },
    watch: {
    },
    methods: {
      nextPage() {
       
       this.secondSeries[0] = this.secondSource[this.index]
       console.log(this.secondSeries)
       this.index ++
       this.referenceLine()
      },
      //定位线
      referenceLine(){
         //初始化基石工具
      cornerstoneTools.init()
      let numImagesLoaded = 0;
      //Enable参考线
      console.log(cornerstone)
      console.log(cornerstoneTools)
      const scheme = 'wadouri'
      const baseUrl = 'http://localhost:8686/static/image/imagetest/'
      // const baseUrl = 'http://localhost:8686/static/image/Dicom/'
      // const baseUrl = 'http://localhost:8686/static/image/'

      // 设置栈数据
      const firstSeries = [
        // 'report'
        'CT'
      ]
      // const firstSeries = [
      //   '016C82BD'
      // ]
      //mr
      // const secondSeries = [
      //   // '4BA29A5E'
      //   // '2C6B604F',
      //   '21D934DC',
      //   'A6BA52DF',
      //   'C79F887D'
      // ]
      const secondSeries = [
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
        '60FF4BCE',
        '60FF4BCF',

      ]
      //ct
      const firstStack = {
        currentImageIdIndex: 0,
        imageIds: firstSeries
          .map(seriesImage => `${scheme}:${baseUrl}${seriesImage}`)
      };
      console.log(firstStack)
      const secondStack = {
        currentImageIdIndex: 0,
        imageIds: secondSeries
          .map(seriesImage => `${scheme}:${baseUrl}${seriesImage}`)
      };

      // 设置同步功能
      const synchronizer = new cornerstoneTools.Synchronizer(
        // 应该触发同步器的Cornerstone事件
        'cornerstonenewimage',
        // Logic that should run on target elements when event is observed on source elements
        cornerstoneTools.updateImageSynchronizer
      )
      const StackScrollMouseWheelTool = cornerstoneTools.StackScrollMouseWheelTool
      // 添加并激活工具
      cornerstoneTools.addTool(cornerstoneTools.StackScrollTool);
      cornerstoneTools.addTool(cornerstoneTools.StackScrollMouseWheelTool);
      cornerstoneTools.setToolActive('StackScroll', { mouseButtonMask: 1 });
      cornerstoneTools.setToolActive('StackScrollMouseWheel', {});
    

      // 加载图片并设置栈
      const firstElement = document.getElementById('firstElement');
      const firstLoadImagePromise = cornerstone.loadImage(firstStack.imageIds[0])
        .then((image) => {
          cornerstone.enable(firstElement);
          cornerstone.displayImage(firstElement, image)

          // 设置工具状态和栈
          synchronizer.add(firstElement)
          // const enabledElement = cornerstone.getEnabledElement(element[0]);
          cornerstoneTools.addStackStateManager(firstElement, ['stack', 'Crosshairs'])
          cornerstoneTools.addToolState(firstElement, 'stack', firstStack)
        })
      const secondElement = document.getElementById('secondElement');
      const secondLoadImagePromise = cornerstone.loadImage(secondStack.imageIds[0])
        .then((image) => {
          cornerstone.enable(secondElement);
          cornerstone.displayImage(secondElement, image)

          // 同上
          synchronizer.add(secondElement);
          cornerstoneTools.addStackStateManager(secondElement, ['stack', 'Crosshairs']);
          cornerstoneTools.addToolState(secondElement, 'stack', secondStack);
        })
      function addReferenceLinesTool() {
        const synchronizer = new cornerstoneTools.Synchronizer('cornerstonenewimage', cornerstoneTools.updateImageSynchronizer);
        // These have to be added to our synchronizer before we pass it to our tool 
        synchronizer.add(firstElement); synchronizer.add(secondElement);
        cornerstoneTools.addTool(StackScrollMouseWheelTool)
        cornerstoneTools.setToolActive('StackScrollMouseWheel', { })
        cornerstoneTools.addTool(cornerstoneTools.ReferenceLinesTool);
        cornerstoneTools.setToolEnabled('ReferenceLines', { synchronizationContext: synchronizer, });
      }
      const handleImageRendered = (evt) => {
        evt.detail.element.removeEventListener('cornerstoneimagerendered', handleImageRendered)
        numImagesLoaded++;
        if (numImagesLoaded === 2) { addReferenceLinesTool(); }
      }
      firstElement.addEventListener('cornerstoneimagerendered', handleImageRendered)
      secondElement.addEventListener('cornerstoneimagerendered', handleImageRendered)
      }

    },
    mounted() {
     
    this.referenceLine()
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