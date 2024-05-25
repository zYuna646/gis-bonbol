import "leaflet/dist/leaflet.css";

import {
  LayerGroup,
  LayersControl,
  MapContainer,
  ScaleControl,
  TileLayer,
  Tooltip,
} from "react-leaflet";

import { FaArrowLeft } from "react-icons/fa6";
import { GeoJSON } from "../components";
import { NavLink } from "react-router-dom";
import { useCallback } from "react";
import useGeoJSON from "../hooks/useGeoJSON";
import useGeoJSONFeatures from "../hooks/useGeoJSONFeatures";

export default function Spatial() {
  const [administrasiGeoJSON, colorAdministrasi] = useGeoJSON("administrasi");

  const [kecamatanGeoJSON] = useGeoJSON("kecamatan");
  const kecamatanMatchFeature = useCallback(
    (feature, featuresGeoJSON) => [
      featuresGeoJSON.findIndex(
        ({ geoJSON }) =>
          geoJSON.features[0].properties.NAMOBJ === feature.properties.NAMOBJ,
      ),
      "Kecamatan " + feature.properties.NAMOBJ,
    ],
    [],
  );
  const kecamatanFeatures = useGeoJSONFeatures(
    kecamatanGeoJSON,
    kecamatanMatchFeature,
  );

  const [jaringanIrigasiGeoJSON] = useGeoJSON("jaringan-irigasi");
  const matchFeature = useCallback(
    (feature, featuresGeoJSON) => [
      featuresGeoJSON.findIndex(
        ({ geoJSON }) =>
          geoJSON.features[0].properties.REMARK === feature.properties.REMARK,
      ),
      feature.properties.REMARK,
    ],
    [],
  );
  const jaringanIrigasiFeatures = useGeoJSONFeatures(
    jaringanIrigasiGeoJSON,
    matchFeature,
  );

  const [sawahGeoJSON] = useGeoJSON("sawah");
  const sawahMatchFeature = useCallback(
    (feature, featuresGeoJSON) => [
      featuresGeoJSON.findIndex(
        ({ geoJSON }) =>
          geoJSON.features[0].properties.DESA === feature.properties.DESA,
      ),
      "Sawah Desa " + feature.properties.DESA,
    ],
    [],
  );
  const sawahFeatures = useGeoJSONFeatures(sawahGeoJSON, sawahMatchFeature);

  return (
    <div className="relative isolate flex h-svh">
      <NavLink
        to="/"
        className="absolute left-16 top-4 inline-flex items-center gap-2 rounded bg-slate-50 px-2 py-1 text-slate-800 shadow-md transition-colors hover:bg-slate-100"
      >
        <FaArrowLeft className="inline-block h-[1em]" /> Kembali
      </NavLink>
      <MapContainer
         center={[0.546004, 123.106773]}
         zoom={11}
         className="-z-10 flex-auto"
         dragging={false}
         scrollWheelZoom={true}
         zoomControl={true}
      >
        <LayersControl position="topright" collapsed={false}>
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Satelite View">
            <TileLayer
              attribution='&copy; CNES, Distribution Airbus DS, &copy; Airbus DS, &copy; PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}"
              ext="jpg"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Topographic View">
            <TileLayer
              attribution='&copy; <a href="https://www.opentopomap.org/copyright">OpenTopoMap</a> contributors'
              url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>

          {/* <LayersControl.Overlay name="Batas Admininstrasi">
            <LayerGroup>
              <GeoJSON
                data={administrasiGeoJSON}
                color={colorAdministrasi}
                stroke
              />
            </LayerGroup>
          </LayersControl.Overlay> */}

          <LayersControl.Overlay checked name="Batas Administrasi">
            <LayerGroup>
              {kecamatanFeatures.map(({ geoJSON, color }) => (
                <GeoJSON
                  key={geoJSON.name}
                  data={geoJSON}
                  color={'yellow'}
                  fill
                  opacity={0.25}

                >
                </GeoJSON>
              ))}
            </LayerGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay checked name="Kecamatan">
            <LayerGroup>
              {kecamatanFeatures.map(({ geoJSON, color }) => (
                <GeoJSON
                  key={geoJSON.name}
                  data={geoJSON}
                  color={color}
                  fill
                  opacity={0.3}
                >
                  <Tooltip sticky>{geoJSON.name}</Tooltip>
                </GeoJSON>
              ))}
            </LayerGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay checked name="Sawah">
            <LayerGroup>
              {sawahFeatures.map(({ geoJSON, color }) => (
                <GeoJSON
                  key={geoJSON.name}
                  data={geoJSON}
                  color={'green'}
                  fill
                  stroke
                  opacity={1}
                >
                  <Tooltip sticky>{geoJSON.name}</Tooltip>
                </GeoJSON>
              ))}
            </LayerGroup>
          </LayersControl.Overlay>

          {jaringanIrigasiFeatures.map(({ geoJSON, color }) => (
            <LayersControl.Overlay
              key={geoJSON.name}
              checked
              name={geoJSON.name}
            >
              <GeoJSON data={geoJSON} color={color} stroke weight={3}>
                <Tooltip sticky>{geoJSON.name}</Tooltip>
              </GeoJSON>
            </LayersControl.Overlay>
          ))}
        </LayersControl>

        <ScaleControl position="bottomleft" maxWidth={200} />
      </MapContainer>
    </div>
  );
}
