<template>
  <div class="ModelScanner">
    <h2 v-if="serial && scannedSerial && !errorSerial">{{ serial }}</h2>
    <div class="page-title"><span class="user-name" v-text="currentUser.name"></span>,
      please scan a <span class="scan-label" v-if="serial && scannedSerial && !errorSerial">product model</span>
      <span v-else>serial number</span>
    </div>

    <el-input
      ref="serial"
      autofocus
      class="input-serial"
      :class="{ 'invalid': scannedSerial && errorSerial, 'valid': scannedSerial && !errorSerial }"
      placeholder="Serial number"
      :prefix-icon="scannedSerial ? 'fa-times' : null"
      v-model="serial"
      @keydown.enter.prevent.native="enterSerial"
      @keydown.esc.prevent.native="resetSerial"
    >
      <template slot="prepend">
        <i class="fa el-icon-fa-barcode"></i>
      </template>
    </el-input>

    <el-input
      v-if="serial && scannedSerial && !errorSerial"
      ref="barcode"
      class="input-barcode"
      :class="{ 'invalid': scanned && error, 'valid': scanned && !error }"
      placeholder="Product model"
      :prefix-icon="scanned ? 'fa-times' : null"
      v-model="barcode"
      @keydown.enter.prevent.native="enterBarcode"
      @keydown.esc.prevent.native="resetBarcode"
    >
      <template slot="prepend">
        <i class="fa el-icon-fa-barcode"></i>
      </template>
    </el-input>
  </div>
</template>

<script>
import { Howl } from 'howler';
import { mapGetters } from 'vuex';

const errorSound = new Howl({
  src: ['/sound/error.webm', '/sound/error.mp3'],
  volume: 0.5,
});

const ModelScanner = {
  name: 'model-scanner',
  props: {
    products: {
      type: Array,
      required: false,
      default: [],
    },
  },
  computed: {
    ...mapGetters([
      'currentUser',
      'currentUserLoaded',
    ]),
  },
  data() {
    return {
      scanned: false,
      scannedSerial: false,
      barcode: '',
      serial: '',
      error: false,
      errorSerial: false,
      assembly: {},
    };
  },
  methods: {
    enterBarcode() {
      this.scanned = true;
      this.$emit('scan', this.barcode);

      this.assembly = this.products.find(p => p.model === this.barcode) || {};

      if (this.assembly.model) {
        this.error = false;

        this.$nextTick(() => {
          this.$emit('found', this.assembly);
        });
        return;
      }

      errorSound.play();
      this.error = true;
      this.$emit('error', this.barcode);
    },
    selectSerial() {
      this.$nextTick(() => {
        this.$refs.serial.$el.querySelector('input').select();
      });
    },
    select() {
      this.$nextTick(() => {
        this.$refs.barcode.$el.querySelector('input').select();
      });
    },
    resetBarcode(emitEvent = true) {
      this.barcode = '';
      this.scanned = false;
      this.assembly = {};
      this.select();

      if (emitEvent) {
        this.$emit('reset', this.assembly);
      }
    },
    enterSerial() {
      this.scannedSerial = true;
      const re = RegExp(/^[0-9]+-[0-9]+$/);
      if (!re.test(this.serial)) {
        errorSound.play();
        this.errorSerial = true;
        this.selectSerial();
        this.$emit('error', this.serial);
        return;
      }

      this.$emit('scanSerial', this.serial);
      this.errorSerial = false;
      this.select();
    },
    resetSerial() {
      this.serial = '';
      this.serialScanned = false;
      this.selectSerial();
    },
  },
  created() {
    this.$eventHub.$on('resetBarcode', () => {
      this.resetBarcode(false);
    });
    this.$eventHub.$on('resetSerial', () => {
      this.resetSerial();
    });
  },
  mounted() {
    this.$refs.serial.$el.querySelector('input').select();
  },
  watch: {
    serial() {
      this.serialScanned = false;
      this.scannedSerial = false;
    },
  },
};
export default ModelScanner;
</script>

<style>
  h2 {
    color: firebrick;
    font-size: 73px;
    letter-spacing: 3px;
    font-weight: bold;
    font-family: Arial;
  }

  .page-title {
    padding: 15px 0;
    font-size: 1em;
  }

  .scan-label, .user-name {
    font-weight: bold;
  }

  .input-serial {
    margin-bottom: 15px;
  }

  .invalid input,
  .invalid:focus input,
  .invalid:hover input {
    border : 1px solid #ff4949 !important;
  }

  .valid input,
  .valid:focus input,
  .valid:hover input {
    border : 1px solid #13ce66 !important;
  }
</style>