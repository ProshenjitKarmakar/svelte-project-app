<script lang="ts" >
	import { Button, ButtonGroup, Dropdown, DropdownItem } from "flowbite-svelte";
	import { AdjustmentsHorizontalSolid, ChevronDownOutline, FireOutline, GridSolid, RectangleListOutline } from 'flowbite-svelte-icons';

</script>


<div class="my-2">
    <div class="flex justify-between items-center">
        <div class="flex space-x-4">
            <ButtonGroup class="space-x-xs" size="sm">
                <Button size="sm">
                    <RectangleListOutline class="w-6 h-6 text-blue-500 bg-primary-100 dark:bg-primary-800 dark:text-primary-200" />
                </Button>
                <Button size="sm">
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
            <Dropdown>
                <DropdownItem>Dashboard</DropdownItem>
                <DropdownItem>Settings</DropdownItem>
                <DropdownItem>Earnings</DropdownItem>
                <DropdownItem>Sign out</DropdownItem>
            </Dropdown>
        </div>
    </div>


</div>