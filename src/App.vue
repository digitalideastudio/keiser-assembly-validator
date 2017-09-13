<template>
    <div id="app">
        <div class="row justify-content-center">
            <div class="col-8">
                <div class="card" style="width: 100%;">
                    <img src="./assets/keiser-logo.svg" alt="" class="keiser-logo">
                    <div class="card-body">
                        <audio ref="audioS" src="/static/sound/success.mp3"></audio>
                        <audio ref="audioE" src="/static/sound/error.mp3"></audio>
                        <h4 class="card-title">Product Assembly QC</h4>
                        <p class="card-text">Scan product model</p>
                        <div class="col-xs-12">
                            <div class="input-group">
                                <span class="input-group-addon" id="sizing-addon1"><i class="fa fa-barcode"></i></span>
                                <input ref="barcode"
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
                                <span class="input-group-addon" @click="resetBarcode" v-show="barcode">
                                    <i class="fa fa-times"></i>
                                </span>
                            </div>
                        </div>
                        <div class="col-xs-12" style="margin-top: 20px" v-show="scanned && !error">
                            <table class="table table-bordered">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th class="text-center">Part ID</th>
                                    <th class="text-center" style="width: 50%">Description</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(part, index) in partsToDisplay">
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
                                            <span class="input-group-addon" @click="resetPartModel(index)"
                                                  v-show="partModels[index]">
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
                products,
                foundProduct: {},
                scanned: false,
                barcode: '',
                partsToDisplay: [],
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

                this.foundProduct = products.find(p => p.model === this.barcode);

                if (this.foundProduct) {
                    this.error = false;
                    this.parts = this.foundProduct.parts.slice(0);
                    this.partsToDisplay = this.foundProduct.parts;

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
                this.partsToDisplay = [];
                this.$refs.barcode.select();

                this.resetAllPartModel();
            },
            enterPartModel(index) {
                const foundPart = this.parts.find(p => p.id === this.partModels[index]);
                const fpIndex = this.parts.indexOf(foundPart);

                if (fpIndex !== -1) {
                    this.parts.splice(fpIndex, 1);
                }

                if (foundPart) {
                    this.$set(this.partScanned, index, true);
                    this.$set(this.partDescription, index, foundPart.description);
                    this.$set(this.partErrors, index, false);
                    this.$nextTick(() => {
                        const nextPart = document.querySelector(`#part-model-input${index + 1}`);

                        if (this.parts.length === 0 && Object.values(this.partScanned).every(k => k)) {
                            // if (Object.values(this.partModels).sort().join(',') === Object.values(this.partsToDisplay.map(p => p.id)).sort().join(',')) {
                            this.triggerSuccess();
                            // }
                        } else if (nextPart) {
                            nextPart.select();
                        }
                    });

                    return;
                }

                const foundDisplayPart = this.partsToDisplay.find(p => p.id === this.partModels[index]);
                if (foundDisplayPart) {
                    this.triggerFailure('Duplicate detected', 'This part has been already scanned!', 2000);
                } else {
                    this.triggerFailure();
                }
                this.$set(this.partErrors, index, true);
                document.querySelector(`#part-model-input${index}`).select();
            },
            resetPartModel(index) {
                this.$set(this.partErrors, index, false);
                this.partModels[index] = '';
                this.$set(this.partScanned, index, false);
                this.$set(this.partDescription, index, '');
                document.querySelector(`#part-model-input${index}`).select();
            },
            resetAllPartModel() {
                this.partErrors = {};
                this.partModels = {};
                this.partScanned = {};
                this.partDescription = {};
                this.parts = this.foundProduct.parts.slice(0);
            },
            triggerSuccess() {
                swal({
                    title: 'Great job',
                    type: 'success',
                    text: 'All parts has been completed!',
                    timer: 3000,
                    showConfirmButton: false,
                });
                this.resetAllPartModel();
                this.$refs.audioS.play();
                window.setTimeout(() => {
                    const inp = document.querySelector('#part-model-input0');

                    if (inp) {
                        inp.select();
                    }
                }, 3000);
            },
            triggerFailure(title = 'Whoops', text = 'Wrong assembly!', timer = 3000) {
                swal({
                    title,
                    type: 'error',
                    text,
                    timer,
                    showConfirmButton: false,
                });
                this.$refs.audioE.play();
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
        margin-right: auto;
        margin-left: auto;
        padding-right: 15px;
        padding-left: 15px;
        width: 100%;
        max-width: 1910px;
    }

    .keiser-logo {
        width: 15%;
        border-top-left-radius: calc(.25rem - 1px);
        border-top-right-radius: calc(.25rem - 1px);
        margin: 15px auto;
        display: block;
    }
</style>
