import React, { createContext } from 'react';
import { useState } from 'react';

 export const BoardContext = createContext();

const BoardProvider = ({ children }) => {
  const [board, setBoard] = useState(Array(9).fill(null));

  return (
    <BoardContext.Provider value={{ board, setBoard }}>
      {children}
    </BoardContext.Provider>
  );
};

export default BoardProvider;
