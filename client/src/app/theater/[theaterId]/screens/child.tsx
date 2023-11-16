import React from 'react';

const ChildComponent = ({ onDataFromChild }:{ onDataFromChild: any }) => {
  
  const someData = 'Data from child';

  const sendDataToParent = () => {
    onDataFromChild(someData);
  };

  return (
    <div>
      <button onClick={sendDataToParent}>Send Data to Parent</button>
    </div>
  );
};

export default ChildComponent;
