<template>
<!-- 此组件希望通过控制宽的长度来控制主体展示区域的展示样式 -->
<div>
    <!-- <div class="layout">
        <span>布局</span>
      这是控制展示几行几列的部分
      <SelectWwwc  v-on:selectRowsAndCols="selectRowsAndCols"/>
    </div> -->
<!-- 这是主题展示部分 -->
 <button @click="changeXAndY">{{this.cols}}</button>
 <button @click="changeXAndY">{{this.rows}}</button>
 
 <div class="layout">
    <div class="cornerstone-element-wrapper" v-for="(item,index) in rows" :key="index":style="styleObject"  oncontextmenu="return false" onmousedown="return false">
        <div class="cornerstone-element" data-index="0" v-for="(item,index) in cols"></div>
    </div>
</div>
 </div>
</div>
</template>

<script>
import SelectWwwc from './SelectWwwc'
import { mapState, mapActions } from "vuex";
export default {
    components: {
     SelectWwwc
    },
    data() {
      return {
      cols:3,
      rows:3,
      x:4,
      y:4,
      styleObject: {
        color: 'red',
        width: ''
      } 
      }
    },
    watch:{
        parameterColAndRow(newColsAndRows,oldColsAndRows){
            this.$nextTick(() => {
            this.cols = newColsAndRows.cols
            this.rows = newColsAndRows.rows
            this.$emit('getDicomData')
            this.$emit('dispalyDicom')
            }) 
        }
    },
    props:["rowsAndColsData"],
    methods:{
        changeXAndY(){
            const currentWidth = 1200 / this.numW;
            console.log(currentWidth)
            this.styleObject.width = currentWidth+ 'px'
            console.log(this.styleObject)
            
        },
    },
    mounted(){
    },
    computed: {
        ...mapState({
            parameterColAndRow: state => state.parameterColAndRow
        }
        )
      }

}
</script>

<style scoped>
.layout{
    width:1200px;
    height:900px;
    display:flex;
    justify-content: space-between;
}
/* .cornerstone-element{
    height:450px;
    flex:1;
    background-color: yellow;
} */
.cornerstone-element{
    height: 100%;
    flex:1;
    background-color: green;
    border:1px solid #000;
    overflow: hidden;
}
.x{
    display: flex;
}
.selectXAndY{
    background-color: paleturquoisep;
    height: 40px;
    width:40px;
    border:1px solid #000;
}
.selectXAndY:hover{
    background-color: pink;
}
.cornerstone-element-wrapper {
    display: flex;
    flex-direction:column;
    flex: 1;
    background-color: #333;
  }
  /* .cornerstone-element{
      flex:1;
  } */
</style>