<template>
    <div id="app" class="container">
        <div class="row justify-content-center">
            <div class="col-8">
                <div class="card" style="width: 100%;">
                    <img src="./assets/keiser-logo.svg" alt="" class="card-img-top keiser-logo">
                    <div class="card-body">
                        <h4 class="card-title">Product Assembly QC</h4>
                        <p class="card-text">Scan product model to validate its parts below.</p>
                        <div class="col-xs-12">
                            <div class="input-group">
                                <span class="input-group-addon" id="sizing-addon1"><i class="fa fa-barcode"></i></span>
                                <input ref="barcode"
                                       :readonly="scanned"
                                       autofocus
                                       :class="{ 'is-invalid': scanned && error, 'is-valid': scanned && !error }"
                                       type="text"
                                       class="form-control"
                                       placeholder="Product model"
                                       aria-label="Barcode"
                                       aria-describedby="sizing-addon1"
                                       v-model="barcode"
                                       @keypress.enter="enterBarcode"
                                       @keydown.esc="resetBarcode">
                                <span class="input-group-addon" @click="resetBarcode"><i
                                        class="fa fa-times"></i> </span>
                            </div>
                        </div>
                        <div class="col-xs-12" style="margin-top: 20px" v-show="scanned">
                            <table class="table table-bordered">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th class="text-center">Part ID</th>
                                    <th class="text-center" style="width: 50%">Description</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(part, index) in parts">
                                    <th scope="row">{{ index + 1 }}</th>
                                    <td class="text-center">
                                        <div class="input-group input-group-sm">
                                            <input type="text"
                                                   :readonly="partScanned[index]"
                                                   :id="`part-model-input${index}`"
                                                   :class="{ 'is-invalid': partErrors[index], 'is-valid': partErrors[index] }"
                                                   class="form-control"
                                                   placeholder="Part Model"
                                                   aria-label="Part Model"
                                                   v-model="partModels[index]"
                                                   @keypress.enter="enterPartModel(index)"
                                                   @keydown.esc="resetPartModel(index)">
                                            <span class="input-group-addon" @click="resetPartModel(index)">
                                            <i class="fa fa-times" v-show="!partScanned[index]"></i>
                                            <i class="fa fa-check text-success" v-show="partScanned[index]"></i>
                                        </span>
                                        </div>
                                    </td>
                                    <td class="text-center" v-text="partDescription[index]"></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // ES6 Modules or TypeScript
    import swal from 'sweetalert'
    import products from './helpers/products';

    export default {
        name: 'app',
        data() {
            return {
                scanned: false,
                barcode: '',
                parts: [],
                error: false,
                partModels: [],
                partDescription: {},
                partScanned: {},
                partErrors: {},
            };
        },
        methods: {
            enterBarcode() {
                this.scanned = true;

                const foundProduct = products.find(p => p.model === this.barcode);

                if (foundProduct) {
                    this.error = false;
                    this.parts = foundProduct.parts;

                    this.$nextTick(() => {
                        document.querySelector('#part-model-input0').select();
                    });

                    return;
                }

                // this.$refs.barcode.select();
                this.error = true;
            },
            resetBarcode() {
                this.barcode = '';
                this.scanned = false;
                this.parts = [];
            },
            enterPartModel(index) {
                const foundPart = this.parts.find(p => p.id === this.partModels[index]);

                if (foundPart) {
                    this.$set(this.partScanned, index, true);
                    this.$set(this.partDescription, index, foundPart.description);
                    this.$set(this.partErrors, index, false);
                    this.$nextTick(() => {
                        const nextPart = document.querySelector(`#part-model-input${index + 1}`);

                        if (nextPart) {
                            nextPart.select();
                        }
                    });

                    if (this.parts.length === Object.keys(this.partScanned).length && Object.keys(this.partScanned).every(k => k)) {
                        swal({
                            title: 'Great job',
                            type: 'success',
                            text: 'All parts has been completed!',
                            timer: 2000,
                            showConfirmButton: false,
                        });
                        this.resetAllPartModel();
                        document.querySelector('#part-model-input0').select();
                    }

                    return;
                }

                this.$set(this.partErrors, index, true);
            },
            resetPartModel(index) {
                this.$set(this.partErrors, index, true);
                this.partModels[index] = '';
                this.$set(this.partScanned, index, false);
                this.$set(this.partDescription, index, '');
            },
            resetAllPartModel() {
                this.partErrors = {};
                this.partModels = {};
                this.partScanned = {};
                this.partDescription = {};
            },
        },
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    .keiser-logo {
        width: 50%;
        margin: 15px auto;
        display: block;
    }
</style>
