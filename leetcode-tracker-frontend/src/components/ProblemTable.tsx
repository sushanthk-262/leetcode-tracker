import React from 'react';

type Submission = {
    title: string;
    statusDisplay: string;
    lang: string;
    timestamp: string;
};

type ProblemTableProps = {
    submissions: Submission[];
};

const ProblemTable: React.FC<ProblemTableProps> = ({ submissions }) => {
    if (submissions.length === 0) {
        return <p>No submissions found.</p>;
    }
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
                {submissions.map((submission, index) => (
                    <tr key={index}>
                        <td>{submission.title}</td>
                        <td>{submission.statusDisplay}</td>
                        <td>{submission.lang}</td>
                        <td>{new Date(Number(submission.timestamp) * 1000).toLocaleString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProblemTable;
