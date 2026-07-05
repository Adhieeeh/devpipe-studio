import React, { useState, useEffect } from 'react';


const DEFAULT_STAGES = [
  { id: 'stg-1', name: ' Code Quality Linter', type: 'Build', status: 'Idle', duration: 2 },
  { id: 'stg-2', name: ' Vitest Unit Testing Runner', type: 'Test', status: 'Idle', duration: 4 },
  { id: 'stg-3', name: ' Webpack Production Bundler', type: 'Build', status: 'Idle', duration: 3 },
  { id: 'stg-4', name: ' AWS Cloud Container Registry Deploy', type: 'Deploy', status: 'Idle', duration: 5 }
];

function App() {

  const [stages, setStages] = useState(DEFAULT_STAGES);
  const [isPipelineRunning, setIsPipelineRunning] = useState(false);
  const [currentActiveIndex, setCurrentActiveIndex] = useState(null);
  const [inputStageName, setInputStageName] = useState('');
  const [inputStageType, setInputStageType] = useState('Test');
  const [inputDuration, setInputDuration] = useState(3);
  const [buildLogs, setBuildLogs] = useState([' Emitter initialization complete. Pipeline engine standing by...']);

  
  useEffect(() => {
    if (!isPipelineRunning || currentActiveIndex === null) return;

    if (currentActiveIndex >= stages.length) {
      setIsPipelineRunning(false);
      setCurrentActiveIndex(null);
      setBuildLogs(prev => [` BUILD SUCCESS: Comprehensive full-stack cluster distribution assets deployed without crashes.`, ...prev]);
      return;
    }

    const activeStage = stages[currentActiveIndex];
    
    
    setStages(prevStages => 
      prevStages.map((stg, idx) => idx === currentActiveIndex ? { ...stg, status: 'Running' } : stg)
    );
    setBuildLogs(prev => [` Executing runner block [${activeStage.type}]: ${activeStage.name} (${activeStage.duration}s)...`, ...prev]);

   
    const executionTimer = setTimeout(() => {
      setStages(prevStages => 
        prevStages.map((stg, idx) => idx === currentActiveIndex ? { ...stg, status: 'Passed' } : stg)
      );
      setBuildLogs(prev => [`Component validation success: ${activeStage.name} passed verification check variables.`, ...prev]);
      
     
      setCurrentActiveIndex(prevIndex => prevIndex + 1);
    }, activeStage.duration * 1000);

    return () => clearTimeout(executionTimer);
  }, [isPipelineRunning, currentActiveIndex, stages.length]);

  
  const triggerPipelineExecution = () => {
    if (isPipelineRunning) return;
    
   
    setStages(stages.map(stg => ({ ...stg, status: 'Idle' })));
    setBuildLogs([` Launching pipeline execution sequence matrix parameters...`]);
    setIsPipelineRunning(true);
    setCurrentActiveIndex(0);
  };

  
  const handleCreateStage = (e) => {
    e.preventDefault();
    if (!inputStageName.trim() || isPipelineRunning) return;

    const freshStage = {
      id: `stg-${Date.now()}`,
      name: inputStageName,
      type: inputStageType,
      status: 'Idle',
      duration: Number(inputDuration)
    };

    setStages([...stages, freshStage]);
    setInputStageName('');
  };

  
  const deleteStage = (id) => {
    if (isPipelineRunning) return;
    setStages(stages.filter(s => s.id !== id));
  };

  
  const passedCount = stages.filter(s => s.status === 'Passed').length;
  const runningProgressPercent = Math.round((passedCount / stages.length) * 100);

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 24px', fontFamily: 'monospace', backgroundColor: '#070a13', color: '#f8fafc', minHeight: '90vh' }}>
      
      {/* HEADER SECTION PANEL */}
      <header style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '25px', marginBottom: '35px', gap: '20px' }}>
        <div>
          <h1 style={{ margin: '0', fontSize: '24px', fontWeight: 'bold', color: '#fbbf24', letterSpacing: '-0.5px' }}> DevPipe Automation Control HUD</h1>
          <p style={{ margin: '4px 0 0 0', color: '#475569', fontSize: '12px' }}>An interactive deployment canvas orchestrating asynchronous microservice build workflows.</p>
        </div>

        <button 
          onClick={triggerPipelineExecution}
          disabled={isPipelineRunning || stages.length === 0}
          style={{ padding: '12px 24px', backgroundColor: isPipelineRunning ? '#1e293b' : '#fbbf24', color: isPipelineRunning ? '#475569' : '#070a13', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: isPipelineRunning ? 'not-allowed' : 'pointer', transition: '0.2s' }}
        >
          {isPipelineRunning ? `Running Compilation Flow (${runningProgressPercent}%)` : '▶ Trigger Automation Pipeline'}
        </button>
      </header>

      {/* */}
      <section style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '30px', borderRadius: '16px', marginBottom: '35px', overflowX: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', minWidth: '800px' }}>
          {stages.map((stage, idx) => (
            <React.Fragment key={stage.id}>
              {/*  */}
              <div style={{ 
                flex: '1', backgroundColor: '#070a13', border: `1px solid ${stage.status === 'Running' ? '#fbbf24' : stage.status === 'Passed' ? '#10b981' : '#1e293b'}`, 
                padding: '18px', borderRadius: '12px', minWidth: '180px', position: 'relative',
                boxShadow: stage.status === 'Running' ? '0 0 12px rgba(251, 191, 36, 0.15)' : 'none'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ 
                    fontSize: '10px', fontWeight: 'bold', padding: '2px 6px', borderRadius: '4px',
                    backgroundColor: stage.type === 'Build' ? 'rgba(59, 130, 246, 0.1)' : stage.type === 'Test' ? 'rgba(168, 85, 247, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                    color: stage.type === 'Build' ? '#3b82f6' : stage.type === 'Test' ? '#a855f7' : '#10b981'
                  }}>{stage.type}</span>
                  {!isPipelineRunning && <button onClick={() => deleteStage(stage.id)} style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', fontSize: '12px' }}>✕</button>}
                </div>

                <h4 style={{ margin: '0 0 10px 0', fontSize: '13px', color: '#f8fafc', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{stage.name}</h4>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#475569' }}>
                  <span>Runtime: {stage.duration}s</span>
                  <span style={{ 
                    fontWeight: 'bold', 
                    color: stage.status === 'Passed' ? '#10b981' : stage.status === 'Running' ? '#fbbf24' : '#475569' 
                  }}>{stage.status}</span>
                </div>
              </div>

              {/*  */}
              {idx < stages.length - 1 && (
                <div style={{ color: stages[idx + 1].status === 'Running' || stage.status === 'Passed' ? '#fbbf24' : '#1e293b', fontSize: '18px', fontWeight: 'bold' }}>➔</div>
              )}
            </React.Fragment>
          ))}

          {stages.length === 0 && (
            <p style={{ color: '#475569', width: '100%', textAlign: 'center', margin: '20px 0' }}>Pipeline map empty. Ingest custom compilation workflow stages below.</p>
          )}
        </div>
      </section>

      {/* */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '30px', marginBottom: '40px' }}>
        
        {/*  */}
        <section style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '25px', borderRadius: '16px' }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '13px', color: '#475569', textTransform: 'uppercase', borderBottom: '1px solid #1e293b', paddingBottom: '10px' }}>Inject Automation Action Stage</h3>
          <form onSubmit={handleCreateStage} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', color: '#475569', marginBottom: '6px' }}>Stage Display Name</label>
              <input type="text" placeholder="e.g., SonarQube Code Matrix Audit..." value={inputStageName} disabled={isPipelineRunning} onChange={(e) => setInputStageName(e.target.value)} style={{ width: '100%', padding: '10px', backgroundColor: '#070a13', border: '1px solid #1e293b', borderRadius: '6px', color: '#fff', fontSize: '13px', boxSizing: 'border-box' }} />
            </div>

            <div style={{ display: 'flex', gap: '15px' }}>
              <div style={{ flex: '1' }}>
                <label style={{ display: 'block', fontSize: '11px', color: '#475569', marginBottom: '6px' }}>Category Step Type</label>
                <select value={inputStageType} disabled={isPipelineRunning} onChange={(e) => setInputStageType(e.target.value)} style={{ width: '100%', padding: '9px', backgroundColor: '#070a13', border: '1px solid #1e293b', borderRadius: '6px', color: '#fff', fontSize: '13px' }}>
                  <option value="Build">Build Module</option>
                  <option value="Test">Test Suite</option>
                  <option value="Deploy">Cloud Deployment</option>
                </select>
              </div>
              <div style={{ flex: '1' }}>
                <label style={{ display: 'block', fontSize: '11px', color: '#475569', marginBottom: '6px' }}>Simulated Duration</label>
                <input type="number" min="1" max="20" value={inputDuration} disabled={isPipelineRunning} onChange={(e) => setInputDuration(e.target.value)} style={{ width: '100%', padding: '9px', backgroundColor: '#070a13', border: '1px solid #1e293b', borderRadius: '6px', color: '#fff', fontSize: '13px', boxSizing: 'border-box' }} />
              </div>
            </div>

            <button type="submit" disabled={isPipelineRunning} style={{ padding: '11px', backgroundColor: isPipelineRunning ? '#1e293b' : '#334155', color: isPipelineRunning ? '#475569' : '#fff', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', cursor: isPipelineRunning ? 'not-allowed' : 'pointer', transition: '0.15s', marginTop: '5px' }}>
              Append Stage Node ＋
            </button>
          </form>
        </section>

        {/* */}
        <section style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '25px', borderRadius: '16px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ margin: '0 0 15px 0', fontSize: '13px', color: '#475569', textTransform: 'uppercase' }}>Terminal Process Execution Output Tracer</h3>
          <div style={{ flexGrow: '1', backgroundColor: '#070a13', borderRadius: '12px', padding: '20px', minHeight: '200px', maxHeight: '250px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {buildLogs.map((log, index) => (
              <div key={index} style={{ 
                fontSize: '12px', color: log.startsWith('✅') ? '#10b981' : log.startsWith('🎉') ? '#34d399' : log.startsWith('⚙️') ? '#fbbf24' : '#64748b',
                lineHeight: '1.5'
              }}>
                {log}
              </div>
            ))}
          </div>
        </section>

      </div>

    </div>
  );
}

export default App;