// Types for process flow cards and their states

export interface ProcessCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  subLabel?: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Connection {
  id: string;
  fromCardId: string;
  toCardId: string;
  type: 'parallel' | 'route' | 'flow';
  label?: string;
}

export interface ProcessFlowState {
  cards: ProcessCard[];
  connections: Connection[];
  currentState: 'current' | 'target';
}

// Predefined card templates based on the Figma design
export const CARD_TEMPLATES: Omit<ProcessCard, 'id' | 'x' | 'y'>[] = [
  {
    title: 'Assembly',
    description: 'During assembly, the order is assembled and checked using the materials supplied.',
    icon: '🔧',
    color: '#D4A574',
    width: 160,
    height: 140
  },
  {
    title: 'Material order',
    description: 'All non-stocked materials for construction are recorded and ordered here.',
    icon: '🛍️',
    color: '#4CAF50',
    width: 160,
    height: 140
  },
  {
    title: 'Waiting time',
    description: 'The previous step finishes faster than the next one can begin.',
    icon: '⏳',
    subLabel: 'Order',
    color: '#9E9E9E',
    width: 160,
    height: 140
  },
  {
    title: 'Commissioning',
    description: 'All materials required for the order are compiled and delivered to the assembly department.',
    icon: '📦',
    color: '#2196F3',
    width: 160,
    height: 140
  },
  {
    title: 'Waiting time',
    description: 'A step produces more or faster than the following one can handle.',
    icon: '⏳',
    subLabel: 'Material',
    color: '#9E9E9E',
    width: 160,
    height: 140
  },
  {
    title: 'Waiting time',
    description: 'The next step is delayed due to unavailable or occupied resources.',
    icon: '⏳',
    subLabel: 'Product',
    color: '#9E9E9E',
    width: 160,
    height: 140
  },
  {
    title: 'Packaging and shipping',
    description: 'The order is secured, packaged, labeled and then released for dispatch.',
    icon: '📤',
    color: '#2196F3',
    width: 160,
    height: 140
  },
  {
    title: 'New customer in database',
    description: 'For new customers the names and addresses are entered into the database.',
    icon: '💾',
    color: '#E91E63',
    width: 160,
    height: 140
  },
  {
    title: 'Repeat Order',
    description: 'A repeat order is a new order placed again, usually due to a good experience.',
    icon: '📋',
    color: '#F5F5F5',
    width: 160,
    height: 140
  },
  {
    title: 'Packaging for employees',
    description: 'All packages intended for employees and their private use are packed here.',
    icon: '📦',
    color: '#2196F3',
    width: 160,
    height: 140
  },
  {
    title: 'Customer Path',
    description: 'Customer delivery path',
    icon: '👤',
    color: '#F5F5F5',
    width: 140,
    height: 120
  },
  {
    title: 'Employee Path',
    description: 'Employee delivery path',
    icon: '👥',
    color: '#F5F5F5',
    width: 140,
    height: 120
  },
  {
    title: 'Random Sample Check',
    description: 'Quality control check',
    icon: '🔍',
    color: '#F5F5F5',
    width: 160,
    height: 140
  },
  {
    title: 'Key issues audit',
    description: 'Every hundredth package is checked for quality. Both the package itself and its contents.',
    icon: '🔍',
    color: '#009688',
    width: 160,
    height: 140
  },
  {
    title: 'Connection to...',
    description: 'Assembly connection',
    icon: '🔗',
    color: '#9E9E9E',
    width: 160,
    height: 140
  }
]; 