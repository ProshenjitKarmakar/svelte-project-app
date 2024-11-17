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
    import { derived, writable } from "svelte/store";

    const { data }: { data: ITableData[] } = $props();

    const tableData = writable<ITableData[]>(data);

    $effect(() => {
        tableData.set(data);
    });
    
    let map: Map | null =  $state(null);
    let vectorSource: VectorSource | null = $state(null);
    let vectorLayer: VectorLayer | null = $state(null);

    const locations = derived(tableData, ($tableData) => {
        return $tableData
            .map((item) => {
                if (item?.location) {
                    return {
                        region: item?.location?.region,
                        latitude: item?.location?.latitude,
                        longitude: item?.location?.longitude,
                    };
                }
            })
            .filter(Boolean); 
    });

    function updateMap(locations: IMapValue[]) {
        if (!vectorSource) {
            console.error('Vector source not initialized');
            alert('Vector source not initialized');
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

        const extent = vectorSource.getExtent();
        if (extent && map) {
            map.getView().fit(extent, {
                size: map.getSize(),
                padding: [50, 50, 50, 50],
                maxZoom: 12,
            });
        }
    }

    $effect(() => {
        if (!map) {
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
        }

        const unsubscribe = locations?.subscribe((currentLocations) => {
            if (currentLocations.length > 0 && map) {
                updateMap(currentLocations as IMapValue[]);
            }
        });

        return () => unsubscribe();
    });
</script>

<div class="w-full mt-3">
    <div id="map"></div>  
</div>

<style>
    #map {
        width: 100%;
        height: 400px;
        border-radius: 10px;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    }
</style>