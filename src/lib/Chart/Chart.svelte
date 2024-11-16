<script lang="ts">
    import type { ITableData } from "$lib/interface/TableData.interface";
    import Chart from "chart.js/auto";
    import { onMount } from "svelte";

    let chart: Chart<"doughnut", number[]> | null = null;
    export let data: ITableData[] = [];

    let chartData: number[] = [];

    $: {
        const tableData: ITableData[] = data || [];
        chartData = tableData
            .map((item) => {
                if (item?.attempted_landings && item?.successful_landings) {
                    let success_rate = (item.successful_landings / item.attempted_landings) * 100;
                    return success_rate > 0 ? success_rate : 0;
                }
                return 0;
            })
            .filter((item) => item !== 0);
    }

    $: {
        if (chart) {
            updateChart(chartData);
        }
    }

    function initializeChart(chartData: number[]) {
        const ctx = document.getElementById("doughnutChart") as HTMLCanvasElement;

        if (!ctx) {
            console.error("Canvas element not found");
            alert('Canvas element not found')
            return;
        }

        chart = new Chart(ctx, {
            type: "doughnut",
            data: {
                datasets: [
                    {
                        data: chartData,
                        backgroundColor: [
                            "#FF007F", 
                            "#18DBCC",
                            "#3B00FF",
                            "#FFBF69",
                            "#6A4C93",
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

    function updateChart(chartData: number[]) {
        if (!chart) {
            console.error("Chart instance is not initialized");
            alert('Chart instance is not initialized')
            return;
        }

        chart.data.datasets[0].data = chartData;
        chart.update();
    }

    onMount(() => {
        if (chartData.length > 0) {
            initializeChart(chartData);
        }

        return () => {
            if (chart) {
                chart.destroy();
                chart = null;
            }
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
