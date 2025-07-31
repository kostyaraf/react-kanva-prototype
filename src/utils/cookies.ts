// Cookie utilities for saving and loading application state
export interface SavedState {
  cards: any[];
  connections: any[];
  history: Array<{ cards: any[]; connections: any[] }>;
  historyIndex: number;
  timestamp: number;
}

// Cookie configuration
const COOKIE_NAME = 'process_flow_state';
const COOKIE_EXPIRES_DAYS = 30;

// Set cookie with expiration
export const setCookie = (name: string, value: string, days: number = COOKIE_EXPIRES_DAYS) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`;
};

// Get cookie value
export const getCookie = (name: string): string | null => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
  }
  return null;
};

// Delete cookie
export const deleteCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

// Save application state to cookie
export const saveStateToCookie = (state: SavedState) => {
  try {
    const stateString = JSON.stringify(state);
    setCookie(COOKIE_NAME, stateString);
    console.log('State saved to cookie:', state);
  } catch (error) {
    console.error('Error saving state to cookie:', error);
  }
};

// Load application state from cookie
export const loadStateFromCookie = (): SavedState | null => {
  try {
    const stateString = getCookie(COOKIE_NAME);
    if (!stateString) {
      console.log('No saved state found in cookie');
      return null;
    }
    
    const state = JSON.parse(stateString);
    
    // Validate state structure
    if (!state.cards || !state.connections || !state.history) {
      console.warn('Invalid state structure in cookie, clearing...');
      deleteCookie(COOKIE_NAME);
      return null;
    }
    
    // Check if state is not too old (optional)
    const stateAge = Date.now() - (state.timestamp || 0);
    const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days
    if (stateAge > maxAge) {
      console.log('Saved state is too old, clearing...');
      deleteCookie(COOKIE_NAME);
      return null;
    }
    
    console.log('State loaded from cookie:', state);
    return state;
  } catch (error) {
    console.error('Error loading state from cookie:', error);
    deleteCookie(COOKIE_NAME);
    return null;
  }
};

// Clear saved state
export const clearSavedState = () => {
  deleteCookie(COOKIE_NAME);
  console.log('Saved state cleared');
}; 