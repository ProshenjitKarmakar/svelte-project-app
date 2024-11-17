<script lang="ts">
    import type { ITableData } from "$lib/interface/TableData.interface";
	import { useDoughnutChart } from "../../hooks/useDoughnutChart";

    const { data }: { data: ITableData[] } = $props();

    const {
        chartData,
        initializeChart,
        updateChart,
        destroyChart,
        setData,
    } = useDoughnutChart(data);

    $effect(() => {
        setData(data);
    });

    $effect(() => {
        if ($chartData.length) {
            initializeChart("doughnutChart", $chartData);
        }

        return () => {
            destroyChart();
        };
    });

    $effect(() => {
        if ($chartData.length) {
            updateChart($chartData);
        }
    });
</script>

<div>
    <div style="position: relative; ">
        <canvas id="doughnutChart"></canvas>
        <div
            style="
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 20px;
                font-weight: bold;
                text-align: center;
            "
        >
            <span>{$chartData?.length ?? 0}</span>
            <br />
            <span style="font-size: 12px;">Landing Pads</span>
        </div>
    </div>
</div>
