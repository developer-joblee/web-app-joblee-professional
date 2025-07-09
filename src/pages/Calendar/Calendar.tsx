import { Agenda } from '@/components/ui/agenda';
import { NavigationHeader } from '@/components/ui/navigation-header';
import { StripCalendar } from '@/components/ui/strip-calendar';
import { Stack } from '@chakra-ui/react';
import { useState } from 'react';

interface AgendaItem {
  id: string;
  time: string;
  title: string;
  client: string;
  address: string;
  color: 'yellow' | 'green' | 'blue' | 'purple';
}

export const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getAgendaItems = (date: Date): AgendaItem[] => {
    return sampleAgendaData[date.toDateString()] || [];
  };

  return (
    <NavigationHeader title="Agenda">
      <StripCalendar
        onDateSelect={setCurrentDate}
        agendaItems={getAgendaItems}
      />
      <Stack>
        <Agenda
          selectedDate={currentDate}
          items={getAgendaItems(currentDate)}
        />
      </Stack>
    </NavigationHeader>
  );
};

const sampleAgendaData: Record<string, AgendaItem[]> = {
  [new Date().toDateString()]: [
    {
      id: '1',
      time: '08:00',
      title: 'Corte de Cabelo',
      client: 'João Silva',
      address: 'Rua Senador Domingos Velascos, QD 28, Lt 12',
      color: 'yellow',
    },
    {
      id: '121',
      time: '08:00',
      title: 'Corte de Cabelo',
      client: 'Maria do Socorro',
      address: 'Rua Senador Domingos Velascos, QD 28, Lt 12',
      color: 'yellow',
    },
    {
      id: '2',
      time: '09:00',
      title: 'Manicure e Pedicure',
      client: 'Maria Santos',
      address: 'Av. Paulista, 1000, Apt 205',
      color: 'yellow',
    },
    {
      id: '3',
      time: '11:00',
      title: 'Massagem Relaxante',
      client: 'Carlos Oliveira',
      address: 'Rua das Flores, 123, Casa 2',
      color: 'green',
    },
    {
      id: '4',
      time: '14:00',
      title: 'Limpeza de Pele',
      client: 'Ana Costa',
      address: 'Rua Senador Domingos Velascos, QD 28, Lt 12',
      color: 'blue',
    },
  ],
  [new Date(Date.now() + 24 * 60 * 60 * 1000).toDateString()]: [
    {
      id: '5',
      time: '09:30',
      title: 'Coloração de Cabelo',
      client: 'Fernanda Lima',
      address: 'Rua Augusta, 456, Sala 301',
      color: 'purple',
    },
    {
      id: '6',
      time: '13:00',
      title: 'Depilação',
      client: 'Juliana Rocha',
      address: 'Av. Brigadeiro Faria Lima, 789',
      color: 'green',
    },
  ],
  [new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toDateString()]: [
    {
      id: '7',
      time: '10:00',
      title: 'Escova Progressiva',
      client: 'Patrícia Mendes',
      address: 'Rua Oscar Freire, 321, Loja 15',
      color: 'yellow',
    },
    {
      id: '8',
      time: '15:30',
      title: 'Tratamento Facial',
      client: 'Roberto Alves',
      address: 'Rua Consolação, 654, Conj 12',
      color: 'blue',
    },
  ],
};
