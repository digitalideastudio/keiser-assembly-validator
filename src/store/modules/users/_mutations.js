export default {
    setUsers(state, users) {
        return Object.assign(state, {
            users,
            usersLoaded: true,
        });
    },
};
