<template>
    <div id="app" class="App">
        <el-row>
            <el-col :span="12" :offset="6">
                <el-card class="box-card">
                    <img src="./assets/keiser-logo.svg" alt="" class="keiser-logo">
                    <div class="card-body">
                        <h4 class="card-title">Product Assembly QC</h4>
                        <router-view></router-view>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<style scoped>
    .App {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
        margin-right: auto;
        margin-left: auto;
        padding-right: 15px;
        padding-left: 15px;
        width: 100%;
        max-width: 1910px;
    }

    .keiser-logo {
        width: 30%;
        border-top-left-radius: calc(.25rem - 1px);
        border-top-right-radius: calc(.25rem - 1px);
        margin: 15px auto;
        display: block;
    }

    h4 {
        font-size: 1.9em;
    }
</style>
