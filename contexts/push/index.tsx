import { message } from 'antd';
import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { NFT_API } from '../../api/constants';
import { useAPIContext } from '../api';

type PushContextType = {
  isSubscribed: boolean;
  subscribe: () => Promise<void>;
  unsubscribe: () => Promise<void>;
};

const base64ToUint8Array = (base64: string) => {
  if (typeof window !== 'undefined') {
    const padding = '='.repeat((4 - (base64.length % 4)) % 4);
    const b64 = (base64 + padding).replace(/-/g, '+').replace(/_/g, '/');

    const rawData = window.atob(b64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
};

const AppPushContext: React.Context<PushContextType> = createContext<PushContextType>({} as PushContextType);

export const PushProvider = ({ children }: any) => {
  const [subscription, setSubscription] = useState<PushSubscription>();
  const [registration, setRegistration] = useState<ServiceWorkerRegistration>();
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  const { token } = useAPIContext();

  const subscribe = async () => {
    try {
      if (!!registration && !!token && token.trim().length > 0) {
        Notification.requestPermission().then(async permission => {
          if (permission === 'granted') {
            const keyResponse = await axios.get(NFT_API + '/api/push/getPublicKey');
            const { result } = keyResponse.data;
            const sub = await registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: base64ToUint8Array(result)
            });
            const subJson = sub.toJSON();
            const serverSubscription = await axios.post(
              NFT_API + '/api/push/subscribe',
              {
                endpoint: subJson.endpoint,
                keys: subJson.keys
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }
            );

            console.log('PushSubscription: ', JSON.stringify(serverSubscription.data, undefined, 2));
            setSubscription(sub);
            setIsSubscribed(true);
            message.success('Subscribed for push notification');
          }
        });
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const unsubscribe = async () => {
    try {
      if (!!subscription && isSubscribed) {
        await axios.delete(NFT_API + '/api/push/cancel', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        await subscription.unsubscribe();
        setSubscription(undefined);
        setIsSubscribed(false);
        message.success('Unsubscribed from push notification');
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && (window as any).workbox !== undefined) {
      navigator.serviceWorker.ready.then(reg => {
        reg.pushManager.getSubscription().then(sub => {
          if (!!sub) {
            setSubscription(sub);
            setIsSubscribed(true);
          }
        });
        setRegistration(reg);
      });

      if ('self' in window) {
        self.addEventListener('push', (ev: any) => {
          const obj = JSON.parse(ev.data.text());
          ev.waitUntil(
            registration?.showNotification(obj.title, {
              body: obj.data,
              icon: '/icon-192x192.png'
            })
          );
        });
      }
    }
  }, []);
  return <AppPushContext.Provider value={{ isSubscribed, subscribe, unsubscribe }}>{children}</AppPushContext.Provider>;
};

export const usePush = () => useContext(AppPushContext);
