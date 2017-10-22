// import swal from 'sweetalert';

function alert() {
    // return swal;
}

function triggerSuccess() {
    alert({
        title            : 'Great job',
        type             : 'success',
        text             : 'All parts has been completed!',
        timer            : 3000,
        showConfirmButton: false,
    });
    window.setTimeout(() => {
        const inp = document.querySelector('#part-model-input0');

        if (inp) {
            inp.select();
        }
    }, 3000);
}

function triggerFailure(title = 'Whoops', text = 'Wrong assembly!', timer = 3000) {
    alert({
        title,
        type             : 'error',
        text,
        timer,
        showConfirmButton: false,
    });
}

export {
    triggerSuccess,
    triggerFailure,
};
