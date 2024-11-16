<script lang="ts">
  import { page } from '$app/stores';
  import Chart from '$lib/Chart/Chart.svelte';
  import type { ITableData } from '$lib/interface/TableData.interface';
  import MapView from '$lib/Map-View/MapView.svelte';
  import Table from '$lib/Table/Table.svelte';
  import { Card } from 'flowbite-svelte';
  import { derived } from 'svelte/store';
  import '../app.css';

  export let data: { data: ITableData[] };

  const status = derived(page, ($page) => {
    console.log('page', $page); // Check the full page store
    return $page.url.searchParams.get('status') || '';
  });
  
  const getStatus = (status: string): string => {
    const statusMap: { [key: string]: string } = {
      'active': 'active',
      'retired': 'retired',
      'under-construction': 'under construction'
    };
    return statusMap[status] || '';
  };

  let filteredData : ITableData[] = [];

  $: {
    const mappedStatus = getStatus($status);  

    filteredData = mappedStatus === '' 
      ? data?.data || [] 
      : (data?.data.filter((item) => item.status === mappedStatus) || []);
  }
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
        <Table data={filteredData as ITableData[]} />
      </div>

      <!-- 30% width content (on larger screens) -->
      <div class="sm:col-span-1 p-4 w-full gap-2">
        <Card size="lg"> 
          <h6 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Map View
          </h6>
          <hr />
          <MapView data={filteredData as ITableData[]} />
        </Card>

        <Card size="lg" class="mt-5">
          <h6 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Success Rate Chart
          </h6>
          <hr />
          <Chart data={filteredData as ITableData[]} />
        </Card>
      </div>
    </div>
  </div>
</div>

