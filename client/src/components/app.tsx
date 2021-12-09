import React, { useEffect, useState } from 'react';
import NavBar from './navBar';

const App: React.FC = () => {
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
  <div style={{
    backgroundImage: `url(${background})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: '100%',
    height: '1000px',
  }}>
    {background && <NavBar />}
  </div>
  );
};

export default App;
