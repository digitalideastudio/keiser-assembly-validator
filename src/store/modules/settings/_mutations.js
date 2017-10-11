export default {
    setSettings(state, settings) {
        Object.assign(state, {
            settings,
            settingsLoaded: true,
        });
    },
};
