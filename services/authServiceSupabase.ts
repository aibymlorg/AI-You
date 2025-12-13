import { supabase, isSupabaseEnabled } from './supabaseClient';
import { Player, PlayerCredentials, RegisterData } from '../player-types';
// Fallback to localStorage if Supabase not configured
import * as localAuth from './authService';

// Register a new player
export const registerPlayer = async (data: RegisterData): Promise<{ success: boolean; message: string; player?: Player }> => {
  // If Supabase not configured, use localStorage fallback
  if (!isSupabaseEnabled || !supabase) {
    console.info('Supabase not configured, using localStorage');
    return localAuth.registerPlayer(data);
  }

  try {
    // Check if email already exists
    const { data: existingEmail } = await supabase
      .from('players')
      .select('id')
      .eq('email', data.email.toLowerCase())
      .single();

    if (existingEmail) {
      return { success: false, message: 'Email already registered' };
    }

    // Check if username already exists
    const { data: existingUsername } = await supabase
      .from('players')
      .select('id')
      .eq('username', data.username.toLowerCase())
      .single();

    if (existingUsername) {
      return { success: false, message: 'Username already taken' };
    }

    // Create new player
    const newPlayer: Omit<Player, 'id'> = {
      username: data.username,
      email: data.email.toLowerCase(),
      password: data.password, // In production, hash this on the backend!
      createdAt: new Date().toISOString(),
      xp: 0,
      badges: [],
      completedMissions: []
    };

    const { data: insertedPlayer, error } = await supabase
      .from('players')
      .insert([newPlayer])
      .select()
      .single();

    if (error) {
      console.error('Error registering player:', error);
      return { success: false, message: 'Failed to register. Please try again.' };
    }

    // Auto-login after registration
    await setCurrentPlayer(insertedPlayer as Player);

    return { success: true, message: 'Registration successful', player: insertedPlayer as Player };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, message: 'An error occurred. Please try again.' };
  }
};

// Login player
export const loginPlayer = async (credentials: PlayerCredentials): Promise<{ success: boolean; message: string; player?: Player }> => {
  // If Supabase not configured, use localStorage fallback
  if (!isSupabaseEnabled || !supabase) {
    console.info('Supabase not configured, using localStorage');
    return localAuth.loginPlayer(credentials);
  }

  try {
    const { data: player, error } = await supabase
      .from('players')
      .select('*')
      .eq('email', credentials.email.toLowerCase())
      .eq('password', credentials.password)
      .single();

    if (error || !player) {
      return { success: false, message: 'Invalid email or password' };
    }

    await setCurrentPlayer(player as Player);
    return { success: true, message: 'Login successful', player: player as Player };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'An error occurred. Please try again.' };
  }
};

// Set current player in localStorage (for session persistence)
export const setCurrentPlayer = async (player: Player): Promise<void> => {
  try {
    localStorage.setItem('ai_you_current_player', JSON.stringify(player));
  } catch (error) {
    console.error('Error setting current player:', error);
  }
};

// Get current player from localStorage
export const getCurrentPlayer = (): Player | null => {
  return localAuth.getCurrentPlayer();
};

// Logout player
export const logoutPlayer = (): void => {
  return localAuth.logoutPlayer();
};

// Update player data
export const updatePlayer = async (updatedPlayer: Player): Promise<void> => {
  // If Supabase not configured, use localStorage fallback
  if (!isSupabaseEnabled || !supabase) {
    console.info('Supabase not configured, using localStorage');
    return localAuth.updatePlayer(updatedPlayer);
  }

  try {
    const { error } = await supabase
      .from('players')
      .update({
        xp: updatedPlayer.xp,
        badges: updatedPlayer.badges,
        completedMissions: updatedPlayer.completedMissions
      })
      .eq('id', updatedPlayer.id);

    if (error) {
      console.error('Error updating player:', error);
      return;
    }

    await setCurrentPlayer(updatedPlayer);
  } catch (error) {
    console.error('Error updating player:', error);
  }
};

// Get all players (for leaderboard)
export const getAllPlayers = async (): Promise<Player[]> => {
  // If Supabase not configured, use localStorage fallback
  if (!isSupabaseEnabled || !supabase) {
    console.info('Supabase not configured, using localStorage');
    return localAuth.getAllPlayers();
  }

  try {
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .order('xp', { ascending: false });

    if (error) {
      console.error('Error fetching players:', error);
      return [];
    }

    return data as Player[];
  } catch (error) {
    console.error('Error fetching players:', error);
    return [];
  }
};
