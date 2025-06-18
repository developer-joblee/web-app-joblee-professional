/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

interface PWAUpdatePromptProps {
  onUpdateAvailable?: () => void;
  onUpdateApplied?: () => void;
}

export function PWAUpdatePrompt({
  onUpdateAvailable,
  onUpdateApplied,
}: PWAUpdatePromptProps) {
  const [updateAvailable, setUpdateAvailable] = useState(false);

  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(register: any) {
      console.log('SW Registered: ' + register);
    },
    onRegisterError(error: any) {
      console.log('SW registration error', error);
    },
  });

  useEffect(() => {
    if (needRefresh) {
      setUpdateAvailable(true);
      onUpdateAvailable?.();
    }
  }, [needRefresh, onUpdateAvailable]);

  const handleUpdate = () => {
    updateServiceWorker(true);
    setUpdateAvailable(false);
    onUpdateApplied?.();
  };

  const handleClose = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
    setUpdateAvailable(false);
  };

  if (offlineReady) {
    return (
      <div className="pwa-toast">
        <div className="pwa-message">App pronto para funcionar offline</div>
        <button onClick={handleClose}>Fechar</button>
      </div>
    );
  }

  if (updateAvailable) {
    return (
      <div className="pwa-toast">
        <div className="pwa-message">
          Novo conteúdo disponível, clique no botão de atualizar para atualizar.
        </div>
        <button onClick={handleUpdate}>Atualizar</button>
        <button onClick={handleClose}>Fechar</button>
      </div>
    );
  }

  return null;
}

// Optional: Add some basic styling
const styles = `
.pwa-toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #333;
  color: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  max-width: 300px;
}

.pwa-message {
  margin-bottom: 12px;
}

.pwa-toast button {
  margin-right: 8px;
  padding: 8px 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.pwa-toast button:hover {
  background: #0056b3;
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
}
