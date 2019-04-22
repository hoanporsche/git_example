$(document).ready(function () {

});

function onChangePicture(picture) {
    for (let index = 0; index < foundItem.picture.length; index++) {
        $('#mini-picture-' + index).removeClass("border-picture");
        if (picture === foundItem.picture[index]) {
            $('#mini-picture-' + index).addClass("border-picture");
            $('.item-picture').css({'background-image': `url(${picture})`});
        }
    }
}

function addToCart() {
    let itemQuantity = $('#input-quantity').val();
    console.log(itemQuantity);
    
}

function onClickCategory(categoryCode) {
    console.log(categoryCode);
    for (let index = 0; index < categories.length; index++) {
        $('#main-menu-category-' + index).removeClass("active");
        $('#row-item-' + index).removeClass("none-display").addClass("none-display");
        if (categoryCode === categories[index].code) {
            $('#main-menu-category-' + index).addClass("active");
            $('#row-item-' + index).removeClass("none-display");
            // $('.item-picture').css({'background-image': `url(${picture})`});
        }
    }
}