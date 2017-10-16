<template>
    <div class="auth">
        <p class="page-title">Please scan your badge</p>
        <user-scanner
                v-if="usersLoaded"
                :users="users"
                @found="setCurrentUser"
        ></user-scanner>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import UserScanner from './UserScanner';

    const Auth = {
        name      : 'auth',
        components: {
            UserScanner,
        },
        data() {
            return {
            };
        },
        computed: {
            ...mapGetters([
                'users',
                'usersLoaded',
            ]),
        },
        methods: {
            setCurrentUser(user) {
                this.$store.dispatch('setCurrentUser', user);
                this.$router.push('/validate');
            },
        },
        created() {
            this.$store.dispatch('setSettings')
                .then((data) => {
                    this.$store.dispatch('setUsers', data.usersUrl);
                });
        },
    };
    export default Auth;
</script>

<style scoped>
    .page-title {
        margin-top: 10px;
        border-top: 2px solid #e8e8e8;
        padding: 15px 0;
        font-size: 1.2em;
    }
</style>


<style lang="scss">
    @import '../scss/main.scss';

    .el-loading-spinner {
        top: 30%;
    }
</style>

