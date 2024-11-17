<script lang="ts">
  import Filter from '$lib/Filter/Filter.svelte';
  import {
    Table,
    TableBody,
    TableBodyRow,
    TableBodyCell,
    Badge,
    Progressbar,
    Modal
  } from 'flowbite-svelte';
  import { LinkOutline } from 'flowbite-svelte-icons';
  import type { ITableData } from '$lib/interface/TableData.interface';
  import TableHeader from './TableHeader.svelte';
  import TableStatusCell from './TableStatusCell.svelte';
  import { writable, derived } from 'svelte/store';

  const { data }: { data: ITableData[] } = $props();

  const tableDataStore = writable<ITableData[]>(data);

  $effect(() => {
      tableDataStore.set(data);
  });

  const detailModal = writable({
    open: false,
    data: '',
    name: ''
  });

  const progressData = derived(tableDataStore, ($tableData) =>
    $tableData.map((item) => ({
      ...item,
      success_rate: calculateProgress(item.successful_landings, item.attempted_landings)
    }))
  );

  const calculateProgress = (successful_landings: number, attempted_landings: number): number => {
    if (typeof successful_landings === 'number' && typeof attempted_landings === 'number' && attempted_landings > 0) {
      return Number(((successful_landings / attempted_landings) * 100).toFixed(2));
    }
    return 0;
  };

  const handleView = (event: MouseEvent, details: string, name: string) => {
    event.stopPropagation();
    detailModal.set({ open: true, data: details, name });
  };

  const handleWikipedia = (event: MouseEvent, link: string) => {
    event.stopPropagation();
    if (link) {
      window.open(link, '_blank');
    } else {
      alert('Wikipedia link not found!');
    }
  };
</script>

<div>
  <Filter />
  <Table shadow>
    <TableHeader />
    <TableBody tableBodyClass="divide-y">
        {#if $progressData.length > 0}
            {#each $progressData as data (data)}
            <TableBodyRow>
                <TableBodyCell>{data?.full_name}</TableBodyCell>
                <TableBodyCell>{data?.location?.name}</TableBodyCell>
                <TableBodyCell>{data?.location?.region}</TableBodyCell>
                <TableBodyCell role="button" class="cursor-pointer" onclick={(e) => handleView(e, data?.details, data?.full_name)}>
                    <Badge rounded color="dark">View Details</Badge>
                </TableBodyCell>
                <TableBodyCell>
                    {#if data.success_rate > 0}
                        <Progressbar
                        progress={data.success_rate}
                        progressClass="bg-sky-600 dark:bg-sky-400"
                        />
                        <p>{data.success_rate}%</p>
                    {:else}
                        <p>N/A</p>
                    {/if}
                </TableBodyCell>
                <TableBodyCell onclick={(e) => handleWikipedia(e, data?.wikipedia)}>
                    <LinkOutline class="text-blue-500 w-6 h-6" />
                </TableBodyCell>
                <TableBodyCell>
                    <TableStatusCell status={data?.status} />
                </TableBodyCell>
            </TableBodyRow>
            {/each}
        {:else}
            <TableBodyRow class="text-center">
                <TableBodyCell colspan={7}>No data available</TableBodyCell>
            </TableBodyRow>
        {/if}
    </TableBody>
  </Table>
</div>

<Modal title={`Details - ${$detailModal.name}`} bind:open={$detailModal.open} autoclose outsideclose>
    <div class="max-h-56 overflow-y-auto">
        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            {$detailModal.data ?? ''}
        </p>
    </div>
</Modal>

