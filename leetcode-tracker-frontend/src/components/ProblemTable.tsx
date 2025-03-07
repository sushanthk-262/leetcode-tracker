import { useQuery } from '@tanstack/react-query';
import { fetchUserSubmissions } from '../api/submissionService';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';

const ProblemTable = ({ userId }: { userId: number }) => {
    const { data, error, isLoading } = useQuery({ queryKey: ['submissions', userId], queryFn: () => fetchUserSubmissions(userId) });

    const columns = [
        { accessorKey: 'problem.title', header: 'Title' },
        { accessorKey: 'problem.difficulty', header: 'Difficulty' },
        { accessorKey: 'status', header: 'Status' },
        { accessorKey: 'submissionTime', header: 'Submission Time' },
        { accessorKey: 'executionTime', header: 'Execution Time' },
        { accessorKey: 'languageUsed', header: 'Language' }
    ];

    const table = useReactTable({
        data: data || [],
        columns,
        getCoreRowModel: getCoreRowModel()
    });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error fetching submissions</p>;

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
};

export default ProblemTable;