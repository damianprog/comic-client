import React, { useState } from 'react';
import './more-less.scss';

const MoreLess = ({ text, length }) => {
  const [expand, setExpand] = useState(false);

  const toggleExpand = () => {
    setExpand(!expand);
  };

  const currentText = () => {
    return expand ? text : text.substring(0, length);
  };

  return (
    <p className="more-less">
      {currentText()}
      {!expand && '...'}
      {text.length > length && (
        <span className="toggle" onClick={toggleExpand}>
          {expand ? ' less' : ' more'}
        </span>
      )}
    </p>
  );
};

export default MoreLess;
