<template>
    <div class="main">
        <p class="page-title">Scan product model</p>
        <div class="scanner-wrapper" v-loading="!productsLoaded"
             element-loading-text="Loading products...">
            <model-scanner :products="products" v-if="productsLoaded" @found="setAssembly" @reset="resetAssembly"></model-scanner>
        </div>
        <div class="col-xs-12" style="margin-top: 20px" v-if="assembly.model">
            <parts-checklist :parts="assembly.parts"></parts-checklist>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { triggerFailure, triggerSuccess } from '../helpers/util';
    import Part from './Part';
    import ModelScanner from './ModelScanner';
    import PartsChecklist from './PartsChecklist';

    const Main = {
        name      : 'main',
        components: {
            Part,
            ModelScanner,
            PartsChecklist,
        },
        data() {
            return {
                assembly   : {},
                partModels : [],
                partScanned: {},
            };
        },
        computed: {
            ...mapGetters([
                'products',
                'productsLoaded',
            ]),
        },
        methods: {
            setAssembly(assembly) {
                this.assembly = assembly;
            },
            resetAssembly(assembly) {
                this.assembly = assembly;
            },
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
        created() {
            this.$store.dispatch('setProducts');
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

    .scanner-wrapper {
        min-height: 100px;
    }
</style>


<style lang="scss">
    @import '../scss/main.scss';
</style>

