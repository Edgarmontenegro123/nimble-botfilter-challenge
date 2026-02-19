import * as React from 'react';
import {useEffect, useState} from 'react'
import {getCandidateByEmail, getJobList} from './api/endpoints.ts';
import {JobList} from './components/JobList.tsx';
import type {Candidate, Job} from './api/types.ts';

// Email used for retrieving candidate data (as required by the challenge)
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
        void run();
    }, []);

    if (loading) {
        return (
            <div className='loadingOverlay'>
                <div className='loadingCard'>
                    <div className='spinner' />
                    <div style={{ fontWeight: 700 }}>Loading…</div>
                    <div style={{ fontSize: 13, opacity: 0.75 }}>
                        Fetching candidate and jobs
                    </div>
                </div>
            </div>
        )
    }
    if (error) return <div style={{padding: 16}}>Error: {error}</div>;

  return (
    <>
      <div className = 'page'>
          <header style = {{display: 'grid', gap: 6}}>
            <h2 style = {{margin: 0}}>Nimble Gravity - Bot Filter Challenge</h2>
              {candidate && (
                  <div style = {{fontSize: 14, opacity: 0.85}}>
                      Candidate: <strong>{candidate.firstName}</strong>{' '} - {candidate.email}
                  </div>
              )}
              <div style = {{fontSize: 13, opacity: 0.75}}>
                  Select the role, paste your GitHub repo URL, and submit.
              </div>
          </header>
          {candidate && <JobList jobs={jobs} candidate={candidate}/>}
      </div>
      <footer className='footer'>
          Made with{' '}
          <i
              className='fa-solid fa-heart-pulse fa-beat'
              style={{ '--fa-animation-duration': '2s' } as React.CSSProperties}
          ></i>{' '}
          by Edgar Montenegro!
          <small>All rights reserved © 2026</small>
      </footer>
    </>
  )
}
