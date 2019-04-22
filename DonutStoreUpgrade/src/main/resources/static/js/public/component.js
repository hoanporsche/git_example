function onMinius() {
    let inputValue = $('#input-quantity').val();
    let newValue = isNaN(inputValue) || inputValue <= 0 ? 0 : +inputValue - 1;
    $('#input-quantity').val(newValue);
}

function onChange() {
    let inputValue = $('#input-quantity').val();
    let newValue = (!isNaN(inputValue) && +inputValue > 0 && +inputValue <= 300) ? +inputValue : (+inputValue > 300) ? 300 : 0;
    $('#input-quantity').val(newValue);
}

function onPlus() {
    let inputValue = $('#input-quantity').val();
    let newValue = isNaN(inputValue) || inputValue > 300 ? 0 : +inputValue + 1;
    $('#input-quantity').val(newValue);

}