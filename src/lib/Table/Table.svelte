
<script lang="ts" >
    import Filter from '$lib/Filter/Filter.svelte';
    import type { ITableData } from '$lib/interface/TableData.interface';
    import { Badge, Modal, Tooltip, Progressbar, Table, TableBody, TableBodyCell, TableBodyRow, Button } from 'flowbite-svelte';
    import { LinkOutline } from 'flowbite-svelte-icons';
    import TableHeader from './TableHeader.svelte';
    import TableStatusCell from './TableStatusCell.svelte';

    export let data;
    let tableData: ITableData[] = [];

    $: tableData = data || [];

    let detailModal = {
        data: '',
        name: '',
        open: false
    }
    const handleView = (event: MouseEvent, details: string, name: string) => {
        event.stopPropagation(); 
        console.log(details)
        detailModal = {
            data: details,
            name: name,
            open: true
        }
    }
    const calculateProgress = (successful_landings: number, attempted_landings: number) => {
        let success_rate = 0
        if(typeof successful_landings === 'number' && typeof attempted_landings === 'number' && attempted_landings != 0) {
            let result = (successful_landings / attempted_landings) * 100
            success_rate = Number(result.toFixed(2))
        }

        return success_rate
    }

    const handleWikipedia = (event: MouseEvent, link : string) => {
        event.stopPropagation()
        
        if(link) {
            window.open(link, '_blank')
        } else {
            alert("Wikipedia link not found!");
        }
    }
</script>

<div>
    <Filter />
    <Table shadow>
        <TableHeader />
        <TableBody tableBodyClass="divide-y">
            {#if (tableData as ITableData[]).length > 0}
                {#each tableData as data (data.id)}
                    <TableBodyRow>
                        <TableBodyCell>{data?.full_name}</TableBodyCell>
                        <TableBodyCell>{data?.location?.name}</TableBodyCell>
                        <TableBodyCell>{data?.location?.region}</TableBodyCell>
                        <TableBodyCell onclick={(e: MouseEvent) => handleView(e, data?.details, data?.full_name)}>
                            <Badge rounded color="dark">View Details</Badge>
                        </TableBodyCell>
                        <TableBodyCell>
                            {#if calculateProgress(data?.successful_landings, data?.attempted_landings) > 0}
                                <Progressbar progress={calculateProgress(data?.successful_landings, data?.attempted_landings)} progressClass="bg-sky-600 dark:bg-sky-400" />
                                <p>{calculateProgress(data?.successful_landings, data?.attempted_landings)}%</p>
                            {:else}
                                <p>N/A</p>
                            {/if}
                        </TableBodyCell>
                        <TableBodyCell onclick={(e: MouseEvent) => handleWikipedia(e, data?.wikipedia)}>
                            <LinkOutline  class="text-blue-500 w-6 h-6"/>
                        </TableBodyCell>
                        <TableBodyCell>
                            <TableStatusCell status={data?.status} />
                        </TableBodyCell>
                    </TableBodyRow>
                {/each}
            {:else}
                <TableBodyRow class="text-center">
                    <TableBodyCell>No data available</TableBodyCell>
                </TableBodyRow>
            {/if}
        </TableBody>
    </Table>
</div>

<Modal title={`Details - ${detailModal?.name}`} bind:open={detailModal.open} autoclose outsideclose>
    <div class="max-h-56 overflow-y-auto">
        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            {detailModal.data ?? ''}
        </p>
    </div>
</Modal>