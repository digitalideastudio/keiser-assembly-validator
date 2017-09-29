<template>
    <div class="main">
        <p class="page-title">Scan product model</p>
        <div>
            <model-scanner :products="product"></model-scanner>
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
                <tr v-for="(part, index) in assembly.parts" :index="part.id">
                    <th scope="row" v-text="index + 1"></th>
                    <th scope="row" v-text="part.id"></th>
                    <td class="text-center">
                        <part :part="part"></part>
                    </td>
                    <td class="text-center" v-text="part.description"></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { triggerFailure, triggerSuccess } from '../helpers/util';
    import Part from './Part';
    import ModelScanner from './ModelScanner';

    const Main = {
        name      : 'main',
        components: {
            Part,
            ModelScanner,
        },
        data() {
            return {
                product : [],
                assembly: {},
                scanned : false,
                barcode : '',
                error   : false,

                partModels : [],
                partScanned: {},
            };
        },
        computed: {
            ...mapGetters([
                'products',
            ]),
        },
        methods: {
            enterPartModel(index) {
                const foundPart = this.parts.find(p => p.id === this.partModels[index]);
                const fpIndex = this.parts.indexOf(foundPart);

                if (fpIndex !== -1) {
                    this.parts.splice(fpIndex, 1);
                }

                if (foundPart) {
                    this.$set(this.partScanned, index, true);
                    this.$set(this.partErrors, index, false);
                    this.$nextTick(() => {
                        const nextPart = document.querySelector(`#part-model-input${index + 1}`);

                        if (this.parts.length === 0 && Object.values(this.partScanned).every(k => k)) {
                            triggerSuccess();
                        } else if (nextPart) {
                            nextPart.select();
                        }
                    });

                    return;
                }

                const foundDisplayPart = this.product.parts.find(p => p.id === this.partModels[index]);
                if (foundDisplayPart) {
                    triggerFailure('Duplicate detected', 'This part has been already scanned!', 2000);
                } else {
                    triggerFailure();
                }
                this.$set(this.partErrors, index, true);
                document.querySelector(`#part-model-input${index}`).select();
            },
            resetPartModel(index) {
                this.$set(this.partErrors, index, false);
                this.partModels[index] = '';
                this.$set(this.partScanned, index, false);
                document.querySelector(`#part-model-input${index}`).select();
            },
            resetAllPartModel() {
                this.partModels = {};
                this.partScanned = {};
                // this.parts = this.assembly.parts.slice(0);
            },
        },
    };
    export default Main;
</script>

<style scoped>
    .page-title {
        margin-top: 10px;
        border-top: 2px solid #e8e8e8;
        padding: 15px 0;
        font-size: 1.2em;
    }
</style>


<style lang="scss">
    @import '../scss/main.scss';
</style>

