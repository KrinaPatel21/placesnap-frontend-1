import React, { useRef, useEffect } from 'react';
import 'ol/ol.css';

import MapOL from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';


import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';

import './Map.css';

const Map = props => {
  const mapRef = useRef();
  const mapInstance = useRef(); 

  const { center, zoom } = props;
  

  useEffect(() => {
    if (mapInstance.current) return; 

    mapInstance.current = new MapOL({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: fromLonLat([center.lng, center.lat]),
        zoom: zoom
      })
    });

    

    const marker = new Feature({
      geometry: new Point(fromLonLat([center.lng, center.lat]))
    });

    marker.setStyle(
      new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
          scale: 0.07
        })
      })
    );

    const vectorSource = new VectorSource({
      features: [marker]
    });

    const markerLayer = new VectorLayer({
      source: vectorSource
    });

    mapInstance.current.addLayer(markerLayer);

  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
      onClick={(e) => e.stopPropagation()}
    />
  );
};

export default Map;