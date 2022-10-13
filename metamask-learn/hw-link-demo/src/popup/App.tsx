import React from 'react';
import './app.scss';

const App = () => {
  const handleClick = () => {
    chrome.tabs.create({ url: './onboarding.html' });
  };

  return (
    <div>
      <button type="button" onClick={handleClick}>Click Me to Connect Ledger</button>
    </div>
  );
};

export default App;
