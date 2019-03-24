export default {
  user: state => state.user,
  userLoaded: state => !!state.user.id,
};
