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
                @keyup.enter.prevent.native="enterBarcode"
                @keyup.esc.prevent.native="resetBarcode"
        >
            <template slot="prepend">
                <i class="fa el-icon-fa-barcode"></i>
            </template>
        </el-input>
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
                        this.select();
                        this.$emit('found', this.assembly);
                    });
                    return;
                }

                this.error = true;
                this.select();
                this.$emit('error', this.barcode);
            },
            select() {
                this.$refs.barcode.$el.querySelector('input').select();
            },
            resetBarcode() {
                this.barcode = '';
                this.scanned = false;
                this.assembly = {};
                this.select();
                this.$emit('reset', this.assembly);
            },
        },
    };
</script>

<style>
    .invalid input, .invalid:focus input, .invalid:hover input {
        border: 1px solid #ff4949 !important;
    }

    .valid input, .valid:focus input, .valid:hover input {
        border: 1px solid #13ce66 !important;
    }
</style>