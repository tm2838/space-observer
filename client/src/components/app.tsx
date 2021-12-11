import React, { useEffect, useState } from 'react';
import NavBar from './navBar';
import ContentSection from './contentSection';
import { Phase, Mode } from '../types/types';

const App: React.FC = () => {
  const [background, setBackground] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>('INPUT');
  const [mode, setMode] = useState<Mode>('PARKS');

  useEffect(() => {
    fetch('/background')
      .then((result) => result.blob())
      .then((res) => {
        const objectURL = URL.createObjectURL(res);
        setBackground(objectURL);
      });
  }, []);

  return (
    <div style={{
      backgroundImage: `url(${background})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      width: '100%',
      height: '1000px',
    }}>
      {background
        && <>
          <NavBar handleModeChange={setMode} handlePhaseChange={setPhase} />
          <ContentSection
            handleModeChange={setMode}
            handlePhaseChange={setPhase}
            phase={phase}
            mode={mode}
          />
        </>}
    </div>
  );
};

export default App;
