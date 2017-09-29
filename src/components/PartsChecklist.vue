<template>
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
</template>

<script>
    export default {
        name: 'parts-checklist',
    };
</script>
