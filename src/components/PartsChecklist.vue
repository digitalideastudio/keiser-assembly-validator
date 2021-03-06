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
      <div v-for="(part, index) in checklist"
           :key="part.index"
           class="table-row">
        <div>{{ index + 1 }}</div>
        <div>
          <!--suppress JSUnresolvedVariable -->
          <el-input
            v-model="inputParts[index]"
            :ref="`inputs${index}`"
            :placeholder="part.id"
            :prefix-icon="getPartIcon(part)"
            size="small"
            @keydown.enter.native="validatePart(index, part, $event)"
          ></el-input>
        </div>
        <div>{{ part.description }}</div>
      </div>
    </div>

    <div v-if="showSerialConfirmation" style="margin-top: 10px">
      <el-input
        ref="serial"
        autofocus
        class="input-serial"
        :class="{ 'invalid': snScanned && snError, 'valid': snScanned && !snError }"
        placeholder="Confirm serial number"
        v-model="serialConfirmation"
        @keydown.enter.prevent.native="enterSerial"
        @keydown.esc.prevent.native="resetSerial"
      >
        <template slot="prepend">
          <i class="fa el-icon-fa-barcode"></i>
        </template>
      </el-input>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert';
import { mapActions, mapGetters } from 'vuex';
import { Howl } from 'howler';
import { PART_DUPLICATE_ERROR, PART_INVALID_ERROR, SERIAL_CONFIRM_ERROR, SERIAL_CONFIRM_OK } from '../store/constants';

const errorSound = new Howl({
  src: ['/sound/error.webm', '/sound/error.mp3'],
  volume: 0.5,
});

const successSound = new Howl({
  src: ['/sound/success.webm', '/sound/success.mp3'],
  volume: 0.5,
});

const assemblySuccessSound = new Howl({
  src: ['/sound/assembly_success.webm', '/sound/assembly_success.mp3'],
  volume: 0.5,
});

const PartsChecklist = {
  name: 'parts-checklist',
  props: {
    parts: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      checklist: [],
      showSerialConfirmation: false,
      serialConfirmation: '',
      snScanned: false,
      snError: false,
      inputParts: [],
    };
  },
  computed: {
    ...mapGetters([
      'serial',
    ]),
  },
  methods: {
    ...mapActions('user', [
      'logAction',
    ]),
    enterSerial() {
      this.snScanned = true;
      if (this.serial === this.serialConfirmation) {
        this.logAction([SERIAL_CONFIRM_OK, this.serial]);
        this.snError = false;
        this.complete();
        return;
      }
      this.logAction([SERIAL_CONFIRM_ERROR, this.serial]);
      this.snError = true;
      this.$nextTick(() => {
        swal({
          title: 'Error',
          icon: 'error',
          text: 'Serial numbers don\'t match!',
          timer: 3000,
          button: false,
        }).then(() => this.$refs.serial.select());
      });
      errorSound.play();
    },
    resetSerial() {
      this.snScanned = true;
      this.snError = false;
    },
    validatePart(index, currentPart, $event) {
      const enteredId = this.inputParts[index];
      const expectedPart = this.checklist[index];
      const expectedId = expectedPart.id;
      const isValidPosition = enteredId === expectedId;

      const isExistsInChecklist = this.parts.filter(part => part.id === enteredId).length;
      const partsCountNeeded = this.parts.filter(part => part.id === enteredId).length;
      const partsCountScanned = this.checklist.filter(
        part => part.success && part.id === enteredId,
      ).length;

      this.$set(currentPart, 'error', false);
      this.$set(currentPart, 'success', false);

      if (!isExistsInChecklist) {
        this.logAction([PART_INVALID_ERROR, enteredId]);
        errorSound.play();
        this.$set(currentPart, 'error', true);
        this.$nextTick(() => {
          swal({
            title: 'Error',
            icon: 'error',
            text: 'Wrong assembly!',
            timer: 3000,
            button: false,
          }).then(() => $event.srcElement.select());
        });
        return;
      }

      if (partsCountScanned >= partsCountNeeded) {
        this.logAction([PART_DUPLICATE_ERROR, enteredId]);
        errorSound.play();
        this.$set(currentPart, 'error', true);
        this.$nextTick(() => {
          swal({
            title: 'Error',
            icon: 'error',
            text: 'Duplicate detected!',
            timer: 3000,
            button: false,
          }).then(() => $event.srcElement.select());
        });
        return;
      }

      if (!isValidPosition) {
        const enteredPartPosition = this.checklist.findIndex(
          part => part.id === enteredId,
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
          successSound.play();
          this.showSerialConfirmation = true;
          this.$nextTick(() => {
            this.$refs.serial.select();
          });
          return;
        }
        // this.logAction([PART_OK, enteredId]);
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
      // this.logAction([SERIAL_CONFIRM_OK, '']);
      assemblySuccessSound.play();
      this.$emit('complete');
      swal({
        title: 'Great job',
        icon: 'success',
        text: 'The assembly has been completed!',
        timer: 3000,
        button: false,
      }).then(() => this.reset());
    },
    reset() {
      this.checklist = JSON.parse(JSON.stringify(this.parts));
      this.$nextTick(() => {
        this.$el.querySelectorAll('.el-input__inner').forEach(input => Object.assign(input, { value: '' }));
        this.$el.querySelector('.el-input__inner').select();
      });
      this.resetSerial();
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
    border-top  : 1px solid #eee;
    font-size   : .9em;
  }

  .thead,
  .tbody {
    display        : flex;
    flex-direction : column;
    border-left : 1px solid #eee;
  }

  .thead {
    background  : #e6e6e6;
    font-weight : bold;
  }

  .table-row {
    flex           : 1;
    display        : flex;
    flex-direction : row;
  }

  .table-row > div:nth-child(2),
  .table-row > div:nth-child(3) {
    flex       : 5;
    text-align : left;
  }

  .table-row > div {
    border-right  : 1px solid #eee;
    border-bottom : 1px solid #eee;
  }

  .table-row > div:nth-child(1) {
    flex          : 1;
    padding-top   : 10px;
    padding-left  : 7px;
    padding-right : 7px;
  }

  .table-row > div:nth-child(3) {
    padding-top   : 10px;
    padding-left  : 7px;
    padding-right : 7px;
  }

  .thead .table-row > div {
    padding : 7px;
  }

  .table-row > div:nth-child(2) {
    flex          : 4;
    padding-left  : 0;
    padding-right : 0;
  }

  .table-row > div:nth-child(2) span {
    padding-left : 7px;
  }
</style>

<style>
  .tbody .table-row > div:nth-child(2) input {
    border-radius : 0;
  }
</style>
