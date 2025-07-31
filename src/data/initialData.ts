import { ProcessCard, Connection } from '../types';

// Grid configuration for positioning
const GRID_CONFIG = {
  largeCellSize: 200,
  smallCellSize: 20,
  totalCellSize: 220 // largeCellSize + smallCellSize
};

// Initial demo data based on the Figma design with grid positioning
export const initialCards: ProcessCard[] = [
  {
    id: '1',
    title: 'Assembly',
    description: 'During assembly, the order is assembled and checked using the materials supplied.',
    icon: '🔧',
    color: '#D4A574',
    x: GRID_CONFIG.totalCellSize * 0,
    y: GRID_CONFIG.totalCellSize * 0,
    width: 160,
    height: 140
  },
  {
    id: '2',
    title: 'Waiting time',
    description: 'The previous step finishes faster than the next one can begin.',
    icon: '⏳',
    subLabel: 'Order',
    color: '#9E9E9E',
    x: GRID_CONFIG.totalCellSize * 1,
    y: GRID_CONFIG.totalCellSize * 0,
    width: 160,
    height: 140
  },
  {
    id: '3',
    title: 'Commissioning',
    description: 'All materials required for the order are compiled and delivered to the assembly department.',
    icon: '📦',
    color: '#2196F3',
    x: GRID_CONFIG.totalCellSize * 2,
    y: GRID_CONFIG.totalCellSize * 0,
    width: 160,
    height: 140
  },
  {
    id: '4',
    title: 'Waiting time',
    description: 'A step produces more or faster than the following one can handle.',
    icon: '⏳',
    subLabel: 'Material',
    color: '#9E9E9E',
    x: GRID_CONFIG.totalCellSize * 3,
    y: GRID_CONFIG.totalCellSize * 0,
    width: 160,
    height: 140
  },
  {
    id: '5',
    title: 'Waiting time',
    description: 'The next step is delayed due to unavailable or occupied resources.',
    icon: '⏳',
    subLabel: 'Product',
    color: '#9E9E9E',
    x: GRID_CONFIG.totalCellSize * 4,
    y: GRID_CONFIG.totalCellSize * 0,
    width: 160,
    height: 140
  },
  {
    id: '6',
    title: 'Packaging and shipping',
    description: 'The order is secured, packaged, labeled and then released for dispatch.',
    icon: '📤',
    color: '#2196F3',
    x: GRID_CONFIG.totalCellSize * 5,
    y: GRID_CONFIG.totalCellSize * 0,
    width: 160,
    height: 140
  },
  {
    id: '7',
    title: 'New customer in database',
    description: 'For new customers the names and addresses are entered into the database.',
    icon: '💾',
    color: '#E91E63',
    x: GRID_CONFIG.totalCellSize * 0,
    y: GRID_CONFIG.totalCellSize * 1,
    width: 160,
    height: 140
  },
  {
    id: '8',
    title: 'Waiting time',
    description: 'A step produces more or faster than the following one can handle.',
    icon: '⏳',
    subLabel: 'Order',
    color: '#9E9E9E',
    x: GRID_CONFIG.totalCellSize * 1,
    y: GRID_CONFIG.totalCellSize * 1,
    width: 160,
    height: 140
  },
  {
    id: '9',
    title: 'Repeat Order',
    description: 'A repeat order is a new order placed again, usually due to a good experience.',
    icon: '📋',
    color: '#F5F5F5',
    x: GRID_CONFIG.totalCellSize * 2,
    y: GRID_CONFIG.totalCellSize * 1,
    width: 160,
    height: 140
  },
  {
    id: '10',
    title: 'Packaging for employees',
    description: 'All packages intended for employees and their private use are packed here.',
    icon: '📦',
    color: '#2196F3',
    x: GRID_CONFIG.totalCellSize * 6,
    y: GRID_CONFIG.totalCellSize * 0,
    width: 160,
    height: 140
  },
  {
    id: '11',
    title: 'Customer Path',
    description: 'Customer delivery path',
    icon: '👤',
    color: '#F5F5F5',
    x: GRID_CONFIG.totalCellSize * 6,
    y: GRID_CONFIG.totalCellSize * 1,
    width: 140,
    height: 120
  },
  {
    id: '12',
    title: 'Employee Path',
    description: 'Employee delivery path',
    icon: '👥',
    color: '#F5F5F5',
    x: GRID_CONFIG.totalCellSize * 7,
    y: GRID_CONFIG.totalCellSize * 1,
    width: 140,
    height: 120
  },
  {
    id: '13',
    title: 'Random Sample Check',
    description: 'Quality control check',
    icon: '🔍',
    color: '#F5F5F5',
    x: GRID_CONFIG.totalCellSize * 6,
    y: GRID_CONFIG.totalCellSize * 2,
    width: 160,
    height: 140
  },
  {
    id: '14',
    title: 'Key issues audit',
    description: 'Every hundredth package is checked for quality. Both the package itself and its contents.',
    icon: '🔍',
    color: '#009688',
    x: GRID_CONFIG.totalCellSize * 7,
    y: GRID_CONFIG.totalCellSize * 2,
    width: 160,
    height: 140
  },
  {
    id: '15',
    title: 'Connection to...',
    description: 'Assembly connection',
    icon: '🔗',
    color: '#9E9E9E',
    x: GRID_CONFIG.totalCellSize * 8,
    y: GRID_CONFIG.totalCellSize * 2,
    width: 160,
    height: 140
  }
];

export const initialConnections: Connection[] = [
  {
    id: 'conn1',
    fromCardId: '1',
    toCardId: '2',
    type: 'flow'
  },
  {
    id: 'conn2',
    fromCardId: '2',
    toCardId: '3',
    type: 'flow'
  },
  {
    id: 'conn3',
    fromCardId: '3',
    toCardId: '4',
    type: 'flow'
  },
  {
    id: 'conn4',
    fromCardId: '4',
    toCardId: '5',
    type: 'flow'
  },
  {
    id: 'conn5',
    fromCardId: '5',
    toCardId: '6',
    type: 'flow'
  },
  {
    id: 'conn6',
    fromCardId: '1',
    toCardId: '7',
    type: 'parallel',
    label: 'parallel to'
  },
  {
    id: 'conn7',
    fromCardId: '7',
    toCardId: '8',
    type: 'flow'
  },
  {
    id: 'conn8',
    fromCardId: '8',
    toCardId: '9',
    type: 'flow'
  },
  {
    id: 'conn9',
    fromCardId: '6',
    toCardId: '10',
    type: 'route',
    label: 'route C'
  },
  {
    id: 'conn10',
    fromCardId: '6',
    toCardId: '11',
    type: 'route',
    label: 'route A'
  },
  {
    id: 'conn11',
    fromCardId: '10',
    toCardId: '12',
    type: 'route',
    label: 'route C'
  },
  {
    id: 'conn12',
    fromCardId: '11',
    toCardId: '13',
    type: 'route',
    label: 'route B'
  },
  {
    id: 'conn13',
    fromCardId: '13',
    toCardId: '14',
    type: 'flow'
  },
  {
    id: 'conn14',
    fromCardId: '14',
    toCardId: '15',
    type: 'flow'
  }
]; 