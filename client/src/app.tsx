import React from 'react';

export default function App(): React.ReactElement {
  return (
    <div>
      react app changed
      <button onClick={() => console.log('clicked')}>click me</button>
    </div>
  );
}
