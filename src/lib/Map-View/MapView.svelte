<!-- <script lang="ts">
	import type { ITableData } from "$lib/interface/TableData.interface";
    import { onMount } from "svelte";
    import "ol/ol.css"; // Import OpenLayers styles
    import { Map, View } from "ol";
    import { Tile as TileLayer } from "ol/layer";
    import { OSM } from "ol/source";
    import { Feature } from "ol";
    import { Point } from "ol/geom";
    import { Vector as VectorLayer } from "ol/layer";
    import { Vector as VectorSource } from "ol/source";
    import { Circle as CircleStyle, Fill, Style } from "ol/style";
	import { fromLonLat } from "ol/proj";

    export let data;
    let tableData: ITableData[] = [];

    $: tableData = data || [];

    $: locations = tableData?.map((item) => {
        if(item?.location) {
            return {
                region: item?.location?.region,
                latitude: item?.location?.latitude,
                longitude: item?.location.longitude
            }
        }
    })
    let map: Map;
    
    onMount(() => {
        const features = locations.map((location) => {
            const feature = new Feature({
                geometry: new Point(fromLonLat([location?.longitude as number, location?.latitude as number])), // Convert lon/lat to Web Mercator
            });
            feature.setStyle(
                new Style({
                    image: new CircleStyle({
                        radius: 8,
                        fill: new Fill({ color: "green" }),
                    }),
                })
            );
            return feature;
        });

        // Create a vector source and layer for the points
        const vectorSource = new VectorSource({ features });
        const vectorLayer = new VectorLayer({ source: vectorSource });

        // Initialize the map
        const view = new View({
            projection: "EPSG:3857", // Web Mercator projection
        });

        map = new Map({
            target: "map", // ID of the container element
            layers: [
                new TileLayer({
                    source: new OSM(), // OpenStreetMap layer
                }),
                vectorLayer, // Add the vector layer with points
            ],
            view,
        });

        // Automatically fit all points within the viewport
        const extent = vectorSource.getExtent(); // Get the extent of all features
        view.fit(extent, {
            size: map.getSize(), // Fit to the current map size
            padding: [50, 50, 50, 50], // Add some padding around the points
            maxZoom: 12, // Set a maximum zoom level to avoid zooming in too much
        });

        // Cleanup on component destruction
        return () => {
            if (map) {
                map.setTarget(undefined);
            }
        };
    });
</script> -->


<script lang="ts">
    import type { IMapValue, ITableData } from "$lib/interface/TableData.interface";
    import Feature from "ol/Feature";
    import Map from "ol/Map";
    import View from "ol/View";
    import Point from "ol/geom/Point";
    import TileLayer from "ol/layer/Tile";
    import VectorLayer from "ol/layer/Vector";
    import { fromLonLat } from "ol/proj";
    import OSM from "ol/source/OSM";
    import VectorSource from "ol/source/Vector";
    import { Circle as CircleStyle, Fill, Style } from "ol/style";
    import { onMount } from "svelte";

    let map: Map | null = null;

    export let data: ITableData[] = [];
    let tableData: ITableData[] = [];

    $: tableData = data || [];

    $: locations = tableData.map((item) => {
        if (item?.location) {
            return {
                region: item?.location?.region,
                latitude: item?.location?.latitude,
                longitude: item?.location.longitude,
            };
        }
    }).filter(Boolean);

    let vectorSource: VectorSource | null = null;
    let vectorLayer: VectorLayer | null = null;

    function updateMap(locations: IMapValue[]) {
        if (!vectorSource) {
            console.error("Vector source not initialized");
            return;
        }
        vectorSource.clear();

        const features = locations.map((location) => {
            const feature = new Feature({
                geometry: new Point(fromLonLat([location.longitude, location.latitude])),
            });
            feature.setStyle(
                new Style({
                    image: new CircleStyle({
                        radius: 8,
                        fill: new Fill({ color: "green" }),
                    }),
                })
            );
            return feature;
        });

        vectorSource.addFeatures(features);

        // Adjust the view to fit new locations
        const extent = vectorSource.getExtent();
        if (extent && map) {
            map.getView().fit(extent, {
                size: map.getSize(),
                padding: [50, 50, 50, 50],
                maxZoom: 12,
            });
        }
    }

    onMount(() => {
        vectorSource = new VectorSource();
        vectorLayer = new VectorLayer({ source: vectorSource });

        const view = new View({
            projection: "EPSG:3857",
            center: fromLonLat([0, 0]),
            zoom: 2,
        });

        map = new Map({
            target: "map",
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
                vectorLayer,
            ],
            view,
        });

        if (locations.length > 0) {
            updateMap(locations as IMapValue[]);
        }

        return () => {
            if (map) {
                map.setTarget(undefined);
            }
        };
    });

    $: {
        if (vectorSource) {
            updateMap(locations as IMapValue[]);
        }
    }
</script>

<div class="w-full mt-3">
    <div id="map"></div>    
</div>

<style>
    #map {
        width: 100%;
        height: 400px; /* Adjust the height as needed */
        border-radius: 10px;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    }
</style>