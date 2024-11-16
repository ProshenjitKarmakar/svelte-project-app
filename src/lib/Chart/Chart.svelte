<script lang="ts" >
	import type { ITableData } from "$lib/interface/TableData.interface";
    import { onMount, beforeUpdate, afterUpdate } from "svelte";
    import Chart from "chart.js/auto";

    let chart: Chart | null = null;
    export let data: ITableData[] = [];

    let chartData: number[] = [];

    // This reactive statement will re-run whenever `data` changes
    $: {
        const tableData: ITableData[] = data || [];
        chartData = tableData
        .map((item) => {
            if (item?.attempted_landings && item?.successful_landings) {
            let success_rate = (item?.successful_landings / item?.attempted_landings) * 100;
            return success_rate > 0 ? success_rate : 0;
            }
            return 0;
        })
        .filter((item) => item !== 0); // Filter out invalid data points (i.e., 0 values)
    }
    
    function chartUpdate() {
        const ctx = document.getElementById("doughnutChart") as HTMLCanvasElement;

        chart = new Chart(ctx, {
            type: "doughnut",
            data: {
                datasets: [
                    {
                        data: chartData, 
                        backgroundColor: [
                            "#FF007F", // Color for segment 1
                            "#18DBCC", // Color for segment 2
                            "#3B00FF", // Color for segment 3
                            "#FFBF69", // Color for segment 4
                            "#6A4C93", // Color for segment 5
                        ],
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                plugins: {
                    legend: { display: true },
                    tooltip: { enabled: true },
                },
                cutout: "75%",
            },
        });
    }

    onMount(() => {
        chartUpdate()
        return () => {
            (chart as Chart).destroy();
        };
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
            <span>{chartData?.length ?? 0}</span>
            <br />
            <span style="font-size: 12px;">Landing Pads</span>
        </div>
    </div>
</div>
