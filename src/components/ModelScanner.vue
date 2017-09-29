<template>
    <div class="ModelScanner">
        <el-input
                ref="barcode"
                autofocus
                :class="{ 'is-invalid': scanned && error, 'is-valid': scanned && !error }"
                placeholder="Product model"
                icon="fa-barcode"
                v-model="barcode"
                :on-icon-click="enterBarcode"
                @keypress.enter="enterBarcode"
                @keydown.esc="resetBarcode"
        >
        </el-input>

        <span class="input-group-addon" @click="resetBarcode" v-show="barcode">
            <i class="fa fa-times"></i>
        </span>
    </div>
</template>

<script>
    export default {
        name : 'model-scanner',
        props: {
            products: {
                type    : Array,
                required: false,
                default : [],
            },
        },
        data() {
            return {
                scanned: false,
                barcode: '',
            };
        },
        methods: {
            enterBarcode() {
                this.scanned = true;

                this.assembly = this.products.find(p => p.model === this.barcode);

                if (this.assembly) {
                    this.error = false;
                    // this.parts = this.assembly.parts.slice(0);

                    this.$nextTick(() => {
                        document.querySelector('#part-model-input0').select();
                    });
                    return;
                }

                this.$refs.barcode.select();
                this.$refs.audioE.play();
                this.error = true;
            },
            resetBarcode() {
                this.barcode = '';
                this.scanned = false;
                this.parts = [];
                this.$refs.barcode.select();

                this.resetAllPartModel();
            },
        },
    };
</script>

<style scoped>

</style>
