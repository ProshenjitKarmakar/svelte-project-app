<script lang="ts" >
    import Filter from '$lib/Filter/Filter.svelte';
    import { Badge, Progressbar, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
	import { LinkOutline } from 'flowbite-svelte-icons';
	import { sineOut } from 'svelte/easing';
	import TableHeader from './TableHeader.svelte';
    let progress = '45'
</script>

<div>
    <Filter />
    <Table shadow>
        <TableHeader />
        <TableBody tableBodyClass="divide-y">
            <TableBodyRow>
                <TableBodyCell>Apple MacBook Pro 17"</TableBodyCell>
                <TableBodyCell>Sliver</TableBodyCell>
                <TableBodyCell>Laptop</TableBodyCell>
                <TableBodyCell>
                    <Badge rounded color="dark">View Details</Badge>
                </TableBodyCell>
                <TableBodyCell>
                    <Progressbar progress={progress} progressClass="bg-sky-600 dark:bg-sky-400" />
                    <p>{progress} %</p>
                </TableBodyCell>
                <TableBodyCell>
                    <LinkOutline class="text-blue-500 w-6 h-6"/>
                </TableBodyCell>
                <TableBodyCell>
                    <Badge color="green">Active</Badge>
                </TableBodyCell>
            </TableBodyRow>

            <TableBodyRow>
                <TableBodyCell>Apple MacBook Pro 17"</TableBodyCell>
                <TableBodyCell>Sliver</TableBodyCell>
                <TableBodyCell>Laptop</TableBodyCell>
                <TableBodyCell>
                    <Badge rounded color="dark">View Details</Badge>
                </TableBodyCell>
                <TableBodyCell>
                    <Progressbar progress={progress} progressClass="bg-sky-600 dark:bg-sky-400" />
                    <p>{progress} %</p>
                </TableBodyCell>
                <TableBodyCell>
                    <LinkOutline class="text-blue-500 w-6 h-6"/>
                </TableBodyCell>
                <TableBodyCell>
                    <Badge color="green">Active</Badge>
                </TableBodyCell>
            </TableBodyRow>
            
        </TableBody>
        </Table>
</div>