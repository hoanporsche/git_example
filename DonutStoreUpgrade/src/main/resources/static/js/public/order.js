$(document).ready(function () {
    initOrderHeader();
    orderCheckExistedItemInCart();
});

function initOrderHeader() {
    const cart = getCart();
    const orderHeaderQuantityItem = (cart) ? cart.quantities.length : 0;
    const orderHeaderTotalPrice = (cart) ? cart.totalPrice : 0;
    setViewOrderHeaderValue(orderHeaderQuantityItem, orderHeaderTotalPrice);
}

function getCart() {
    return JSON.parse(localStorage.getItem('cart'));
}

function setCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function setViewOrderHeaderValue(quantityItemValue, totalPriceValue) {
    $('#order-header-quantity-item').text(quantityItemValue);
    $('#order-header-total-price').text(totalPriceValue.toLocaleString('en-US', {minimumFractionDigits: 0}));
    $('#order-bottom-quantity-item').text(quantityItemValue);
    $('#order-bottom-total-price').text(totalPriceValue.toLocaleString('en-US', {minimumFractionDigits: 0}));
}


function orderCheckExistedItemInCart() {
    const quantities = getCart().quantities;
    categories.forEach(c => {
        c.items.forEach(i => {
            quantities.forEach(q => {
                if (i.code == q.item.code) {
                    $('#order-single-row-item-' + q.item.code).removeClass('order-chosen-single-row-item');
                    $('#input-quantity' + q.item.code).val(q.quantity);
                    $('#order-single-row-item-' + q.item.code).addClass('order-chosen-single-row-item');
                    $('#order-item-check-' + q.item.code).css({'display': 'block'});
                }
            })
        })
    })
}

function goToCheckOut(e) {
	e.preventDefault();
	console.log(e);
	const totalPrice = getCart().totalPrice;
	if (totalPrice < minTotalPrice) {
		$('#openModalWarning').click();
	} else {
		window.location.href = "/thong-tin-giao-hang";
	}
}