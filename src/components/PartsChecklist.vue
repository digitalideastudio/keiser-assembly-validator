<template>
    <div class="PartsChecklist">
        <div class="thead">
            <div class="table-row">
                <div>#</div>
                <div>
                    <span>Part ID</span>
                </div>
                <div>Description</div>
            </div>
        </div>
        <div class="tbody">
            <!--suppress CommaExpressionJS -->
            <div v-for="(part, index) in checklist" :key="part.index" class="table-row">
                <div>{{ index + 1 }}</div>
                <div>
                    <!--suppress JSUnresolvedVariable -->
                    <el-input
                        size="small"
                        :ref="`inputs${index}`"
                        :placeholder="part.id"
                        :prefix-icon="getPartIcon(part)"
                        @keydown.enter.native="validatePart(index, part, $event)"
                    ></el-input>
                </div>
                <div>{{ part.description }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import swal from 'sweetalert';
    import { Howl } from 'howler';

    const errorSound = new Howl({
        src   : ['/sound/error.webm', '/sound/error.mp3'],
        volume: 0.5,
    });

    const successSound = new Howl({
      src   : ['/sound/success.webm', '/sound/success.mp3'],
      volume: 0.5,
    });

    const PartsChecklist = {
        name : 'parts-checklist',
        props: {
            parts: {
                type    : Array,
                required: true,
            },
        },
        data() {
            return {
                checklist: [],
            };
        },
        methods: {
            validatePart(index, currentPart, $event) {
                const enteredId = $event.srcElement.value;
                const expectedPart = this.checklist[index];
                const expectedId = expectedPart.id;
                const isValidPosition = enteredId === expectedId;

                const isExistsInChecklist = this.parts.filter(part => part.id === enteredId).length;
                const partsCountNeeded = this.parts.filter(part => part.id === enteredId).length;
                const partsCountScanned = this.checklist.filter(
                    part => part.success && part.id === enteredId
                ).length;

                this.$set(currentPart, 'error', false);
                this.$set(currentPart, 'success', false);

                if (!isExistsInChecklist) {
                    errorSound.play();
                    this.$set(currentPart, 'error', true);
                    this.$nextTick(() => {
                        swal({
                            title : 'Error',
                            icon  : 'error',
                            text  : 'Wrong assembly!',
                            timer : 3000,
                            button: false,
                        }).then(() => $event.srcElement.select());
                    });
                    return;
                }

                if (partsCountScanned >= partsCountNeeded) {
                    errorSound.play();
                    this.$set(currentPart, 'error', true);
                    this.$nextTick(() => {
                        swal({
                            title : 'Error',
                            icon  : 'error',
                            text  : 'Duplicate detected!',
                            timer : 3000,
                            button: false,
                        }).then(() => $event.srcElement.select());
                    });
                    return;
                }

                if (!isValidPosition) {
                    const enteredPartPosition = this.checklist.findIndex(
                        part => part.id === enteredId
                    );
                    const oldId = currentPart.id;
                    const oldDescription = currentPart.description;

                    this.checklist[index].id = this.checklist[enteredPartPosition].id;
                    this.checklist[index].description = this.checklist[enteredPartPosition].description;

                    this.checklist[enteredPartPosition].id = oldId;
                    this.checklist[enteredPartPosition].description = oldDescription;
                }

                this.$set(currentPart, 'success', true);
                this.$nextTick(() => {
                    if (index === this.checklist.length - 1) {
                        this.complete();
                        return;
                    }
                    this.$refs[`inputs${index + 1}`][0].$el.querySelector('input').select();
                });
            },
            getPartIcon(part) {
                if (part.error) {
                    return 'fa-times text-danger';
                }

                if (part.success) {
                    return 'fa-check text-success';
                }

                return '';
            },
            complete() {
                successSound.play();
                this.$emit('complete');
                swal({
                    title : 'Great job',
                    icon  : 'success',
                    text  : 'All parts has been completed!',
                    timer : 3000,
                    button: false,
                }).then(() => this.reset());
            },
            reset() {
                this.checklist = JSON.parse(JSON.stringify(this.parts));
                this.$nextTick(() => {
                    this.$el.querySelectorAll('.el-input__inner').forEach(input => Object.assign(input, { value: '' }));
                    this.$el.querySelector('.el-input__inner').select();
                });
            },
        },
        created() {
            this.checklist = JSON.parse(JSON.stringify(this.parts));
        },
        mounted() {
            this.$nextTick(() => {
                this.$el.querySelector('.el-input__inner').select();
            });
        },
    };
    export default PartsChecklist;
</script>

<style scoped>
    .PartsChecklist {
        border-left: 1px solid #eee;
        border-top: 1px solid #eee;
        font-size: .9em;
    }

    .thead,
    .tbody {
        display: flex;
        flex-direction: column;
    }

    .thead {
        background: #e6e6e6;
        font-weight: bold;
    }

    .table-row {
        flex: 1;
        display : flex;
        flex-direction: row;
    }

    .table-row > div:nth-child(2),
    .table-row > div:nth-child(3) {
        flex: 5;
        text-align: left;
    }

    .table-row > div {
        border-right: 1px solid #eee;
        border-bottom: 1px solid #eee;
    }

    .table-row > div:nth-child(1) {
        flex: 1;
        padding-top: 10px;
        padding-left: 7px;
        padding-right: 7px;
    }

    .table-row > div:nth-child(3) {
        padding-top: 10px;
        padding-left: 7px;
        padding-right: 7px;
    }

    .thead .table-row > div {
        padding: 7px;
    }

    .table-row > div:nth-child(2) {
        flex: 4;
        padding-left: 0;
        padding-right: 0;
    }

    .table-row > div:nth-child(2) span {
        padding-left: 7px;
    }
</style>

<style>
    .tbody .table-row > div:nth-child(2) input {
        border-radius: 0;
    }
</style>
