import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Database types based on our schema
export interface User {
  id: string
  email: string
  username: string
  full_name?: string
  instagram_username?: string
  instagram_user_id?: string
  profile_image_url?: string
  created_at: string
  updated_at: string
  is_active: boolean
  referred_by?: string
  referral_code: string
}

export interface Brand {
  id: string
  name: string
  email: string
  instagram_username?: string
  instagram_user_id?: string
  logo_url?: string
  description?: string
  website_url?: string
  created_at: string
  updated_at: string
  is_active: boolean
  plan_type: 'freemium' | 'basic' | 'premium'
  max_tracked_users: number
}

export interface Campaign {
  id: string
  brand_id: string
  name: string
  description?: string
  instagram_post_url?: string
  start_date: string
  end_date?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface PointRule {
  id: string
  brand_id: string
  interaction_type: 'like' | 'comment' | 'share' | 'story_view'
  points_value: number
  daily_limit?: number
  created_at: string
  updated_at: string
}

export interface UserClassifications {
  id: string
  brand_id: string
  classification_name: string
  min_points: number
  max_points?: number
  benefits?: string
  created_at: string
}

export interface Interaction {
  id: string
  user_id: string
  brand_id: string
  campaign_id?: string
  interaction_type: 'like' | 'comment' | 'share' | 'story_view'
  instagram_media_id?: string
  instagram_media_url?: string
  comment_text?: string
  points_earned: number
  is_validated: boolean
  validation_method: 'pending' | 'ai' | 'manual' | 'api'
  validation_notes?: string
  created_at: string
  validated_at?: string
}

export interface UserPoints {
  id: string
  user_id: string
  brand_id: string
  total_points: number
  available_points: number
  lifetime_points: number
  current_classification: string
  last_updated: string
}

export interface PointTransaction {
  id: string
  user_id: string
  brand_id: string
  interaction_id?: string
  transaction_type: 'earn' | 'redeem' | 'expire'
  points_amount: number
  description?: string
  expires_at?: string
  created_at: string
}

export interface Reward {
  id: string
  brand_id: string
  name: string
  description?: string
  points_cost: number
  reward_type: 'product' | 'discount' | 'experience' | 'digital'
  reward_data?: string
  stock_quantity?: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Redemption {
  id: string
  user_id: string
  reward_id: string
  points_spent: number
  status: 'pending' | 'approved' | 'shipped' | 'completed'
  redemption_data?: string
  created_at: string
  fulfilled_at?: string
}

// Database type for the entire schema
export interface Database {
  public: {
    Tables: {
      users: {
        Row: User
        Insert: Omit<User, 'id' | 'created_at' | 'updated_at' | 'referral_code'>
        Update: Partial<Omit<User, 'id' | 'created_at' | 'referral_code'>>
      }
      brands: {
        Row: Brand
        Insert: Omit<Brand, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Brand, 'id' | 'created_at'>>
      }
      campaigns: {
        Row: Campaign
        Insert: Omit<Campaign, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Campaign, 'id' | 'created_at'>>
      }
      point_rules: {
        Row: PointRule
        Insert: Omit<PointRule, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<PointRule, 'id' | 'created_at'>>
      }
      user_classifications: {
        Row: UserClassifications
        Insert: Omit<UserClassifications, 'id' | 'created_at'>
        Update: Partial<Omit<UserClassifications, 'id' | 'created_at'>>
      }
      interactions: {
        Row: Interaction
        Insert: Omit<Interaction, 'id' | 'created_at' | 'validated_at'>
        Update: Partial<Omit<Interaction, 'id' | 'created_at'>>
      }
      user_points: {
        Row: UserPoints
        Insert: Omit<UserPoints, 'id' | 'last_updated'>
        Update: Partial<Omit<UserPoints, 'id'>>
      }
      point_transactions: {
        Row: PointTransaction
        Insert: Omit<PointTransaction, 'id' | 'created_at'>
        Update: Partial<Omit<PointTransaction, 'id' | 'created_at'>>
      }
      rewards: {
        Row: Reward
        Insert: Omit<Reward, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Reward, 'id' | 'created_at'>>
      }
      redemptions: {
        Row: Redemption
        Insert: Omit<Redemption, 'id' | 'created_at' | 'fulfilled_at'>
        Update: Partial<Omit<Redemption, 'id' | 'created_at'>>
      }
    }
  }
}