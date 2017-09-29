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
                @change="enterBarcode"
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
                        this.$emit('found', this.assembly);
                    });
                    return;
                }

                this.error = true;
                this.$refs.barcode.querySelector('input').select();
                this.$emit('error', this.barcode);
            },
            resetBarcode() {
                this.barcode = '';
                this.scanned = false;
                this.$refs.barcode.select();
                this.$emit('reset');
            },
        },
    };
</script>
