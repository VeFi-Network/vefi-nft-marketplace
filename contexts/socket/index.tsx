import { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

import * as constants from '../../api/constants';

type SocketContextType = {
  socket?: ReturnType<typeof io>;
};

const SocketContext = createContext<SocketContextType>({} as SocketContextType);

export const SocketProvider = ({ children }: any) => {
  const [socket, setSocket] = useState<ReturnType<typeof io>>();

  useEffect(() => {
    setSocket(io(constants.NFT_API as string));
  }, []);

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};

export const useSocket = () => useContext(SocketContext);
