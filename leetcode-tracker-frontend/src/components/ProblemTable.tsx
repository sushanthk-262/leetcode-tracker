import { useQuery } from '@tanstack/react-query';
import { fetchUserSubmissions } from '../api/submissionService';

const ProblemTable = ({ username }: { username: string }) => {
    const { data, error, isLoading } = useQuery({ queryKey: ['submissions', username], queryFn: () => fetchUserSubmissions(username) });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error fetching submissions</p>;

    return (
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Language</th>
                    <th>Submission Time</th>
                </tr>
            </thead>
            <tbody>
                {data.recentSubmissionList.map((submission: any, index: number) => (
                    <tr key={index}>
                        <td>{submission.title}</td>
                        <td>{submission.statusDisplay}</td>
                        <td>{submission.lang}</td>
                        <td>{new Date(submission.timestamp * 1000).toLocaleString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProblemTable;