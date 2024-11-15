<script lang="ts">
	import '../app.css';
  import { Card } from 'flowbite-svelte';
  import Table from '$lib/Table/Table.svelte';
  import MapView from '$lib/Map-View/MapView.svelte';
	import Chart from '$lib/Chart/Chart.svelte';
  
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
        <Table />
      </div>

      <!-- 30% width content (on larger screens) -->
      <div class="sm:col-span-1 bg-gray-500 p-4 w-full gap-2">
        <Card size="lg"> <!-- Ensure Card takes 100% width -->
          <MapView />
        </Card>

        <Card size="lg" class="mt-5"> <!-- Ensure Card takes 100% width -->
          <Chart />
        </Card>
      </div>
    </div>
  </div>
</div>

