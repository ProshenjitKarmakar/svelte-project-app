import type { ITableData } from '$lib/interface/TableData.interface';
import type { RequestHandler } from '@sveltejs/kit';

export const load: RequestHandler = async ({ fetch }) => {
    try {
        const response = await fetch('https://api.spacexdata.com/v3/landpads');
        if (!response) throw new Error(`Failed to fetch data!`);
        const data: ITableData = await response.json();
        return { data };
    } catch (error) {
        console.error("Error fetching data:", error);
        return { data: [] }; // Return a fallback to avoid undefined
    }
};