<template>
    <div class="ModelScanner">
        <el-input
                ref="barcode"
                autofocus
                :class="{ 'invalid': scanned && error, 'valid': scanned && !error }"
                placeholder="Product model"
                :icon="scanned ? 'fa-times' : null"
                v-model="barcode"
                :on-icon-click="resetBarcode"
                @keydown.enter.prevent.native="enterBarcode"
                @keydown.esc.prevent.native="resetBarcode"
        >
            <template slot="prepend">
                <i class="fa el-icon-fa-barcode"></i>
            </template>
        </el-input>
    </div>
</template>

<script>
    const ModelScanner = {
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
                scanned : false,
                barcode : '',
                error   : false,
                assembly: {},
            };
        },
        methods: {
            enterBarcode() {
                this.scanned = true;
                this.$emit('scan', this.barcode);

                this.assembly = this.products.find(p => p.model === this.barcode) || {};

                if (this.assembly.model) {
                    this.error = false;

                    this.$nextTick(() => {
                        this.$emit('found', this.assembly);
                    });
                    return;
                }

                this.error = true;
                this.select();
                this.$emit('error', this.barcode);
            },
            select() {
                this.$nextTick(() => {
                    this.$refs.barcode.$el.querySelector('input').select();
                });
            },
            resetBarcode(emitEvent = true) {
                this.barcode = '';
                this.scanned = false;
                this.assembly = {};
                this.select();

                if (emitEvent) {
                    this.$emit('reset', this.assembly);
                }
            },
        },
        created() {
            this.$eventHub.$on('resetBarcode', () => {
                this.resetBarcode(false);
            });
        },
        mounted() {
            this.$refs.barcode.$el.querySelector('input').select();
        },
    };
    export default ModelScanner;
</script>

<style>
    .invalid input,
    .invalid:focus input,
    .invalid:hover input {
        border: 1px solid #ff4949 !important;
    }

    .valid input,
    .valid:focus input,
    .valid:hover input {
        border: 1px solid #13ce66 !important;
    }
</style>