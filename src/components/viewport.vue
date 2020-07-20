<template>

  <div id="app">
    <!-- 工具栏部分开始 -->
    <div class="toolbar">
      <ul class="tool-category" data-tool-category="drag">
        <li class="layoutButton"><a href="#" @click="layout" style="color:red">布局</a></li>
        <div>
          <SelectWwwc v-show="selectWwwcShow" v-on:dispalyDicom='dispalyDicom' />
        </div>
        <li class="Wwwc">
          <a href="#" data-tool="Wwwc" @click="selectWwwc">窗宽窗位</a>
        </li>
        <div class="secondaryMenu" v-show="secondaryMenuShow">
          <li> <a href="#" data-tool="Wwwc" @click="resetWwwCViewport">窗宽窗位</a></li>
          <li> <a href="#" data-tool="WWWCRegion">选择对比度</a></li>
          <li> <a href="#">脑部</a></li>
          <li> <a href="#">肺部</a></li>
          <li> <a href="#">腹部</a></li>
          <li> <a href="#">骨骼</a></li>
          <li> <a href="#"></a>软组织</a></li>
        </div>
        <li><a href="#" data-tool="Zoom">放大</a></li>
        <li><a href="#" data-tool="Pan">移动</a></li>
        <li><a href="#" data-tool="Length">长度</a></li>
        <li><a href="#" @click="Angle">角度</a></li>
        <li><a href="#" data-tool="ReferenceLines">定位线</a></li>
        <li><a href="#" >同步序列</a></li>
        <li><a href="#" style="color:red">播放动画</a></li>
        <li><a href="#" @click="colorMap">伪彩</a></li>
        <li><a href="#" data-tool="Magnify">放大镜</a></li>
        <li><a href="#" data-tool="DragProbe">探针</a></li>
        <li><a href="#" data-tool="EllipticalRoi">圆形</a></li>
        <li><a href="#" data-tool="RectangleRoi">矩形</a></li>
        <li><a href="#" @click="invertImage">灰度反转</a></li>
        <li><a href="#" data-tool="Rotate">旋转</a></li>
        <li><a href="#" data-tool="ArrowAnnotate">标注</a></li>
        <li><a href="#" @click="TurnAround">左右翻转</a></li>
        <li><a href="#" @click="UpsideDown">上下翻转</a></li>
        <li><a href="#" data-tool="Eraser">橡皮擦</a></li>
        <li><a href="#" style="color:red">分享</a></li>
        <li><a href="#" @click="fullScreen">全屏</a></li>
        <li><a href="#" @click="resetViewport" style="color:red">重置</a></li>
        <li><a href="#" style="color:red">2dmpr</a></li>
        <li><a href="#" @click="test" style="color:blue">测试</a></li>
        <!-- <li v-for='(item,index) in toolList' :key="index" :data-tool="item.toolName">{{item.name}}</li> -->
      </ul>
    </div>
    <!-- 工具栏部分结束 -->
    <div class="mainContainer">
      <!-- 侧边栏部分开始 -->
      <div class="sidepanel">
        <Sidepanel v-on:choose="choose" />
      </div>
      <!-- 侧边栏部分结束 -->
      <!-- 主页面展示开始 -->
      <div class="cornerstone-element-wrapper">
        <a href="#" class="save-btn" data-index="0">Save</a>
        <div class="cornerstone-element" data-index="0" oncontextmenu="return false" onmousedown="return false">></div>
      </div>
      <!-- 布局的组件 -->
      <!-- <Layout v-on:dispalyDicom="dispalyDicom"  v-on:getDicomData="getDicomData" /> -->
      <!-- <Layout  /> -->

      <!-- 主页面展示结束 -->
      <div class="col-xs-2">
        <label for="colormaps"> Colormap </label>
        <select id="colormaps" style="width:100%">
          <option value="">Select...</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
  //使用cornerstone工具需要引入的相关，待优化
  window.cornerstoneTools ||
    document.write(
      '<script src="https://unpkg.com/cornerstone-tools">\x3C/script>'
    );
</script>
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
  cornerstoneWADOImageLoader.webWorkerManager.initialize(config);
  //指定要注册加载程序的基石实例
  cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
  cornerstoneWADOImageLoader.external.dicomParser = dicomParser
  cornerstoneTools.external.Hammer = Hammer;
  cornerstoneTools.external.cornerstone = cornerstone;
  cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
  cornerstoneWADOImageLoader.external.cornerstoneMath = cornerstoneMath;
  import Sidepanel from './sidePanel/sidepanel'
  import Toolbar from './toolBar/toolbar'
  import Layout from './layout/layout'
  import SelectWwwc from './layout/selectWwwc'
  import store from '../store/store'
  import { mapState, mapActions } from "vuex";
  export default {
    components: {
      Sidepanel, Toolbar, Layout, SelectWwwc
    },
    data() {
      return {
        //工具栏的数据
        toolList: [
          { toolName: 'Wwwc', name: "窗宽窗位" },
          { toolName: 'Wwwc', name: "窗宽窗位" },
          { toolName: 'Zoom', name: "放大" },
          { toolName: 'Pan', name: "移动" },
          { toolName: 'Length', name: "长度" },
          { toolName: 'Angle', name: "角度" },
          { toolName: 'Wwwc', name: "角度" },
          { toolName: 'ReferenceLinesTool', name: "窗宽窗位" },
          { toolName: 'Wwwc', name: "窗宽窗位" },
          { toolName: 'Wwwc', name: "窗宽窗位" },
          { toolName: 'Wwwc', name: "窗宽窗位" }
        ],
        //当前展示的缩略图
        currentImage: '',
        //当前展示的dicom
        imageIds: [
          ''
        ],
        //是否全屏
        isFullscreen: false,
        // 控制二级菜单
        secondaryMenuShow: false,
        //控制布局的二级菜单（待优化）
        selectWwwcShow: false,
        //selectWwwc子组件获取的行与列的数据
        rowsAndColsData: {},
        //测试定位线功能的数据
        firstStack:{
          imageIds:["wadouri:http://localhost:8686/static/image/4BA29A5E"]
        },
        secondStack:{
          imageIds:["wadouri:http://localhost:8686/static/image/21D934DC",
          "wadouri:http://localhost:8686/static/image/016C82BD",
          "wadouri:http://localhost:8686/static/image/E80C3A9C",
          ]
        }
      
          
        

      };
    },
    methods: {
      //sidePanel子组件传递点击当前缩略图的相关信息
      choose(url) {
        url = "wadouri:" + url;
        this.imageIds[0] = url;
        this.dispalyDicom()
      },
      dispalyDicom() {
        cornerstoneTools.init([
          {
            moduleName: 'globalConfiguration',
            configuration: {
              showSVGCursors: true
            }
          },
          {
            moduleName: 'segmentation',
            configuration: {
              outlineWidth: 2
            }
          }
        ]);
        const configuration = {
          markers: ['F5', 'F4', 'F3', 'F2', 'F1'],
          current: 'F5',
          ascending: true,
          loop: true,
        }
        //直接以dicom文件格式展示
        const imageIds = this.imageIds
        //待优化：以base64位进行展示时伪彩功能可以使用
        // const imageIds = ['example://1', 'example://2', 'example://3'];
        const stack = {
          currentImageIdIndex: 0,
          imageIds: imageIds,
        };

        const elements = document.querySelectorAll('.cornerstone-element');
        console.log(elements)
        Array.from(elements).forEach(element => {
          cornerstone.enable(element);
          element.tabIndex = 0;
          element.focus();

          cornerstone.loadImage(imageIds[0]).then(function (image) {
            cornerstoneTools.addStackStateManager(element, ['stack']);
            cornerstone.displayImage(element, image);
            cornerstoneTools.addToolState(element, 'stack', stack);
          });

          //Save As Tool//点击下载按钮，下载图片
          const index = element.getAttribute('data-index');
          const saveBtn = element.parentElement.querySelector(
            `a[data-index='${index}']`
          );
          // saveBtn.addEventListener('click', evt => {
          //   cornerstoneTools.SaveAs(element, 'viewportImage.png');
          // });

          // Log measurement events
          const { EVENTS } = cornerstoneTools;
          const log = event => {
            const type = `MEASUREMENT_${event.type
              .replace('cornerstonetoolsmeasurement', '')
              .toUpperCase()}`;
            const color = {
              MEASUREMENT_ADDED: '#27e',
              MEASUREMENT_MODIFIED: '#e72',
              MEASUREMENT_COMPLETED: '#5b5',
              MEASUREMENT_REMOVED: '#f55',
            }[type];

            const getData = detail => {
              const { measurementData = {} } = detail;
              const out = {};
              const measurementKeys = [
                'length',
                'rAngle',
                'value',
                'text',
                'str',
                'text',
                'longestDiameter',
                'shortestDiameter',
              ];

              if (measurementData.cachedStats) {
                Object.keys(measurementData.cachedStats).forEach(key => {
                  out[key] = measurementData.cachedStats[key];
                });
              }

              measurementKeys.forEach(key => {
                if (key in measurementData) {
                  out[key] = measurementData[key];
                }
              });

              if (Object.keys(out).length === 0) {
                return measurementData;
              } else {
                return JSON.stringify(out);
              }
            };

            console.log(
              '%c %s %c %s %c %o',
              `background: ${color}; color: white; padding: 4px 0;`,
              type,
              // The tool type
              `color: ${color}; font-family: monospace;`,
              event.detail.toolInteraction || event.detail.toolName,
              '',
              getData(event.detail)
              // event.detail
            );
          };
          element.addEventListener(EVENTS.MEASUREMENT_ADDED, log);
          element.addEventListener(EVENTS.MEASUREMENT_MODIFIED, log);
          element.addEventListener(EVENTS.MEASUREMENT_COMPLETED, log);
          element.addEventListener(EVENTS.MEASUREMENT_REMOVED, log);
        });
        //
        // Iterate over all tool-category links
        const toolCategoryLinks = document.querySelectorAll(
          'ul.tool-category-list a'
        );
        const toolCategorySections = document.querySelectorAll('ul.tool-category');
        Array.from(toolCategoryLinks).forEach(link => {
          //
          const categoryName = link.getAttribute('data-category');
          const categoryElement = document.querySelector(
            `section[data-tool-category="${categoryName}"]`
          );

          // Setup listener
          link.addEventListener('click', evt => {
            evt.preventDefault();
            setToolCategoryActive(categoryName);
          });
        });

        // Iterate over all tool buttons
        const toolButtons = document.querySelectorAll('a[data-tool]');
        Array.from(toolButtons).forEach(toolBtn => {
          // Add the tool
          const toolName = toolBtn.getAttribute('data-tool');
          const apiTool = cornerstoneTools[`${toolName}Tool`];

          if (apiTool) {
            cornerstoneTools.addTool(apiTool);
          } else {
            console.warn(`unable to add tool with name ${toolName}Tool`);
          }

          // Setup button listener
          // Prevent right click context menu for our menu buttons
          toolBtn.addEventListener(
            'contextmenu',
            event => event.preventDefault(),
            true
          );
          // Prevent middle click opening a new tab on Chrome & FF
          toolBtn.addEventListener(
            'auxclick',
            event => {
              if (event.button && event.button === 1) {
                event.preventDefault();
              }
            },
            false
          );
          toolBtn.addEventListener('mousedown', evt => {
            const mouseButtonMask = evt.buttons
              ? evt.buttons
              : convertMouseEventWhichToButtons(evt.which);

            const toolInteraction = evt.target.getAttribute('data-tool-interaction');
            setButtonActive(toolName, mouseButtonMask, toolInteraction);
            cornerstoneTools.setToolActive(toolName, {
              mouseButtonMask,
              isTouchActive: true,
            });

            evt.preventDefault();
            evt.stopPropagation();
            evt.stopImmediatePropagation();
            return false;
          });
        });

        // Iterate through swtich ON/OFF tools
        const stateTools = document.querySelectorAll('input[type="checkbox"]');
        Array.from(stateTools).forEach(toolCheckBox => {
          const toolName = toolCheckBox.getAttribute('data-tool');
          const toolLabel = document.querySelector(`#${toolName}`);
          const apiTool = cornerstoneTools[`${toolName}Tool`];

          if (apiTool) {
            cornerstoneTools.addTool(apiTool);
          }

          cornerstoneTools.setToolDisabled(toolName);

          toolCheckBox.addEventListener('change', evt => {
            if (evt.currentTarget.checked) {
              cornerstoneTools.setToolEnabled(toolName);
            } else {
              cornerstoneTools.setToolDisabled(toolName);
            }

            const toolLabelId =
              toolName.charAt(0).toLowerCase() + toolName.slice(1);
            const toolLabel = document.querySelector(`#${toolLabelId}`); //scaleOverlay or overlay
            toolLabel.classList.toggle('turned-on');
          });
        });
        // Activate first tool
        cornerstoneTools.setToolActive(
          cornerstoneTools.store.state.tools[0].name,
          {
            mouseButtonMask: 1,
            isTouchActive: true,
          }
        );

        const setToolCategoryActive = categoryName => {

          Array.from(toolCategoryLinks).forEach(toolLink => {
            if (categoryName === toolLink.getAttribute('data-category')) {
              toolLink.classList.remove('active');
              toolLink.classList.add('active');
            } else {
              toolLink.classList.remove('active');
            }
          });
          Array.from(toolCategorySections).forEach(toolCategorySection => {
            if (
              categoryName ===
              toolCategorySection.getAttribute('data-tool-category')
            ) {
              toolCategorySection.classList.remove('active');
              toolCategorySection.classList.add('active');
            } else {
              toolCategorySection.classList.remove('active');
            }
          });
        };

        function setButtonActive(toolName, mouseButtonMask, toolInteraction) {
          Array.from(toolButtons).forEach(toolBtn => {
            // Classes we need to set & remove
            let mouseButtonIcon = `mousebutton-${mouseButtonMask}`;
            let touchIcon = `touch-1`;

            // Update classes depending on the toolInteraction we clicked
            if (toolInteraction === 'none') {
              return;
            } else if (toolInteraction === 'multitouch') {
              mouseButtonIcon = null;
              touchIcon = 'touch-2';
            } else if (toolInteraction === 'pinch') {
              mouseButtonIcon = null;
              touchIcon = 'touch-pinch';
            } else if (toolInteraction === 'wheel') {
              mouseButtonIcon = 'mousebutton-wheel';
              touchIcon = null;
            }
            // Update our target button
            if (toolName === toolBtn.getAttribute('data-tool')) {
              toolBtn.className = '';
              toolBtn.classList.add('active');
              if (mouseButtonIcon) {
                toolBtn.classList.add(mouseButtonIcon);
              }
              if (touchIcon) {
                toolBtn.classList.add(touchIcon);
              }
              // Remove relevant classes from other buttons
            } else {
              if (mouseButtonIcon && toolBtn.classList.contains(mouseButtonIcon)) {
                toolBtn.classList.remove(mouseButtonIcon);
              }
              if (touchIcon && toolBtn.classList.contains(touchIcon)) {
                toolBtn.classList.remove(touchIcon);
              }
              if (
                toolBtn.classList.length === 1 &&
                toolBtn.classList[0] === 'active'
              ) {
                toolBtn.classList.remove('active');
              }
            }
          });
        };

        //   // Find all and configure each textMarkers
        //   const textMarkerTools = cornerstoneTools.store.state.tools.forEach(
        //     element => {
        //       if (element.name === 'TextMarker') {
        //         element.configuration.markers = ['F5', 'F4', 'F3', 'F2', 'F1'];
        //         element.configuration.current = 'F5';
        //         element.configuration.ascending = true;
        //         element.configuration.loop = true;
        //       }
        //     }
        //   );
        const convertMouseEventWhichToButtons = which => {
          switch (which) {
            // no button
            case 0:
              return 0;
            // left
            case 1:
              return 1;
            // middle
            case 2:
              return 4;
            // right
            case 3:
              return 2;
          }
          return 0;
        };

      },
      //获取页面首次加载时的数据
      getDicomData() {
        // 首次加载页面时发送请求，获得首次加载的dicom
        this.axios.get('http://localhost:8686/static/json/dicom.json').then(response => {
          const url = "wadouri:" + response.data.dicom.dicoms[0]
          this.imageIds[0] = url;
          this.dispalyDicom()
        }, response => {
          console.log("error");
        });
      },
      //布局
      layout() {
        this.selectWwwcShow = true
      },
      //子组件触发的函数
      selectRowsAndCols(item){
            console.log(item)
            this.rows = this.$store.state.parameterColAndRow.rows
            this.cols = this.$store.state.parameterColAndRow.cols
            
        },
      //设置全屏
      fullScreen() {
        if (!screenfull.isEnabled) { // 如果不允许进入全屏，发出不允许提示
          return false
        }
        screenfull.toggle()
      },
      //灰度翻转
      invertImage() {
        const element = document.querySelectorAll('.cornerstone-element');
        cornerstone.enable(element[0]);
        let viewport = cornerstone.getViewport(element[0]);
        viewport.invert = !viewport.invert;
        cornerstone.setViewport(element[0], viewport);
      },
      //左右翻转
      TurnAround() {
        const element = document.querySelectorAll('.cornerstone-element');
        cornerstone.enable(element[0]);
        let viewport = cornerstone.getViewport(element[0]);
        viewport.hflip = !viewport.hflip
        // viewport.translation.x = 180
        cornerstone.setViewport(element[0], viewport);
      },
      //上下翻转
      UpsideDown() {
        const element = document.querySelectorAll('.cornerstone-element');
        cornerstone.enable(element[0]);
        let viewport = cornerstone.getViewport(element[0]);
        viewport.vflip = !viewport.vflip
        cornerstone.setViewport(element[0], viewport);
      },
      //控制二级弹窗显示
      selectWwwc() {
        this.secondaryMenuShow = !this.secondaryMenuShow
      },
      //伪彩功能
      colorMap() {
        function fillColormapsList() {
          const dropdown = document.getElementById('colormaps');
          const colormapsList = cornerstone.colors.getColormapsList();

          const addOption = function (id, name, disabled) {
            const option = document.createElement("OPTION");
            option.value = id;
            option.textContent = name;
            option.disabled = !!disabled;
            dropdown.append(option);
          };

          colormapsList.forEach(function (colormapItem) {
            addOption(colormapItem.id, colormapItem.name);
          });

          // Horizontal Line
          // addOption('', '──────────', true);

          // addOption('custom', 'Custom');
        }
        fillColormapsList();
        function colormapChanged() {
          //获取元素，初始化
          const element = document.querySelectorAll('.cornerstone-element');
          cornerstone.enable(element[0]);
          const viewport = cornerstone.getViewport(element[0]);
          //获取伪彩色表
          // const colormapsList = cornerstone.colors.getColormapsList();
          // console.log(colormapsList)
          //伪彩步骤1
          const colormapId = document.getElementById('colormaps').value;
          let colormap;
          colormap = cornerstone.colors.getColormap(colormapId);
          //伪彩步骤2
          viewport.colormap = colormap;
          cornerstone.setViewport(element[0], viewport);
          cornerstone.updateImage(element[0], true);
        }
        document.getElementById('colormaps').addEventListener('change', colormapChanged);


      },
      //重置窗宽窗位视图区域恢复原始状态
      resetWwwCViewport() {
        const element = document.querySelectorAll('.cornerstone-element');
        cornerstone.addEnabledElement(element[0])
        cornerstone.enable(element[0]);
        const enabledElement = cornerstone.getEnabledElement(element[0]);
        console.log(cornerstone)
        enabledElement.viewport = cornerstone.getDefaultViewport(enabledElement.canvas, enabledElement.image);
        cornerstone.updateImage(element[0]);
      },
      //清除相关工具，重置视图区域
      resetViewport() {
        console.log(cornerstone)
        console.log(cornerstoneTools)
        const element = document.querySelectorAll('.cornerstone-element');
        cornerstone.enable(element[0]);
        let viewport = cornerstone.getViewport(element[0]);
        console.log(viewport)
        cornerstone.reset(element[0], viewport);
      },
      //测试网页加载完成的速度
      getTime() {
        var loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
        console.log('Page load time is ' + loadTime);
      },
      //角度工具
      Angle() {
        cornerstoneTools.init();
        const AngleTool = cornerstoneTools.AngleTool;
        cornerstoneTools.addTool(AngleTool)
        cornerstoneTools.setToolActive('Angle', { mouseButtonMask: 1 })
      },
      //定位线功能
      //相关的测试功能
      test() {

      }
    },
    mounted() {
      //获取首次加载的数据
      this.getDicomData(),
      this.getTime()
    },
    computed: {

      }
  };
</script>

<style scoped>
  .toolbar {
    width: 100%;
    height: 40px;
    background-color: #000;
    border: 1px solid #d6e9ca;

  }

  .toolbar ul {
    display: flex;
    width: 100%;
    height: 40px;
    padding: 0;
    margin: 0;
    justify-content: center;
    font-size: 12px;
  }

  li {
    list-style: none;
    flex: 1;
    line-height: 42px;
    background-color: #000;
    margin-left: 10px;
  }

  a {
    text-decoration: none;
    color: #d6e9ca;

  }

  .cornerstone-element {
    height: 900px;
  }

  .mainContainer {
    display: flex;
    background-color: #000;
    height: 100%;
    width: 100%;
    justify-content: space-between;
  }

  .sidepanel {
    flex: 1;
    display: flex;
    justify-content: center;
    overflow: auto;
    overflow-x: hidden;
    height: 920px;
    min-width: 300px;
  }

  .cornerstone-element-wrapper {
    flex: 5;
    background-color: #333;
  }

  .sidepanel:after {
    /*伪元素是行内元素 正常浏览器清除浮动方法*/
    content: "";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }

  .Wwwc {
    position: relative;
  }

  .secondaryMenu {
    position: absolute;
    display: flex;
    top: 40px;
    left: 20px;
    background-color: #000;
    height: 60px;
    border: 1px solid #d6e9ca;
    color: #d6e9ca;
    justify-items: flex-start;
    border-radius: 20px;
    overflow: hidden;
  }

  .secondaryMenu li {
    width: 60px;
    line-height: 60px;
    ;
  }

  /* 设置滚动条的样式 */
  ::-webkit-scrollbar {
    width: 12px;
    background-color: #000;
  }

  /* 滚动槽 */
  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  /* 滚动条滑块 */
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #d6e9ca;
  }
</style>