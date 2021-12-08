import React, { useEffect, useState } from 'react';
// import { Buffer } from 'buffer';

const App: React.FC = () => {
  const [background, setBackground] = useState(null);

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
    <p>Hello from Client</p>
  </div>
  );
};

export default App;
