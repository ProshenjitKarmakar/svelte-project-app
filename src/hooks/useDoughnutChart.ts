import type { ITableData } from "$lib/interface/TableData.interface";
import Chart from "chart.js/auto";
import { derived, writable, type Readable, type Writable } from "svelte/store";


export function useDoughnutChart(data: ITableData[]) {
    const tableData: Writable<ITableData[]> = writable(data);

    const chartData: Readable<number[]> = derived(tableData, ($tableData) =>
        $tableData
            .map((item) => {
                if (item?.attempted_landings && item?.successful_landings) {
                    const success_rate =
                        (item.successful_landings / item.attempted_landings) * 100;
                    return success_rate > 0 ? success_rate : 0;
                }
                return 0;
            })
            .filter((item) => item !== 0)
    );

    function setData(newData: ITableData[]) {
        tableData.set(newData);
    }

    let chart: Chart<"doughnut", number[]> | null = null;

    function initializeChart(canvasId: string, chartData: number[]) {
        const ctx = document.getElementById(canvasId) as HTMLCanvasElement;

        if (!ctx) {
            alert("Canvas element not found");
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
            alert("Chart instance is not initialized");
            return;
        }

        chart.data.datasets[0].data = chartData;
        chart.update();
    }

    function destroyChart() {
        if (chart) {
            chart.destroy();
            chart = null;
        }
    }

    return {
        chartData,
        initializeChart,
        updateChart,
        destroyChart,
        setData
    };
}
