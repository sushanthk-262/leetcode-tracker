import { useQuery } from '@tanstack/react-query';
import { fetchUserSubmissions } from '../api/submissionService';

const ProblemTable = ({ username }: { username: string }) => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['submissions', username],
        queryFn: () => fetchUserSubmissions(username),
        enabled: Boolean(username) // Query runs only when username is truthy
    });

    console.log("API Response:", data); // For debugging

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error fetching submissions</p>;
    if (!data || !data.recentSubmissionList || data.recentSubmissionList.length === 0) return <p>No submissions found</p>;

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
