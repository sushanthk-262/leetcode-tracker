import React, { useEffect, useState } from 'react';
import { fetchProblemDetails } from '../api/problemService';
import { fetchSubmissionDetail } from '../api/submissionService';

type Submission = {
    title: string;
    statusDisplay: string;
    lang: string;
    timestamp: string;
    submissionId?: string;
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
            const key = submission.submissionId || submission.title;
            const titleSlug = convertTitleToSlug(submission.title);
            try {
                const probData = await fetchProblemDetails(titleSlug);
                const difficulty = probData.data?.question?.difficulty || 'N/A';

                let code = 'N/A';
                if (submission.submissionId) {
                    const codeData = await fetchSubmissionDetail(submission.submissionId);
                    code = codeData.data?.submissionDetails?.code || 'N/A';
                } else {
                    console.warn(`Submission ID missing for ${submission.title}. Skipping code fetch.`);
                }
                
                setDetails(prev => ({
                    ...prev,
                    [key]: { difficulty, code }
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
            {submissions
                .filter(submission => submission.statusDisplay === "Accepted")
                .map((submission) => {
                    const key = submission.submissionId || `${submission.title}-${submission.timestamp}`;
                    return (
                        <tr key={key}>
                            <td>{submission.title}</td>
                            <td>{details[key]?.difficulty || 'Loading...'}</td>
                            <td>{submission.lang}</td>
                            <td>{new Date(Number(submission.timestamp) * 1000).toLocaleString()}</td>
                            <td>
                                <pre style={{ whiteSpace: 'pre-wrap', maxWidth: '300px' }}>
                                    {details[key]?.code || 'Loading...'}
                                </pre>
                            </td>
                        </tr>
                    );
                })}
        </tbody>
        </table>
    );
};

export default ProblemTable;
