import {useState} from 'react';
import type {Job} from '../api/types.ts';

type Props = {
    job: Job;
};

export const JobItem = ({ job }: Props) => {
    const [repoUrl, setRepoUrl] = useState<string>('');

    return (
        <div
        style={{
            border: '1px solid #e5e7eb',
            borderRadius: 10,
            padding: 12,
            backgroundColor: 'black',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
        }}>
            <div style = {{fontWeight: 700}}>{job.title}</div>
            <input
                type = 'text'
                placeholder = 'https://github.com/tu-usuario/tu-repo'
                value = {repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                style = {{
                    padding: 8,
                    border: '1px solid #ccc',
                    borderRadius: 6,
                }}
            />
            <button
                style = {{
                    padding: 8,
                    border: 'none',
                    borderRadius: 6,
                    cursor: 'pointer',
                }}
            >
                Submit
            </button>
        </div>
    );
};

