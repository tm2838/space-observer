import React, { useEffect, useState, useReducer } from 'react';
import NavBar from './components/navBar';
import ContentSection from './components/contentSection';
import { mainContext, reducer, initialState } from './spaceObserverContext';

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [background, setBackground] = useState<string | null>(null);

  useEffect(() => {
    fetch('/background')
      .then((result) => result.blob())
      .then((res) => {
        const objectURL = URL.createObjectURL(res);
        setBackground(objectURL);
      });
  }, []);

  return (
    <mainContext.Provider value={{ state, dispatch }} >
      <div style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        width: '100%',
        height: '1000px',
      }}>
        {background
          && <>
            <NavBar />
            <ContentSection />
          </>}
      </div>
    </mainContext.Provider>
  );
};

export default App;
