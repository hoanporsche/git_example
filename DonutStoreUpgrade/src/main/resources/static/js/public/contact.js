$('#show_ggmaps').ready(function () {
    let mainStore = stores[0];
    let latlng = new google.maps.LatLng(mainStore.lat, mainStore.lng);
    let myOptions = {
        zoom: 12,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    let map = new google.maps.Map(document.getElementById("show_ggmaps"), myOptions);
    let markers = stores.forEach(element => {
        return new google.maps.Marker({
            position: new google.maps.LatLng(element.lat, element.lng),
            map: map,
            title: element.address
        })
    });;

});