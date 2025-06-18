import { usePWAInstall } from '@/hooks/usePWAInstall';

export const PWAInstallButton = () => {
  const { canInstall, isInstalled, platform, showInstallPrompt } =
    usePWAInstall();

  const handleInstall = async () => {
    const result = await showInstallPrompt();
    if (result) {
      alert('Aplicativo instalado com sucesso!');
    } else {
      alert('Instalação cancelada ou falhou.');
    }
  };

  if (isInstalled) {
    return <p>App já está instalado no seu dispositivo ({platform}).</p>;
  }

  if (!canInstall) {
    return <p>Este app não pode ser instalado agora.</p>;
  }

  return <button onClick={handleInstall}>Instalar App</button>;
};
