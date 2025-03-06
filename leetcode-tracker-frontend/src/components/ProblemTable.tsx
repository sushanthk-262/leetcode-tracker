import { useQuery } from '@tanstack/react-query';
import { fetchProblems } from '../api/problemService';
import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from '@tanstack/react-table';


const ProblemTable = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['problems'],
        queryFn: fetchProblems
    });
    

    const columns = [
        { Header: 'Title', accessor: 'title' },
        { Header: 'Difficulty', accessor: 'difficulty' },
        { Header: 'Status', accessor: 'status' },
        { Header: 'Submission Time', accessor: 'submissionTime' },
        { Header: 'Execution Time', accessor: 'executionTime' },
        { Header: 'Language', accessor: 'languageUsed' }
    ];

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data: data || [] });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error fetching problems</p>;

    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => (
                                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default ProblemTable;