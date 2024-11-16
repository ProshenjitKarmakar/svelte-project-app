<script lang="ts">
	import Chart from '$lib/Chart/Chart.svelte';
	import MapView from '$lib/Map-View/MapView.svelte';
	import Table from '$lib/Table/Table.svelte';
	import { Card } from 'flowbite-svelte';
	import '../app.css';
	import type { ITableData } from '$lib/interface/TableData.interface';

  export let data;
</script>

<div>
  <!-- Logo Section -->
  <div>
    <div class="flex justify-center items-center">
      <img src="/space-x-logo.png" alt="space-x-logo" width="400px" />
    </div>
    <hr class="border-b-2 border-gray-400 mt-1" />
  </div>

  <!-- Content Section -->
  <div class="my-4 mx-4 sm:mx-8 lg:mx-28">
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
      
      <!-- 70% width content (on larger screens) -->
      <div class="sm:col-span-2 p-4">
        <Table data={data?.data as ITableData[]} />
      </div>

      <!-- 30% width content (on larger screens) -->
      <div class="sm:col-span-1 p-4 w-full gap-2">
        <Card size="lg"> 
          <h6 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Map View
          </h6>
          <hr />
          <MapView data={data?.data as ITableData[]} />
        </Card>

        <Card size="lg" class="mt-5">
          <h6 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Success Rate Chart
          </h6>
          <hr />
          <Chart data={data?.data as ITableData[]} />
        </Card>
      </div>
    </div>
  </div>
</div>

