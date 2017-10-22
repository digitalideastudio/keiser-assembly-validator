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
                this.$store.dispatch('setCurrentUser', user)
                    .then(() => {})
                    .catch(() => console.warn('Cannot set current user!')); // eslint-disable-line no-console
                this.$router.push('/validate');
            },
        },
        created() {
            this.$store.dispatch('setSettings')
                .then((data) => {
                    // noinspection JSUnresolvedVariable
                    this.$store.dispatch('setUsers', data.usersUrl)
                        .then(() => {})
                        .catch(() => console.warn('Cannot set users!')); // eslint-disable-line no-console
                })
                .catch(() => console.warn('Cannot load settings!')); // eslint-disable-line no-console
        },
    };
    // noinspection JSUnusedGlobalSymbols
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
