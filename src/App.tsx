import {useEffect, useState} from 'react'
import {getCandidateByEmail, getJobList} from './api/endpoints.ts';
import {JobList} from './components/JobList.tsx';
import type {Candidate, Job} from './api/types.ts';


const EMAIL = 'edgarmontenegro321@gmail.com';



export default function App() {
  const [candidate, setCandidate] = useState<Candidate | null> (null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const run = async () => {
            try {
                setLoading(true);
                setError(null);

                const [c, j] = await Promise.all([
                    getCandidateByEmail(EMAIL),
                    getJobList(),
                ]);

                setCandidate(c);
                setJobs(j);
            } catch (e) {
                setError(e instanceof Error ? e.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };
        run();
    }, []);

    if (loading) return <div style={{padding: 16}}>Loading...</div>
    if (error) return <div style={{padding: 16}}>Error: {error}</div>;

  return (
    <>
      <div style={{padding: 16, fontFamily: 'sans-serif'}}>
        <h2>Smoke test</h2>
          <h3>Candidate</h3>
          <pre>{JSON.stringify(candidate, null, 2)}</pre>

          <h3>Jobs</h3>
          <JobList jobs={jobs} />
      </div>
    </>
  )
}
