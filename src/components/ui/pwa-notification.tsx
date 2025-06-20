import { useFirebaseMessaging } from '@/hooks/useFirebaseMessaging';

export const PWANotification = () => {
  const { notification } = useFirebaseMessaging();
  console.debug(notification);

  return null;
};
