export interface Message {
  id: string;
  text: string;
  timestamp: number;
  sender?: string;
}

export interface Room {
  id: string;
  name: string;
}

export interface NavigationProps {
  onNavigate: (page: string, roomId?: string, name?: string) => void;
}
