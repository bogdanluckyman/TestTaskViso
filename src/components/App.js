import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken =
  'pk.eyJ1IjoiYm9nZGFudGlzZW5rbyIsImEiOiJjbHJodmZvbTYwM2dyMm1zMW5xdWIzYXBrIn0.d8SNkSf1ukKug-eIq022Qg';

export const App = () => {
  const [markers, setMarkers] = useState(
    JSON.parse(localStorage.getItem('markers')) || []
  );
  const [markerCount, setMarkerCount] = useState(0);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'mapbox',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [30.5238, 50.4547],
      zoom: 5,
      scrollZoom: false,
    });

    map.on('click', evt => {
      const { lng, lat } = evt.lngLat;
      const newMarker = new mapboxgl.Marker({
        offset: [760, 275],
        draggable: true,
      }).setLngLat([lng, lat]);
      newMarker.addTo(map);
      setMarkers(prevMarkers => [...prevMarkers, newMarker]);
      setMarkerCount(count => count + 1);
    });
    map.on('dblclick', evt => {
      evt.preventDefault();
    });
    return () => {
      map.remove();
    };
  }, []);

  const removeAllMarkers = () => {
    markers.forEach(marker => marker.remove());
    setMarkers([]);
    setMarkerCount(0);
  };

  const removeLastMarker = () => {
    const lastMarker = markers.pop();
    if (lastMarker) {
      lastMarker.remove();
      setMarkers([...markers]);
      setMarkerCount(count => Math.max(0, count - 1));
    }
  };

  return (
    <>
      <div
        id="mapbox"
        style={{
          height: '85vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      ></div>
      <div>
        <p>Marker Count: {markerCount}</p>
        <button onClick={removeAllMarkers}>Видалити всі маркери</button>
        <button onClick={removeLastMarker}>Видалити останній маркер</button>
      </div>
    </>
  );
};
