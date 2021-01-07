import * as L from 'leaflet';
import { Bin } from './bin.model';

const MAP_COLORS = [
  '#03a8a0',
  '#66d313',
  '#04adff',
  '#fedf17',
  '#ff0984',
  '#039c4b',
  '#21409a',
];

export const START_COLOR = '#f16623';
export const END_COLOR = '#f44546';

export const addBinToMap = (map: L.Map | L.LayerGroup, bin: Bin) => {
  let color: string;
  if (bin.fullness > 75) {
    color = '#D2222D';
  } else if (bin.fullness > 50) {
    color = '#FFBF00';
  } else if (bin.fullness > 25) {
    color = '#238823';
  } else {
    color = '#007000';
  }
  const marker = new L.Marker([bin.location.latitude, bin.location.longitude], {
    icon: createMarker(`${bin.fullness}%`, color),
  });

  marker.bindPopup(popupText(bin));

  marker.addTo(map);
};

export const popupText = (bin: Bin) =>
  `<div>Fullness: ${bin.fullness}%</div><div>Battery: ${bin.battery}%</div>`;
export const getRouteStyle = (routeIndex: number): any => {
  return {
    color: getMapColor(routeIndex),
    weight: 5,
    opacity: 0.7,
  };
};

export const eqAddress = (add1: any, add2: any) => {
  return (
    add1 &&
    add2 &&
    Math.floor(add1.lat * 1000000) === Math.floor(add2.lat * 1000000) &&
    Math.floor(add1.lon * 1000000) === Math.floor(add2.lon * 1000000)
  );
};

export const getMapColor = (index: number): string => {
  return MAP_COLORS[index % MAP_COLORS.length];
};

export const DEFAULT_TILE_LAYER = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }
);

export const createMarker = (number: string, color: string): L.DivIcon => {
  const markerHtmlStyles = `
      background-color: ${color};
      width: 3rem;
      height: 3rem;
      display: block;
      left: -1.5rem;
      top: -1.5rem;
      position: relative;
      text-align: center;
      border-radius: 3rem 3rem 0;
      display:flex;
      color:white;
      justify-content:center;
      align-items: center;
      transform: rotate(45deg);
      border: 1px solid #FFFFFF`;
  return L.divIcon({
    iconAnchor: [0, 24],
    popupAnchor: [0, -36],
    html: `<div style="${markerHtmlStyles}" ><span style="transform: rotate(-45deg);">${number}</span></div>`,
  });
};
