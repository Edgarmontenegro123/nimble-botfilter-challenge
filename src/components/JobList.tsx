import type {Job} from '../api/types.ts';

type Props = {
    jobs: Job[];
};

export const JobList = ({ jobs }: Props) => {
    return (
        <div style = {{display: 'grid', gap: 12}}>
            {jobs.map((job: Job) => (
                <div
                    key = {job.id}
                    style = {{
                        border: '1px solid #e5e7eb',
                        borderRadius: 10,
                        padding: 12,
                        backgroundColor: 'black',
                    }}
                >
                    <div style = {{fontWeight: 700}}>{job.title}</div>
                    <div style = {{fontSize: 12, opacity: 0.7}}>{job.id}</div>
                </div>
            ))}
        </div>
    );
};