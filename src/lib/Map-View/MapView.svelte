<script lang="ts">
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

    export let data: ITableData[];
    const locations = data?.map((item) => {
        if(item?.location) {
            return {
                region: item?.location?.region,
                latitude: item?.location?.latitude,
                longitude: item?.location.longitude
            }
        }
    })
    let map: Map;

    console.log("=====locations======", locations);
    


    onMount(() => {
        // Convert location data into OpenLayers features
        const features = locations.map((location) => {
            const feature = new Feature({
                geometry: new Point(fromLonLat([location.longitude, location.latitude])), // Convert lon/lat to Web Mercator
            });
            feature.setStyle(
                new Style({
                    image: new CircleStyle({
                        radius: 8, // Size of the point
                        fill: new Fill({ color: "green" }), // Point color
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