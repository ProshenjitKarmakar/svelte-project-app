<script lang="ts" >
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { Button, ButtonGroup, Checkbox, Dropdown } from "flowbite-svelte";
	import { AdjustmentsHorizontalSolid, ChevronDownOutline, GridSolid, RectangleListOutline } from 'flowbite-svelte-icons';
	import { derived } from "svelte/store";

    const handleFilter = (event: MouseEvent, status: string) => {
        event.preventDefault();
        let url;
        if(status === 'All') {
            url = `${window.location.protocol}//${window.location.host}`
        } else {
           url = `${window.location.protocol}//${window.location.host}?status=${status}`;
        }
        goto(url, { replaceState: true });
    }

    const status = derived(page, ($page) => $page.url.searchParams.get('status'));
</script>


<div class="my-2">
    <div class="flex justify-between items-center">
        <div class="flex space-x-4">
            <ButtonGroup class="space-x-xs" size="sm">
                <Button size="sm">
                    <RectangleListOutline class="w-6 h-6 text-blue-500 bg-primary-100 dark:bg-primary-800 dark:text-primary-200" />
                </Button>
                <Button size="sm" disabled>
                    <GridSolid class="w-6 h-6 text-blue-500 bg-primary-100 dark:bg-primary-800 dark:text-primary-200" />
                </Button>
            </ButtonGroup>
        </div>
        <div>
            <Button size="xs" class="bg-gray-50 text-blue-500 shadow hover:bg-gray-50 active:bg-gray-50">
                <AdjustmentsHorizontalSolid class="w-4 h-4 me-2 text-blue-500 dark:text-white" /> 
                    Filter By Status 
                <ChevronDownOutline class="w-6 h-6 ms-2 text-blue-500 dark:text-white" />
            </Button>
            <Dropdown class="w-44 p-3 space-y-3 text-sm">
                <li>
                    <button 
                        type="button" 
                        class="flex items-center cursor-pointer" 
                        onclick={(e) => handleFilter(e, 'All')}
                    >
                        <Checkbox checked={$status == undefined}>All</Checkbox>
                    </button>
                </li>
                <li>
                    <button 
                        type="button" 
                        class="flex items-center cursor-pointer" 
                        onclick={(e) => handleFilter(e, 'active')}
                    >
                        <Checkbox checked={$status === 'active'}>Active</Checkbox>
                    </button>
                </li>
                <li>
                    <button 
                        type="button" 
                        class="flex items-center cursor-pointer"
                        onclick={(e) => handleFilter(e, 'retired')}
                    >
                        <Checkbox checked={$status === 'retired'}>Retired</Checkbox>
                    </button>
                </li>
                <li>
                    <button 
                        type="button" 
                        class="flex items-center cursor-pointer"
                        onclick={(e) => handleFilter(e, 'under-construction')}
                    >
                        <Checkbox checked={$status === 'under-construction'}>Under Construction</Checkbox>
                    </button>
                </li>
            </Dropdown>
        </div>
    </div>
</div>