function triggerSuccess() {
    swal({
        title: 'Great job',
        type: 'success',
        text: 'All parts has been completed!',
        timer: 3000,
        showConfirmButton: false,
    });
    this.resetAllPartModel();
    this.$refs.audioS.play();
    window.setTimeout(() => {
        const inp = document.querySelector('#part-model-input0');

        if (inp) {
            inp.select();
        }
    }, 3000);
}

function triggerFailure(title = 'Whoops', text = 'Wrong assembly!', timer = 3000) {
    swal({
        title,
        type: 'error',
        text,
        timer,
        showConfirmButton: false,
    });
    this.$refs.audioE.play();
}

export {
    triggerSuccess,
    triggerFailure,
};
