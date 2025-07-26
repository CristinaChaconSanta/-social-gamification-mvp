// Re-export all shadcn/ui components with proper configurations
// This file serves as a central hub for all UI components

export { Button } from "./button"
export { Input } from "./input"
export { Label } from "./label"
export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card"
export { Badge } from "./badge"
export { Progress } from "./progress"
export { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs"
export { Alert, AlertDescription, AlertTitle } from "./alert"
export { Avatar, AvatarFallback, AvatarImage } from "./avatar"
export { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./dropdown-menu"
export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"
export { Switch } from "./switch"
export { Separator } from "./separator"
export { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./dialog"
export { toast, useToast } from "./toast"

// Additional component configurations for Lovable
export const theme = {
  colors: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
    purple: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',
      600: '#9333ea',
      700: '#7c3aed',
      800: '#6b21a8',
      900: '#581c87',
    },
    indigo: {
      50: '#eef2ff',
      100: '#e0e7ff',
      200: '#c7d2fe',
      300: '#a5b4fc',
      400: '#818cf8',
      500: '#6366f1',
      600: '#4f46e5',
      700: '#4338ca',
      800: '#3730a3',
      900: '#312e81',
    }
  },
  gradients: {
    primary: 'bg-gradient-to-r from-purple-600 to-indigo-600',
    secondary: 'bg-gradient-to-r from-indigo-500 to-blue-600',
    success: 'bg-gradient-to-r from-green-500 to-emerald-600',
    warning: 'bg-gradient-to-r from-yellow-500 to-orange-600',
    danger: 'bg-gradient-to-r from-red-500 to-pink-600'
  },
  shadows: {
    card: 'shadow-lg shadow-purple-500/10',
    button: 'shadow-md shadow-indigo-500/25',
    hover: 'shadow-xl shadow-purple-500/20'
  }
}

// Custom component variants for the gamification theme
export const gamificationVariants = {
  badge: {
    bronze: 'bg-gradient-to-r from-orange-400 to-orange-600 text-white',
    silver: 'bg-gradient-to-r from-gray-400 to-gray-600 text-white', 
    gold: 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white',
    points: 'bg-gradient-to-r from-green-400 to-emerald-600 text-white',
    level: 'bg-gradient-to-r from-purple-400 to-indigo-600 text-white'
  },
  button: {
    primary: 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg shadow-purple-500/25',
    secondary: 'bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white shadow-lg shadow-indigo-500/25',
    success: 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg shadow-green-500/25'
  },
  card: {
    default: 'bg-white dark:bg-gray-800 shadow-lg shadow-purple-500/10 border border-purple-100 dark:border-purple-800',
    interactive: 'bg-white dark:bg-gray-800 shadow-lg shadow-purple-500/10 border border-purple-100 dark:border-purple-800 hover:shadow-xl hover:shadow-purple-500/20 transition-all cursor-pointer',
    stats: 'bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-purple-900/20 shadow-lg shadow-purple-500/10'
  }
}