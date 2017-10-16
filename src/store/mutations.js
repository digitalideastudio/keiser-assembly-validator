export default {
    setCurrentUser(state, user) {
        Object.assign(state, {
            currentUser      : user,
            currentUserLoaded: true,
        });
    },
};
