import { Item } from './../../../../../management/model/item/item';
import { MainService } from './../../../../layout-main/service-main/main-service.service';
import { CommonValidator } from './../../../../../shared/custom-validator/common.validator';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Component, OnInit, OnDestroy, ViewChild, NgZone, ElementRef } from '@angular/core';
import { Store } from '../../../../../management/model/store/store';
import { Subscription } from 'rxjs/Subscription';
import { } from '@types/googlemaps';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit, OnDestroy {

  listStore: Store[];
  listItem: Item[];
  private subListStore: Subscription;
  private subListItem: Subscription;

  formOrder: FormGroup;
  formArrayQuantites: FormArray;

  showFormShipping = false;

  @ViewChild("search")
  public searchElementRef: ElementRef;
  
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public desLatitude: number;
  public desLongitude: number;

  constructor(
    private mainService: MainService,
    private fb: FormBuilder,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
  ) {
    this.formOrder = this.fb.group({
      nameCreated: ['', [Validators.required, CommonValidator.notEmpty]],
      dateUpdated: ['', [Validators.required, CommonValidator.notEmpty]],
      phone: ['', [Validators.required, CommonValidator.notEmpty]],
      storeId: ['', [Validators.required]],
      isShipping: ['false', [Validators.required]],
      addressShipping: [''],
      distance: [''],
      shippingPrice: [''],
      totalPrice: [''],
      quantites: this.fb.array([])
    });
  }

  ngOnInit() {
    this.subListStore = this.mainService.findAllStore()
      .subscribe(response => {
        this.listStore = response;
        this.storeId.setValue(this.listStore[0].id);
        // this.showGgmaps();
      });
    this.subListItem = this.mainService.findAllItem()
      .subscribe(response => {
        this.listItem = response;
      });
  }

  showGgmaps() {
    const store = this.listStore.filter(o => o.id = +this.storeId.value)[0];
    this.latitude = +store.lat;
    this.longitude = +store.lng;

    //create search FormControl
    this.searchControl = new FormControl();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.desLatitude = place.geometry.location.lat();
          this.desLongitude = place.geometry.location.lng();
        });
      });
    });
  }

  // showGgmaps() {
  //   const store = this.listStore.filter(o => o.id = +this.storeId.value)[0];
  //   const latlng = new google.maps.LatLng(+store.lat, +store.lng);
  //   const myOptions = {
  //     zoom: 14,
  //     center: latlng,
  //     mapTypeId: google.maps.MapTypeId.ROADMAP
  //   }
  //   const map = new google.maps.Map(document.getElementById("show_ggmaps"), myOptions);
  //   const marker1 = new google.maps.Marker({
  //     position: latlng,
  //     map: map,
  //     //icon:"banhran.jpg", đây là icon cho marker
  //     title: store.name
  //   });

  //   //Bắt đầu sử dụng autocomple place

  //   const newplace = <HTMLInputElement>this.addressShipping.value;
  //   let autocomplete = new google.maps.places.Autocomplete(newplace);
  //   autocomplete.bindTo('bounds', map);//gắn nó vào map

  //   let directionsService = new google.maps.DirectionsService;
  //   let directionsDisplay = new google.maps.DirectionsRenderer;
  //   directionsDisplay.setMap(map);
  //   let service = new google.maps.DistanceMatrixService;

  //   autocomplete.addListener('place_changed',function(){
  //     let place = autocomplete.getPlace();	
      
  //     if (!place.geometry) {
  //       window.alert(place.name + " không tồn tại");
  //       return;
  //     }
  //     if (place.geometry.viewport) {
  //       map.fitBounds(place.geometry.viewport);
  //     } else {
  //       map.setCenter(place.geometry.location);
  //     }
      
  //     let destinationPlaceId = place.place_id;
  //     let destinationLocation = place.geometry.location;
  
  //     //Bắt đầu sử dụng Directions
  //     // directionsService.route()
  //     // directionsService.route({
  //     //   origin : {'placeId': "ChIJK7dSb3GrNTERxFvb2QVeOw8"},
  //     //   destination :{'placeId': destinationPlaceId},
  //     //   travelMode : 'DRIVING'
  //     //   }, function(response, status){
  //     //     if (status === 'OK'){
  //     //       directionsDisplay.setDirections(response);
  //     //     } else {
  //     //       window.alert('Directions request failed due to ' + status);
  //     //     }
  //     // });
      
  //     // service.getDistanceMatrix({
  //     //   origins:[latlng],
  //     //   destinations: [destinationLocation],
  //     //   travelMode: 'DRIVING',	
  //     // },function(response, status) {
  //     //   if(status != 'OK'){
  //     //     alert('Error was: ' + status);
  //     //   }else {
          
  //     //     let results = response.rows[0].elements;
  //     //     document.getElementById('distance').value = results[0].distance.text;
  //     //     let distance = $('#distance').val();
  //     //     distance = distance.replace(" km","");
  //     //     distance = distance.replace(",",".");
  //     //     console.log(distance);
  //     //     $('#shippingPrice').val(distance*5500 + " nghìn");
  //     //   }
  //     // });
      
  //     marker1.setVisible(false);
  //   });	
  // }

  isShippingValueChange() {
    if (this.isShipping.value === 'true') {
      this.showFormShipping = true;
    } else if (this.isShipping.value === 'false') {
      this.showFormShipping = false;
      this.addressShipping.setValue('');
      this.shippingPrice.setValue('');
      this.totalPrice.setValue(this.totalPrice.value - this.shippingPrice.value);
    }
  }
  onSubmit() {
    console.log(this.formOrder.value)
  }

  addSingleRowQuantity(item: Item) {
    return this.fb.group({
      id: [''],
      itemId: [item],
      orderId: [''],
      quantity: ['']
    });
  }

  addRowToForm(item) {
    this.formArrayQuantites = this.quantities as FormArray;
    this.formArrayQuantites.push(this.addSingleRowQuantity(item));
  }

  get quantities() {
    return this.formOrder.get('quantites');
  }

  ngOnDestroy(): void {
    if (this.subListStore)
      this.subListStore.unsubscribe();
    if (this.subListItem)
      this.subListItem.unsubscribe();
  }

  get nameCreated() {
    return this.formOrder.get('nameCreated');
  }

  get dateUpdated() {
    return this.formOrder.get('dateUpdated');
  }

  get phone() {
    return this.formOrder.get('phone');
  }

  get storeId() {
    return this.formOrder.get('storeId');
  }

  get isShipping() {
    return this.formOrder.get('isShipping');
  }

  get addressShipping() {
    return this.formOrder.get('addressShipping');
  }

  get distance() {
    return this.formOrder.get('distance');
  }

  get shippingPrice() {
    return this.formOrder.get('shippingPrice');
  }

  get totalPrice() {
    return this.formOrder.get('totalPrice');
  }
}
