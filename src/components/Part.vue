<template>
    <div class="input-group input-group-sm Part">
        <input type="text"
               :readonly="part.scanned"
               :id="`part-model-input${index}`"
               :class="{ 'is-invalid': part.error, 'is-valid': !part.error }"
               class="form-control"
               :placeholder="part.id"
               :aria-label="part.id"
               v-model="partModels[index]"
               @keypress.enter="enterPartModel(index)"
               @keydown.esc="resetPartModel(index)">
        <span class="input-group-addon" @click="resetPartModel(index)"
              v-show="partModels[index]">
            <i class="fa fa-times" v-show="!partScanned[index]"></i>
            <i class="fa fa-check text-success" v-show="partScanned[index]"></i>
        </span>
    </div>
</template>

<script>
    export default {
        name : 'part',
        props: {
            part: {
                type    : Object,
                required: true,
            },
        },
        data() {
            return {
                variable: 'World',
            };
        },
    };
</script>

<style scoped>

</style>
