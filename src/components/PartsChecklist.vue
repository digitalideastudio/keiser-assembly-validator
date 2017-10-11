<template>
    <el-table :data="checklist" style="width: 100%" border>
        <el-table-column
                type="index"
                header-align="right"
                align="right"
                width="60">
        </el-table-column>
        <el-table-column
                prop="code"
                label="Part Code"
                width="200">
            <template scope="scope">
                <el-input
                        :ref="`input${scope.$index}`"
                        :placeholder="scope.row.code"
                        :icon="getPartIcon(scope)"
                        @keydown.enter.native="validatePart(scope, $event)"
                ></el-input>
            </template>
        </el-table-column>
        <el-table-column
                prop="name"
                align="left"
                label="Part Name">
        </el-table-column>
    </el-table>
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
            validatePart(scope, $event) {
                console.log(scope);
                const isExistsInChecklist
                    = this.parts.filter(part => part.code === $event.srcElement.value).length;

                this.$set(scope.row, 'error', false);
                this.$set(scope.row, 'success', false);

                if (!isExistsInChecklist) {
                    this.$set(scope.row, 'error', true);
                    this.$nextTick(() => {
                        swal({
                            title            : 'Error',
                            icon             : 'error',
                            text             : 'Wrong assembly!',
                            timer            : 3000,
                            showConfirmButton: false,
                        }).then(() => $event.srcElement.select());
                    });
                    return;
                }

                this.$set(scope.row, 'success', true);
                this.$nextTick(() => {
                    if (scope.$index === this.checklist.length - 1) {
                        this.complete();
                        return;
                    }
                    this.$refs[`input${scope.$index + 1}`].$el.querySelector('input').select();
                });
            },
            getPartIcon(scope) {
                if (scope.row.error) {
                    return 'fa-times text-danger';
                }

                if (scope.row.success) {
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

<style>
    .text-success {
        color: #13CE66;
    }

    .text-danger {
        color: #FF4949;
    }
</style>
