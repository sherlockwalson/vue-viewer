<template>
    <div class="custom-style">
      <ul class="wall-row" ref="wallRow" @mouseenter="direct($event)" @mouseleave="clearSelect">
        <li
          v-for="(item, index) in divList"
          :key="index"
          @mouseenter="getMousePlace(index)"
          @click="selected"
        ></li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isBlur: {
        type: Boolean
      }
    },
    data() {
      return {
        divList: [], // 方格列表数组
        rows: 1, // 行
        cols: 1, // 列
        isLeftTop: true, // 鼠标是否从左上方进入
        isSelected: false, // 是否选中电视墙行列
        isOn: false
      };
    },
    created() {
      this.divList.length = 9; // 方格个数 10*10
    },
    mounted() {
      this.autoSelect();
    },
    methods: {
      // 自动根据vuex中行列选中对应方格
      autoSelect() {
        this.rows = 1;
        this.cols = 1;
        this.selectRowCol(this.rows, this.cols);
      },
      // 获取鼠标进入方格的位置，进行背景渲染
      getMousePlace(index) {
        this.isOn = true;
        if (!this.isLeftTop || this.isSelected) {
          return;
        }
        const x = Math.floor(index % 3);
        const y = Math.floor(index / 3);
        const children = this.$refs.wallRow.children;
        for (let i = 0; i < this.divList.length; i++) {
          const childrenx = Math.floor(i % 3);
          const childreny = Math.floor(i / 3);
          if (childrenx < x + 1 && childreny < y + 1) {
            children[i].className = "bgColor";
            this.rows = x + 1;
            this.cols = y + 1;
          } else {
            children[i].className = "";
          }
        }
      },
      // 当鼠标移出选择区域，如未选定行列，则重置方格 1*1
      clearSelect() {
        this.isOn = false;
        if (this.isSelected) {
          return;
        }
        const children = this.$refs.wallRow.children;
        for (let i = 0; i < this.divList.length; i++) {
          if (i != 0) {
            children[i].className = "";
          }
        }
        this.rows = 1;
        this.cols = 1;
      },
      // 选定行列
      selected(index) {
        this.isSelected = true;
        const data = {
          rows: this.rows,
          cols: this.cols
        };
        this.$emit('selectRowsAndCols', data)
        //将获取到的列和行放到vuex中做持久化处理
        this.$store.commit('colsAndRows',data)
        this.cancel()
        // this.$emit('dispalyDicom')
      },
      // 判断鼠标是否从左上进入
      direct(e) {
        const x = e.offsetX - 230 / 2; //鼠标进入的X坐标-盒子宽度的一半
        const y = e.offsetY - 230 / 2; //鼠标进入的y坐标-盒子宽度的一半
        const direction =
          (Math.round((Math.atan2(y, x) * (180 / Math.PI) + 180) / 90) + 3) % 4;
        if (direction === 0) {
          this.isLeftTop = true;
        } else if (direction === 1) {
          this.isLeftTop = false;
        } else if (direction === 2) {
          this.isLeftTop = false;
        } else {
          this.isLeftTop = true;
        }
      },
      // 点击取消，重置方格 1*1
      cancel() {
        const children = this.$refs.wallRow.children;
        for (let i = 0; i < this.divList.length; i++) {
          if (i != 0) {
            children[i].className = "";
          }
        }
        this.rows = 1;
        this.cols = 1;
        this.isSelected = false;
      },
      // 改变行列数
      handleTypeChange() {
        this.selectRowCol(this.rows, this.cols);
        this.isSelected = true;
      },
      // 渲染方格
      selectRowCol(rows, cols) {
        const children = this.$refs.wallRow.children;
        for (let i = 0; i < this.divList.length; i++) {
          const childrenx = Math.floor(i % 3);
          const childreny = Math.floor(i / 3);
          if (childrenx < rows && childreny < cols) {
            children[i].className = "bgColor";
          } else {
            children[i].className = "";
          }
        }
      },
      // 点击保存，将数据同步到vuex，并关闭下拉框
      save() {
        const data = {
          rows: this.rows,
          cols: this.cols
        };
      }
    }
  };
  </script>
  
  <style scoped lang="css">
  .custom-style {
    margin: 0;
    padding: 0;
    height: 120px;
    width: 120px;

  }
  
  .word {
    display: block;
    width: 100%;
    height: 20px;
    font-size: 13px;
    background-color: #e2eef6;
  }
  .word span {
    line-height: 20px;
    text-align: center;
  }
  
  .wall-row {
    width: 120px;
    height: 120px;
    padding: 0;
    margin: 0;
    display: block;
    position: relative;
  }
  
  .wall-row li {
    list-style: none;
    width: 39px;
    height: 40px;
    border: 0.5px solid #fff;
    float: left;
    background-color: #ebf0f4;
  }
  
  .wall-row .bgColor {
    background-color: #00b4ff;
  }
  
  .word-cancel {
    width: 100%;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  </style>