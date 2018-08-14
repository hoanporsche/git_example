import React from 'react';

import _ from "lodash";
import { compose, withProps, lifecycle } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "react-google-maps";
import { SearchBox } from "react-google-maps/lib/components/places/SearchBox";
import { SHIPPING_PRICE_UNIT } from '../../../share/constant/common.constant';

//input props: store
const GGMapsWithDirection = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAg44sIHbBu2Ex5DLSvMRFL4SVBr6qDuwM&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div className="gg-maps" />,
    mapElement: <div style={{ height: `90%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentWillMount() {
      const refs = {};
      const google = window.google;
      //Variable for Direction 
      const DirectionsService = new google.maps.DirectionsService();
      //Variable for Distance 
      const DistanceMatrixService = new google.maps.DistanceMatrixService();
      const marker1 = {
        position: {
          lat: +this.props.store.lat, lng: +this.props.store.lng
        },
        address: this.props.store.address,
      }
      this.setState({
        directions: null,
        bounds: null,
        center: marker1.position,
        markers: [marker1],
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          })
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new google.maps.LatLngBounds();

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport)
            } else {
              bounds.extend(place.geometry.location)
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
            address: place.formatted_address
          }));
          const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

          //Emitted value
          this.props.onEmittedAddress({
            name: 'addressShipping',
            value: nextMarkers[0].address,
          })
          const origin = new window.google.maps.LatLng(+marker1.position.lat, +marker1.position.lng);
          const destination = new window.google.maps.LatLng(+nextMarkers[0].position.lat(), +nextMarkers[0].position.lng());
          //Render direction
          DirectionsService.route({
            origin: origin,
            destination: destination,
            travelMode: window.google.maps.TravelMode.DRIVING,
          }, (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
              this.setState({
                center: nextCenter,
                markers: [marker1, nextMarkers],
                directions: result,
              });
            } else {
              console.error('error fetching directions', result);
            }
          });

          //Calculate distance
          DistanceMatrixService.getDistanceMatrix({
            origins: [origin],
            destinations: [destination],
            travelMode: window.google.maps.TravelMode.DRIVING,
          }, (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
              const distance = result.rows[0].elements[0].distance;
              //Emitted values
              this.props.onEmittedDistance({
                name: 'distance',
                value: distance.text
              });
              this.props.onEmittedShippingPrice({
                name: 'shippingPrice',
                value: calculatedDistance(distance),
              })
            } else {
              console.log('error calculating distance', result);
            }
          });

        },
      });

    },
  })
)(props =>
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={13}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
  >
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Vui lòng chọn địa chỉ của bạn"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `40px`,
          marginTop: `27px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
        }}
        className="config-input-searchbox"
      />
    </SearchBox>
    {props.markers.map((marker, index) =>
      <Marker key={index} position={marker.position} title={marker.address} />
    )}
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
);

const calculatedDistance = (distance) => {
  let calculated = 0;
  if (distance.value < 4000) {
    calculated = 12000;
  }
  if (distance.value > 4000) {
    calculated = (+(distance.value / 1000 + 0.1).toString().substring(0, 3) * SHIPPING_PRICE_UNIT) - 10000;
  }
  return calculated;
}

export default GGMapsWithDirection;