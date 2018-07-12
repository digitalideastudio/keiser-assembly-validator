<template>
    <div id="app" class="App">
        <el-row>
            <el-col :span="18" :offset="3">
                <el-card class="box-card" :style="{ background: appBackground }">
                    <div class="card-body">
                        <router-view></router-view>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12" :offset="11">
                <img src="./assets/keiser-logo.svg" alt="" class="keiser-logo">
            </el-col>
        </el-row>
    </div>
</template>

<script>
    const App = {
        name    : 'app',
        computed: {
            appBackground() {
                return this.$route.name === 'Auth' ? '#f443362e' : 'aliceblue';
            },
        },
    };
    // noinspection JSUnusedGlobalSymbols
    export default App;
</script>

<style scoped>
    .App {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 100px;
        margin-right: auto;
        margin-left: auto;
        padding-right: 15px;
        padding-left: 15px;
        width: 100%;
        max-width: 1910px;
    }

    .keiser-logo {
        width: 80px;
        border-top-left-radius: calc(.25rem - 1px);
        border-top-right-radius: calc(.25rem - 1px);
        margin: 15px auto;
        display: block;
    }

    h4 {
        font-size: 1.9em;
    }
</style>

<style lang="scss">
    @import 'scss/main.scss';
</style>
