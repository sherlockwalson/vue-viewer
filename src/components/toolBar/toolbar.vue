<template>

<div>
    <div class="toolbar">
        <ul class="tool-category" data-tool-category="drag">
          <li class="Wwwc">
            <a href="#" data-tool="Wwwc">窗宽窗位</a>
          </li>
          <div class="secondaryMenu">这是二级菜单</div>
          <li><a href="#" data-tool="Zoom">放大</a></li>
          <li><a href="#" data-tool="Pan">移动</a></li>
          <li><a href="#" data-tool="Length">长度</a></li>
          <li><a href="#" data-tool="Angle">角度</a></li>
          <li><a href="#" style="color:red">定位线</a></li>
          <li><a href="#" style="color:red">同步序列</a></li>
          <li><a href="#" style="color:red">播放动画</a></li>
          <li><a href="#" style="color:red">伪彩</a></li>
          <li><a href="#" data-tool="Magnify">放大镜</a></li>
          <li><a href="#" data-tool="DragProbe">探针</a></li>
          <li><a href="#" data-tool="EllipticalRoi">圆形</a></li>
          <li><a href="#" data-tool="RectangleRoi">矩形</a></li>
          <li><a href="#" @click="invertImage">灰度反转</a></li>
          <li><a href="#" data-tool="Rotate">旋转</a></li>
          <li><a href="#" data-tool="ArrowAnnotate">标注</a></li>
          <li><a href="#" @click="TurnAround" >左右翻转</a></li>
          <li><a href="#" @click="UpsideDown">上下翻转</a></li>
          <li><a href="#" data-tool="Eraser">橡皮擦</a></li>
          <li><a href="#" style="color:red">分享</a></li>
          <li><a href="#" @click="fullScreen">全屏</a></li>
          <li><a href="#" style="color:red">重置</a></li>
          <li><a href="#" style="color:red">2dmpr</a></li>
          <li><a href="#" @click= "test" style="color:blue">测试</a></li>
        </ul>
      </div>
</div>
</template>

<script>
export default {

}
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
    font-size:12px;
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
</style>