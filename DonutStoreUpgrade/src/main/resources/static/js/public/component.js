function onMinius(id) {
    const inputValue = $('#input-quantity' + id).val();
    const newValue = isNaN(inputValue) || inputValue <= 0 ? 0 : +inputValue - 1;
    $('#input-quantity' + id).val(newValue);
}

function onChange(id) {
    const inputValue = $('#input-quantity' + id).val();
    const newValue = (!isNaN(inputValue) && +inputValue > 0 && +inputValue <= 300) ? +inputValue : (+inputValue > 300) ? 300 : 0;
    $('#input-quantity' + id).val(newValue);
}

function onPlus(id) {
    const inputValue = $('#input-quantity' + id).val();
    const newValue = isNaN(inputValue) || inputValue > 300 ? 0 : +inputValue + 1;
    $('#input-quantity' + id).val(newValue);

}

function initCart() {
    const cart = getCart();
    if (cart) {
        changeViewValueCart(cart.quantities.length, cart.totalPrice)
    } else {
        changeViewValueCart(0, 0);
        setCart({
            quantities: [],
            totalPrice: 0,
        })
    }
}

function addQuantites(item, quantity) {
    /** Case này ta kiểm tra item có trùng k(đã tồn tại trong list), 
    * sau đó add/update và lưu lại vào localstorage
    */
    const cart = getCart();
    const listOldQuantity = cart.quantities;
    let foundItemQuantity = listOldQuantity.find(i => i.item.code === item.code);
    //Nếu k trùng thì thêm mới và tính lại tổng giá
    if (foundItemQuantity === undefined) {
        const newQuantity = {
            item: item,
            quantity: quantity,
            price: quantity * item.singleValue,
        }
        const newList = listOldQuantity.concat(newQuantity);
        let totalPrice = 0;
        for (let i = 0; i < newList.length; i++) {
            totalPrice = totalPrice + newList[i].price;
        }
        const newCart = Object.assign({}, cart, {
            quantities: newList,
            totalPrice
        });
        setCart(newCart);
        changeViewValueCart(newList.length, totalPrice);
        showNotification(quantity, item.name, item.picture[0]);
    } else {
        //Còn trùng thì update lại item với số lượng và tính lại tổng giá
        foundItemQuantity.quantity = quantity;
        foundItemQuantity.price = quantity * item.singleValue;
        const newList = listOldQuantity.filter(i => i.item.code !== foundItemQuantity.item.code).concat(foundItemQuantity);
        let totalPrice = 0;
        for (let i = 0; i < newList.length; i++) {
            totalPrice = totalPrice + newList[i].price;
        }
        const newCart = Object.assign({}, cart, {
            quantities: newList,
            totalPrice
        });
        setCart(newCart);
        changeViewValueCart(newList.length, totalPrice);
        showNotification(quantity, foundItemQuantity.item.name, foundItemQuantity.item.picture[0]);
    }
}

function removeQuantites(item) {
    const cart = getCart();
    const listOldQuantity = cart.quantities;
    const newList = listOldQuantity.filter(i => i.item.code !== item.code);
    let totalPrice = 0;
    for (let i = 0; i < newList.length; i++) {
        totalPrice = totalPrice + newList[i].price;
    }
    const newCart = Object.assign({}, cart, {
        quantities: newList,
        totalPrice
    });
    setCart(newCart);
    changeViewValueCart(newList.length, totalPrice);
}

function clearQuantites() {
    localStorage.removeItem('cart');
    initCart();
}

$(document).ready(function () {
    initCart();
})

function changeViewValueCart(length, totalPrice) {
    $('#cart-quantity-length').text(length);
    $('#cart-total-price').text(totalPrice);
}

function getCart() {
    return JSON.parse(localStorage.getItem('cart'));
}

function setCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}



function addToCart(id) {
    let itemQuantity = $('#input-quantity' + id).val();
    if (itemQuantity == 0) {
        clearQuantites();
    } else {
        addQuantites(foundItem, itemQuantity)
    }

}

function addToCartFromMenu(itemCode, categoryCode) {
    let item;
    categories.forEach(c => {
        if (c.code == categoryCode) {
            c.items.forEach(i => {
                if (i.code == itemCode) {
                    item = i;
                }
            })
        }
    });

    const itemQuantity = $('#input-quantity' + itemCode).val();
    if (itemQuantity == 0) {
        removeQuantites(item);
    } else {
        addQuantites(item, itemQuantity)
    }

}

function showNotification(quantity, itemName, itemImage) {
    const notiItemName = `${quantity} ${itemName}`;
    $('#notification').css({ 'display': 'block' });
    $('.item-go-to-image').css({ 'background-image': `url(${itemImage})` });
    $('#noti-item-name').text(notiItemName);
    clearTimeout();
    setTimeout(() => {
        $('#notification').css({ 'display': 'none' });
        $('.item-go-to-image').css({ 'background-image': `url()` });
        $('#noti-item-name').text('');
    }, 6000)
}

function checkExistedItemInCart(itemCode) {
    const quantities = getCart().quantities;
    quantities.forEach(q => {
        if (q.item.code == itemCode) {
            $('#input-quantity' + itemCode).val(q.quantity);
        }
    })
}
