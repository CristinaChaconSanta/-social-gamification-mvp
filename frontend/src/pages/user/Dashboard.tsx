import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Trophy, 
  Zap, 
  Target, 
  Gift, 
  Users, 
  TrendingUp,
  Award,
  Heart,
  MessageCircle,
  Share2,
  Instagram,
  Clock,
  Star,
  ChevronRight
} from 'lucide-react'

// Mock data - will be replaced with API calls
const mockUserData = {
  username: '@testuser1',
  totalPoints: 1247,
  availablePoints: 892,
  currentLevel: 'Silver',
  nextLevel: 'Gold',
  pointsToNext: 253,
  totalBrands: 3,
  rank: 42,
  streak: 7,
  referralCode: 'TEST1234'
}

const mockBrandStats = [
  {
    id: '1',
    name: 'CrisChaConta',
    logo: '/api/placeholder/40/40',
    points: 650,
    classification: 'Gold',
    rank: 15,
    interactions: 89,
    nextLevel: null,
    pointsToNext: 0
  },
  {
    id: '2', 
    name: 'Brand Beta 1',
    logo: '/api/placeholder/40/40',
    points: 380,
    classification: 'Silver',
    rank: 28,
    interactions: 52,
    nextLevel: 'Gold',
    pointsToNext: 120
  },
  {
    id: '3',
    name: 'Brand Beta 2', 
    logo: '/api/placeholder/40/40',
    points: 217,
    classification: 'Active',
    rank: 67,
    interactions: 34,
    nextLevel: 'Champion',
    pointsToNext: 83
  }
]

const mockRecentActivity = [
  {
    id: '1',
    type: 'comment',
    brand: 'CrisChaConta',
    points: 5,
    time: '2 min ago',
    description: 'Comentario en post de lanzamiento'
  },
  {
    id: '2',
    type: 'like',
    brand: 'Brand Beta 1',
    points: 1,
    time: '15 min ago',
    description: 'Like en story'
  },
  {
    id: '3',
    type: 'share',
    brand: 'CrisChaConta',
    points: 10,
    time: '1 hour ago',
    description: 'Compartió post en historia'
  }
]

const mockAvailableRewards = [
  {
    id: '1',
    name: 'Descuento 20% en Cursos',
    brand: 'CrisChaConta',
    cost: 150,
    type: 'discount',
    available: true
  },
  {
    id: '2',
    name: 'Sesión 1:1 Gratis',
    brand: 'CrisChaConta', 
    cost: 500,
    type: 'experience',
    available: true
  },
  {
    id: '3',
    name: 'Product Sample Kit',
    brand: 'Brand Beta 1',
    cost: 100,
    type: 'product',
    available: true
  }
]

export default function UserDashboard() {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)

  const getClassificationColor = (classification: string) => {
    switch (classification.toLowerCase()) {
      case 'gold': return 'bg-gradient-to-r from-yellow-400 to-yellow-600'
      case 'silver': return 'bg-gradient-to-r from-gray-400 to-gray-600'  
      case 'bronze': return 'bg-gradient-to-r from-orange-400 to-orange-600'
      case 'champion': return 'bg-gradient-to-r from-purple-400 to-purple-600'
      case 'active': return 'bg-gradient-to-r from-blue-400 to-blue-600'
      default: return 'bg-gradient-to-r from-gray-400 to-gray-600'
    }
  }

  const getInteractionIcon = (type: string) => {
    switch (type) {
      case 'like': return <Heart className="h-4 w-4 text-red-500" />
      case 'comment': return <MessageCircle className="h-4 w-4 text-blue-500" />
      case 'share': return <Share2 className="h-4 w-4 text-green-500" />
      default: return <Zap className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 p-6">
      <div className="mx-auto max-w-7xl">
        
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                ¡Hola {mockUserData.username}! 🎮
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Sigue jugando y acumulando puntos con tus marcas favoritas
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{mockUserData.streak}</div>
                <div className="text-sm text-gray-500">días seguidos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">#{mockUserData.rank}</div>
                <div className="text-sm text-gray-500">ranking global</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Puntos Totales</p>
                  <p className="text-3xl font-bold">{mockUserData.totalPoints.toLocaleString()}</p>
                </div>
                <Trophy className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Disponibles</p>
                  <p className="text-3xl font-bold">{mockUserData.availablePoints.toLocaleString()}</p>
                </div>
                <Gift className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Nivel Actual</p>
                  <p className="text-2xl font-bold">{mockUserData.currentLevel}</p>
                </div>
                <Award className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Marcas Activas</p>
                  <p className="text-3xl font-bold">{mockUserData.totalBrands}</p>
                </div>
                <Users className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Level Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Progreso a {mockUserData.nextLevel}</h3>
                  <p className="text-sm text-gray-500">
                    {mockUserData.pointsToNext} puntos para el siguiente nivel
                  </p>
                </div>
                <Badge className={getClassificationColor(mockUserData.currentLevel) + ' text-white'}>
                  {mockUserData.currentLevel}
                </Badge>
              </div>
              <Progress 
                value={(mockUserData.totalPoints / (mockUserData.totalPoints + mockUserData.pointsToNext)) * 100} 
                className="h-3"
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="brands" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="brands">Mis Marcas</TabsTrigger>
            <TabsTrigger value="activity">Actividad</TabsTrigger>
            <TabsTrigger value="rewards">Recompensas</TabsTrigger>
            <TabsTrigger value="referral">Referidos</TabsTrigger>
          </TabsList>

          {/* Brands Tab */}
          <TabsContent value="brands">
            <div className="grid gap-6">
              {mockBrandStats.map((brand, index) => (
                <motion.div
                  key={brand.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedBrand(brand.id)}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full flex items-center justify-center">
                            <Instagram className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{brand.name}</h3>
                            <p className="text-sm text-gray-500">{brand.interactions} interacciones</p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge className={getClassificationColor(brand.classification) + ' text-white'}>
                              {brand.classification}
                            </Badge>
                            <div className="text-2xl font-bold text-purple-600">
                              {brand.points}
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">
                            Ranking #{brand.rank}
                          </div>
                        </div>
                      </div>
                      
                      {brand.nextLevel && (
                        <div className="mt-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span>Progreso a {brand.nextLevel}</span>
                            <span>{brand.pointsToNext} puntos restantes</span>
                          </div>
                          <Progress 
                            value={(brand.points / (brand.points + brand.pointsToNext)) * 100} 
                            className="h-2"
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Actividad Reciente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRecentActivity.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="p-2 bg-white dark:bg-gray-700 rounded-full">
                        {getInteractionIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.description}</p>
                        <p className="text-sm text-gray-500">{activity.brand}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">+{activity.points}</div>
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {activity.time}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rewards Tab */}
          <TabsContent value="rewards">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockAvailableRewards.map((reward, index) => (
                <motion.div
                  key={reward.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <h3 className="font-semibold mb-2">{reward.name}</h3>
                        <p className="text-sm text-gray-500">{reward.brand}</p>
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="outline">{reward.type}</Badge>
                        <div className="text-lg font-bold text-purple-600">
                          {reward.cost} puntos
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full" 
                        disabled={!reward.available || mockUserData.availablePoints < reward.cost}
                        variant={mockUserData.availablePoints >= reward.cost ? "default" : "outline"}
                      >
                        {mockUserData.availablePoints >= reward.cost ? 'Canjear' : 'Puntos insuficientes'}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Referral Tab */}
          <TabsContent value="referral">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Sistema de Referidos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 p-4 bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg mb-4">
                    <Gift className="h-6 w-6 text-purple-600" />
                    <div>
                      <p className="font-semibold">Tu código de referido</p>
                      <p className="text-2xl font-bold text-purple-600">{mockUserData.referralCode}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Comparte tu código y gana 15-20% de los puntos que consigan tus amigos
                  </p>
                  
                  <Button className="bg-gradient-to-r from-purple-600 to-indigo-600">
                    Compartir Código
                  </Button>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">12</div>
                    <div className="text-sm text-gray-600">Amigos invitados</div>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">348</div>
                    <div className="text-sm text-gray-600">Puntos ganados</div>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">8</div>
                    <div className="text-sm text-gray-600">Activos este mes</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}