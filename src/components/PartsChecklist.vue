<template>
    <div class="PartsChecklist">
        <div class="thead">
            <div class="table-row">
                <div>ID</div>
                <div>
                    <span>Part Code</span>
                </div>
                <div>Part Name</div>
            </div>
        </div>
        <div class="tbody">
            <div v-for="(part, index) in checklist" :key="part.id" class="table-row">
                <div>{{ index + 1 }}</div>
                <div>
                    <el-input
                        size="small"
                        :ref="`inputs${index}`"
                        :placeholder="part.code"
                        :icon="getPartIcon(part)"
                        @keydown.enter.native="validatePart(index, part, $event)"
                    ></el-input>
                </div>
                <div>{{ part.name }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import swal from 'sweetalert';

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
                const enteredCode = $event.srcElement.value;
                const expectedPart = this.checklist[index];
                const expectedCode = expectedPart.code;
                const isValidPosition = enteredCode === expectedCode;

                const isExistsInChecklist = this.parts.filter(part => part.code === enteredCode).length;
                const partsCountNeeded = this.parts.filter(part => part.code === enteredCode).length;
                const partsCountScanned = this.checklist.filter(
                    part => part.success && part.code === enteredCode
                ).length;

                this.$set(currentPart, 'error', false);
                this.$set(currentPart, 'success', false);

                if (!isExistsInChecklist) {
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
                        part => part.code === enteredCode
                    );
                    const oldCode = currentPart.code;
                    const oldName = currentPart.name;

                    this.checklist[index].code = this.checklist[enteredPartPosition].code;
                    this.checklist[index].name = this.checklist[enteredPartPosition].name;

                    this.checklist[enteredPartPosition].code = oldCode;
                    this.checklist[enteredPartPosition].name = oldName;
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

    .text-success {
        color: #13CE66;
    }

    .text-danger {
        color: #FF4949;
    }
</style>