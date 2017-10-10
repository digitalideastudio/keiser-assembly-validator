<template>
    <el-table :data="parts" style="width: 100%" border>
        <el-table-column
                type="index"
                header-align="right"
                align="right"
                width="60">
        </el-table-column>
        <el-table-column
                prop="code"
                label="Part Code"
                width="170">
            <template scope="scope">
                <el-input
                        :placeholder="scope.row.code"
                        :icon="getPartIcon(scope)"
                        @keydown.enter.native="setStatus(scope)"
                />
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
                scanned  : [],
            };
        },
        methods: {
            setStatus(scope) {
                // TODO: Check

                this.scanned.push(scope.row.code);
            },
            getPartIcon(scope) {
                return this.scanned[scope.row.code] ? 'fa-check' : '';
            },
        },
        created() {
            this.checklist = this.parts;
        },
    };
    export default PartsChecklist;
</script>
