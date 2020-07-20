<template>
    <div>
        <!-- 此页面是侧边栏区域，展示接口返回的dicom文件。此时通过自定义的json文件进行测试开发 -->
        <div class="patientInfo">
            <p>患者姓名：{{this.dicomList.patientName}}</p>
            <p>患者编号：{{this.dicomList.patientId}}</p>
            <p>患者性别：{{this.dicomList.patientSex}}</p>
        </div>
        <div v-for="(item,index) in dicomList.dicoms" :key="index" @click="choose(item, index)" class="thumbnail"
            ref="thumbnails" oncontextmenu="return false" onmousedown="return false">
        </div>
    </div>

    </div>
</template>
<script src="../../../static/viewportSorce/exampleImageIdLoader.js"></script>
<script>
    import * as cornerstone from "cornerstone-core";
    import * as dicomParser from "dicom-parser";
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    import * as cornerstoneWADOImageLoader from "../../../static/dist/cornerstoneWADOImageLoader.js";
    import * as exampleImageIdLoader from "../../../static/viewportSorce/exampleImageIdLoader.js";
    var config = {
        webWorkerPath: "../../../static/dist/cornerstoneWADOImageLoaderWebWorker.js",
        taskConfiguration: {
            decodeTask: {
                codecsPath: "../../../static/dist/cornerstoneWADOImageLoaderCodecs.js"
            }
        }
    };
    // cornerstoneWADOImageLoader.webWorkerManager.initialize(config);
    export default {
        data() {
            return {
                dicomList: {}
            };
        },
        watch: {
            dicomList() {
                this.$nextTick(() => {
                    this.initThumbnail()
                })
            },
        },

        methods: {
            //图像初始化
            initThumbnail() {
                let thumbnail = []
                if (this.$refs.thumbnails != undefined) {
                    thumbnail = this.$refs.thumbnails
                }
                thumbnail.forEach((item, index) => {
                    cornerstone.enable(item)
                    this.displayThumbnail(item, index)
                })
            },
            //加载图像
            displayThumbnail(item, index) {

                let url = this.dicomList.dicoms[index]
                console.log(url)
                // 拼接url
                url = "wadouri:" + url;
                console.log(url)
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
                        alert(err);
                    }
                );
            },
            //点击缩略图时将缩略图的相关数据传给父组件
            choose(item, index) {
                this.$emit('choose', item)
            }
        },
        mounted() {
            
            this.initThumbnail()
            // 获取json数据
            this.axios.get('http://localhost:8686/static/json/dicom.json').then(response => {
                this.dicomList = response.data.dicom
                console.log(this.dicomList)
            }, response => {
                console.log("error");
            });
            console.log(this.$refs.thumbnails)
            this.$nextTick(() => {
                console.log(this.$refs.thumbnails)
            })
        }



    }
</script>

<style scoped>
    .thumbnail {
        height: 200px;
        width: 250px;
        border: 1px solid #d6e9ca;
        text-align: center;
        margin: 10px;
        border-radius: 10px;
        overflow: hidden;
        padding: 10px;
    }

    .patientInfo {
        margin: 0;
        padding: 0 15px;
        color: #d6e9ca;
        text-align: justify;
    }
</style>