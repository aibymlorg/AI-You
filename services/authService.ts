import { Player, PlayerCredentials, RegisterData } from '../player-types';

const STORAGE_KEY = 'ai_you_players';
const CURRENT_PLAYER_KEY = 'ai_you_current_player';
const DEMO_SEEDED_KEY = 'ai_you_demo_seeded';

// Demo account credentials
const DEMO_ACCOUNT: Player = {
  id: 'demo_player_001',
  username: 'DemoUser',
  email: 'demo@ai-you.com',
  password: 'demo123',
  createdAt: '2024-01-01T00:00:00.000Z',
  xp: 0,
  badges: [],
  completedMissions: []
};

// Save all players to localStorage
const savePlayers = (players: Player[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(players));
  } catch (error) {
    console.error('Error saving players to localStorage:', error);
  }
};

// Get all players from localStorage
export const getAllPlayers = (): Player[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    let players = data ? JSON.parse(data) : [];

    // Seed demo account on first access
    const isSeeded = localStorage.getItem(DEMO_SEEDED_KEY);
    if (!isSeeded) {
      const demoExists = players.some((p: Player) => p.email === DEMO_ACCOUNT.email);
      if (!demoExists) {
        players.push(DEMO_ACCOUNT);
        savePlayers(players);
        localStorage.setItem(DEMO_SEEDED_KEY, 'true');
        console.log('Demo account seeded successfully');
      } else {
        localStorage.setItem(DEMO_SEEDED_KEY, 'true');
      }
    }

    return players;
  } catch (error) {
    console.error('Error reading players from localStorage:', error);
    return [];
  }
};

// Register a new player
export const registerPlayer = (data: RegisterData): { success: boolean; message: string; player?: Player } => {
  const players = getAllPlayers();

  // Check if email already exists
  if (players.some(p => p.email.toLowerCase() === data.email.toLowerCase())) {
    return { success: false, message: 'Email already registered' };
  }

  // Check if username already exists
  if (players.some(p => p.username.toLowerCase() === data.username.toLowerCase())) {
    return { success: false, message: 'Username already taken' };
  }

  // Create new player
  const newPlayer: Player = {
    id: `player_${Date.now()}`,
    username: data.username,
    email: data.email,
    password: data.password, // In production, hash this!
    createdAt: new Date().toISOString(),
    xp: 0,
    badges: [],
    completedMissions: []
  };

  players.push(newPlayer);
  savePlayers(players);

  // Auto-login after registration
  setCurrentPlayer(newPlayer);

  return { success: true, message: 'Registration successful', player: newPlayer };
};

// Login player
export const loginPlayer = (credentials: PlayerCredentials): { success: boolean; message: string; player?: Player } => {
  const players = getAllPlayers();

  const player = players.find(
    p => p.email.toLowerCase() === credentials.email.toLowerCase() &&
         p.password === credentials.password
  );

  if (!player) {
    return { success: false, message: 'Invalid email or password' };
  }

  setCurrentPlayer(player);
  return { success: true, message: 'Login successful', player };
};

// Set current player
export const setCurrentPlayer = (player: Player): void => {
  try {
    localStorage.setItem(CURRENT_PLAYER_KEY, JSON.stringify(player));
  } catch (error) {
    console.error('Error setting current player:', error);
  }
};

// Get current player
export const getCurrentPlayer = (): Player | null => {
  try {
    const data = localStorage.getItem(CURRENT_PLAYER_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting current player:', error);
    return null;
  }
};

// Logout player
export const logoutPlayer = (): void => {
  try {
    localStorage.removeItem(CURRENT_PLAYER_KEY);
  } catch (error) {
    console.error('Error logging out:', error);
  }
};

// Update player data
export const updatePlayer = (updatedPlayer: Player): void => {
  const players = getAllPlayers();
  const index = players.findIndex(p => p.id === updatedPlayer.id);

  if (index !== -1) {
    players[index] = updatedPlayer;
    savePlayers(players);
    setCurrentPlayer(updatedPlayer);
  }
};
