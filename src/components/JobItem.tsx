import {useEffect, useState} from 'react';
import {applyToJob} from '../api/endpoints.ts';
import type {Candidate, Job} from '../api/types.ts';

type Props = {
    job: Job;
    candidate: Pick<Candidate, 'uuid' | 'candidateId' | 'applicationId'>;
};

export const JobItem = ({ job, candidate }: Props) => {
    const [repoUrl, setRepoUrl] = useState<string>('');
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    useEffect(() => {
        if (!submitError && !success) return;

        const timer = window.setTimeout(() => {
            setSubmitError(null);
            setSuccess(false);
        }, 3000);
        return () => window.clearTimeout(timer);
    }, [submitError, success]);

    const onSubmit = async () => {
        try {
            setSubmitting(true);
            setSubmitError(null);
            setSuccess(false);

            const trimmed = repoUrl.trim();

            if (!trimmed.startsWith('https://github.com/')) {
                setSubmitError('Please enter a valid GitHub repository URL.');
                return;
            }

            const res = await applyToJob({
                uuid: candidate.uuid,
                candidateId: candidate.candidateId,
                applicationId: candidate.applicationId,
                jobId: job.id,
                repoUrl: trimmed,
            });

            if (!res.ok) {
                setSubmitError('Submission failed.');
                return;
            }

            setSuccess(true);
        } catch (e) {
            setSubmitError(e instanceof Error ? e.message: 'Unknown error.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className = 'card'>
            <div className = 'cardTitle'>{job.title}</div>
            <input
                type = 'text'
                placeholder = 'https://github.com/tu-usuario/tu-repo'
                value = {repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className = 'input'
            />
            <button
                onClick={onSubmit}
                disabled={submitting}
                className = 'primaryButton'
            >
                {submitting ? 'Submitting...' : 'Submit'}
            </button>
            {submitError && (
                <div className = 'feedbackError'>{submitError}</div>
            )}
            {success && (
                <div className = 'feedbackSuccess'>Submitted ✅</div>
            )}
        </div>
    );
};

