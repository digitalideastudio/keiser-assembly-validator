<template>
  <div class="UserScanner">
    <el-input
      ref="id"
      autofocus
      :class="{ 'invalid': scanned && error, 'valid': scanned && !error }"
      placeholder="User Badge"
      :prefix-icon="scanned ? 'fa-times' : null"
      v-model="id"
      @keydown.enter.prevent.native="enterId"
      @keydown.esc.prevent.native="resetId"
    >
      <template slot="prepend">
        <i class="fa el-icon-fa-user-secret"></i>
      </template>
    </el-input>
  </div>
</template>

<script>
import swal from 'sweetalert';
import { Howl } from 'howler';
import { mapActions } from 'vuex';
import { AUTH_ERROR, AUTH_OK } from '../store/constants';

const gameOverSound = new Howl({
  src: ['/sound/game_over.webm', '/sound/game_over.mp3'],
  volume: 1,
});

export default {
  name: 'UserScanner',

  data() {
    return {
      scanned: false,
      id: '',
      error: false,
      user: {},
    };
  },

  methods: {
    ...mapActions('user', [
      'fetchUser',
      'logAction',
    ]),
    async enterId() {
      this.scanned = true;
      this.$emit('scan', this.id);

      try {
        this.user = await this.fetchUser(this.id);
        await this.logAction([AUTH_OK, this.id]);
        this.error = false;
        this.$nextTick(() => {
          this.$emit('scanned', this.user);
        });
      } catch (e) {
        await this.logAction([AUTH_ERROR, this.id]);
        this.user = {};
        gameOverSound.play();
        this.error = true;
        swal({
          title: 'Error',
          icon: 'error',
          text: 'Unknown user!',
          timer: 2000,
          button: false,
        }).then(() => this.select());
        this.$emit('error', this.id);
      }
    },
    select() {
      this.$nextTick(() => {
        this.$refs.id.$el.querySelector('input').select();
      });
    },
    resetId(emitEvent = true) {
      this.id = '';
      this.scanned = false;
      this.user = {};
      this.select();

      if (emitEvent) {
        this.$emit('reset', this.user);
      }
    },
  },

  created() {
    this.$eventHub.$on('resetId', () => {
      this.resetId(false);
    });
  },
};
</script>

<style>
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
