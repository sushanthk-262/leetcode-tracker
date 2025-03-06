import { useQuery } from '@tanstack/react-query';
import { fetchProblems } from '../api/problemService';
import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from '@tanstack/react-table';


const ProblemTable = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['problems'],
        queryFn: fetchProblems
    });
    

    const columns: ColumnDef<any>[] = [
        { header: 'Title', accessorKey: 'title' },
        { header: 'Difficulty', accessorKey: 'difficulty' },
        { header: 'Status', accessorKey: 'status' },
        { header: 'Submission Time', accessorKey: 'submissionTime' },
        { header: 'Execution Time', accessorKey: 'executionTime' },
        { header: 'Language', accessorKey: 'languageUsed' }
    ];
    

    const table = useReactTable({
        data: data || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    });
    
    return (
        <table>
            <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );    
}
export default ProblemTable;