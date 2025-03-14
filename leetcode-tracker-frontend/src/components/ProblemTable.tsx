import React, { useEffect, useState } from 'react';
import { fetchProblemDetails } from '../api/problemService';
import { fetchSubmissionDetail } from '../api/submissionService';

type Submission = {
    title: string;
    statusDisplay: string;
    lang: string;
    timestamp: string;
    submissionId: string;
};

type ProblemTableProps = {
    submissions: Submission[];
};

const convertTitleToSlug = (title: string): string => {
    return title.toLowerCase().replace(/\s+/g, '-');
};

const ProblemTable: React.FC<ProblemTableProps> = ({ submissions }) => {
    const [details, setDetails] = useState<{ [key: string]: { difficulty?: string; code?: string } }>({});

    useEffect(() => {
        submissions.forEach(async (submission) => {
            const titleSlug = convertTitleToSlug(submission.title);
            try {
                const probData = await fetchProblemDetails(titleSlug);
                const difficulty = probData.data?.question?.difficulty || 'N/A';
                const codeData = await fetchSubmissionDetail(submission.submissionId);
                const code = codeData.data?.submissionDetails?.code || 'N/A';

                setDetails(prev => ({
                    ...prev,
                    [submission.submissionId]: { difficulty, code }
                }));
            } catch (error) {
                console.error("Error fetching details for", submission.title, error);
            }
        });
    }, [submissions]);

    if (submissions.length === 0) {
        return <p>No submissions found.</p>;
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Difficulty</th>
                    <th>Language</th>
                    <th>Submission Time</th>
                    <th>Your Submission</th>
                </tr>
            </thead>
            <tbody>
                {submissions.map((submission, index) => (
                    <tr key={submission.submissionId || index}>
                        <td>{submission.title}</td>
                        <td>{details[submission.submissionId]?.difficulty || 'Loading...'}</td>
                        <td>{submission.lang}</td>
                        <td>{new Date(Number(submission.timestamp) * 1000).toLocaleString()}</td>
                        <td>
                            <pre style={{ whiteSpace: 'pre-wrap', maxWidth: '300px' }}>
                                {details[submission.submissionId]?.code || 'Loading...'}
                            </pre>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProblemTable;
