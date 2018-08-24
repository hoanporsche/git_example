import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const StoreMaps = withScriptjs(withGoogleMap((props) => {
  const markers = props.listStore.map((store, index) => {
    const position = { lat: +store.lat, lng: +store.lng };
    return <Marker key={index} position={position} title={store.address}></Marker>
  });

  const center = { lat: +props.listStore[0].lat, lng: +props.listStore[0].lng };
  return (
    <GoogleMap defaultZoom={+props.defaultZoom}
      center={center}>
      {markers}
    </GoogleMap>);
}));

class GGMaps extends Component {

  render() {
    return (
      <StoreMaps
        defaultZoom={this.props.defaultZoom}
        listStore={this.props.listStore}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAg44sIHbBu2Ex5DLSvMRFL4SVBr6qDuwM&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div className="gg-maps" />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    )
  }
}

export default GGMaps;