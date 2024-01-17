import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken =
  'pk.eyJ1IjoiYm9nZGFudGlzZW5rbyIsImEiOiJjbHJodmZvbTYwM2dyMm1zMW5xdWIzYXBrIn0.d8SNkSf1ukKug-eIq022Qg';

export const App = () => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'mapbox',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [30.5238, 50.4547], // Координати центру (Київ)
      zoom: 5,
      scrollZoom: false,
    });

    map.on('click', evt => {
      console.log(evt);
      const { lng, lat } = evt.lngLat;
      const marker = new mapboxgl.Marker({
        offset: [765, 330],
        draggable: true,
      }).setLngLat([lng, lat]);
      marker.addTo(map);
    });
    return () => {
      map.remove();
    };
  }, []);

  return (
    <div
      id="mapbox"
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    ></div>
  );
};
