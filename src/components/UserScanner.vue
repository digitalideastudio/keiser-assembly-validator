<template>
    <div class="UserScanner">
        <el-input
                ref="id"
                autofocus
                :class="{ 'invalid': scanned && error, 'valid': scanned && !error }"
                placeholder="User Badge"
                :icon="scanned ? 'fa-times' : null"
                v-model="id"
                :on-icon-click="resetId"
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

    const enterSound = new Howl({
        src   : ['static/sound/enter.webm', 'static/sound/enter.mp3'],
        volume: 1,
    });

    const gameOverSound = new Howl({
        src   : ['static/sound/game_over.webm', 'static/sound/game_over.mp3'],
        volume: 1,
    });

    const UserScanner = {
        name : 'user-scanner',
        props: {
            users: {
                type    : Array,
                required: false,
                default : [],
            },
        },
        data() {
            return {
                scanned: false,
                id     : '',
                error  : false,
                user   : {},
            };
        },
        methods: {
            enterId() {
                this.scanned = true;
                this.$emit('scan', this.id);

                this.user = this.users.find(u => u.id === this.id) || {};

                if (this.user.id) {
                    enterSound.play();
                    this.error = false;

                    this.$nextTick(() => {
                        this.$emit('found', this.user);
                    });
                    return;
                }

                gameOverSound.play();
                this.error = true;
                swal({
                    title : 'Error',
                    icon  : 'error',
                    text  : 'Unknown user!',
                    timer : 2000,
                    button: false,
                }).then(() => this.select());
                this.$emit('error', this.id);
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
    export default UserScanner;
</script>

<style>
    .invalid input,
    .invalid:focus input,
    .invalid:hover input {
        border: 1px solid #ff4949 !important;
    }

    .valid input,
    .valid:focus input,
    .valid:hover input {
        border: 1px solid #13ce66 !important;
    }
</style>