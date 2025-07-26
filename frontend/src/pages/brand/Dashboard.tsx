import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { 
  Users, 
  TrendingUp, 
  Heart, 
  MessageCircle, 
  Share2,
  Trophy,
  Target,
  Zap,
  Settings,
  Plus,
  Instagram,
  Calendar,
  Award,
  Gift,
  Star,
  ChevronRight,
  Filter
} from 'lucide-react'

// Mock data for CrisChaConta
const mockBrandData = {
  name: 'CrisChaConta',
  plan: 'Premium',
  totalUsers: 1247,
  activeUsers: 892,
  totalInteractions: 15648,
  todayInteractions: 156,
  pointsDistributed: 45890,
  campaignsActive: 3
}

const mockDailyStats = [
  { date: '15/01', interactions: 120, users: 45, points: 380 },
  { date: '16/01', interactions: 95, users: 38, points: 295 },
  { date: '17/01', interactions: 156, users: 62, points: 468 },
  { date: '18/01', interactions: 178, users: 71, points: 534 },
  { date: '19/01', interactions: 142, users: 55, points: 426 },
  { date: '20/01', interactions: 189, users: 78, points: 567 },
  { date: '21/01', interactions: 156, users: 64, points: 468 }
]

const mockUserClassifications = [
  { name: 'Bronze', value: 680, color: '#CD7F32', percentage: 54.5 },
  { name: 'Silver', value: 412, color: '#C0C0C0', percentage: 33.1 },
  { name: 'Gold', value: 155, color: '#FFD700', percentage: 12.4 }
]

const mockTopUsers = [
  {
    id: '1',
    username: '@superfan_maria',
    points: 2840,
    classification: 'Gold',
    interactions: 247,
    growth: '+12%',
    potentialInfluencer: true
  },
  {
    id: '2', 
    username: '@carlos_active',
    points: 1920,
    classification: 'Gold',
    interactions: 189,
    growth: '+8%',
    potentialInfluencer: true
  },
  {
    id: '3',
    username: '@ana_community',
    points: 1675,
    classification: 'Silver',
    interactions: 156,
    growth: '+15%',
    potentialInfluencer: false
  },
  {
    id: '4',
    username: '@diego_fan',
    points: 1540,
    classification: 'Silver', 
    interactions: 134,
    growth: '+5%',
    potentialInfluencer: false
  }
]

const mockRecentInteractions = [
  {
    id: '1',
    user: '@superfan_maria',
    type: 'comment',
    content: 'Increíble contenido! Siempre aprendo algo nuevo 🔥',
    points: 5,
    time: '2 min ago',
    validated: true
  },
  {
    id: '2',
    user: '@carlos_active', 
    type: 'share',
    content: 'Compartió en historia',
    points: 10,
    time: '5 min ago',
    validated: true
  },
  {
    id: '3',
    user: '@ana_community',
    type: 'comment',
    content: 'Justo lo que necesitaba escuchar hoy, gracias!',
    points: 5,
    time: '12 min ago',
    validated: true
  }
]

const mockCampaigns = [
  {
    id: '1',
    name: 'Lanzamiento Curso Avanzado',
    status: 'active',
    interactions: 1247,
    users: 289,
    points: 3890,
    endDate: '2024-02-15',
    performance: 'excellent'
  },
  {
    id: '2',
    name: 'Community Challenge',
    status: 'active', 
    interactions: 856,
    users: 167,
    points: 2340,
    endDate: '2024-01-30',
    performance: 'good'
  },
  {
    id: '3',
    name: 'Beta Testing MVP',
    status: 'active',
    interactions: 432,
    users: 98,
    points: 1290,
    endDate: '2024-02-28',
    performance: 'good'
  }
]

export default function BrandDashboard() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d')
  
  const getClassificationColor = (classification: string) => {
    switch (classification.toLowerCase()) {
      case 'gold': return 'bg-gradient-to-r from-yellow-400 to-yellow-600'
      case 'silver': return 'bg-gradient-to-r from-gray-400 to-gray-600'  
      case 'bronze': return 'bg-gradient-to-r from-orange-400 to-orange-600'
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

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'excellent': return 'text-green-600 bg-green-100'
      case 'good': return 'text-blue-600 bg-blue-100'
      case 'average': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 p-6">
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
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                Dashboard {mockBrandData.name} 📊
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Gestiona tu comunidad y descubre micro-influencers auténticos
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2">
                Plan {mockBrandData.plan}
              </Badge>
              <Button variant="outline" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Configurar
              </Button>
              <Button className="bg-gradient-to-r from-indigo-600 to-blue-600">
                <Plus className="h-4 w-4 mr-2" />
                Nueva Campaña
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-100 text-sm">Usuarios Totales</p>
                  <p className="text-3xl font-bold">{mockBrandData.totalUsers.toLocaleString()}</p>
                  <p className="text-indigo-200 text-xs mt-1">+12% vs mes anterior</p>
                </div>
                <Users className="h-8 w-8 text-indigo-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Interacciones Hoy</p>
                  <p className="text-3xl font-bold">{mockBrandData.todayInteractions}</p>
                  <p className="text-green-200 text-xs mt-1">+8% vs ayer</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Puntos Distribuidos</p>
                  <p className="text-3xl font-bold">{(mockBrandData.pointsDistributed / 1000).toFixed(1)}k</p>
                  <p className="text-purple-200 text-xs mt-1">Este mes</p>
                </div>
                <Trophy className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Campañas Activas</p>
                  <p className="text-3xl font-bold">{mockBrandData.campaignsActive}</p>
                  <p className="text-orange-200 text-xs mt-1">2 terminan pronto</p>
                </div>
                <Target className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Usuarios</TabsTrigger>
            <TabsTrigger value="campaigns">Campañas</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Config</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid lg:grid-cols-3 gap-6">
              
              {/* Activity Chart */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Actividad de los Últimos 7 Días</CardTitle>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Filter className="h-4 w-4 mr-2" />
                          7 días
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={mockDailyStats}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="interactions" 
                          stroke="#6366f1" 
                          strokeWidth={3}
                          name="Interacciones"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="users" 
                          stroke="#10b981" 
                          strokeWidth={2}
                          name="Usuarios Únicos"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* User Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Distribución de Usuarios</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={mockUserClassifications}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        dataKey="value"
                      >
                        {mockUserClassifications.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  
                  <div className="space-y-2 mt-4">
                    {mockUserClassifications.map((item) => (
                      <div key={item.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{backgroundColor: item.color}}
                          />
                          <span className="text-sm">{item.name}</span>
                        </div>
                        <div className="text-sm font-medium">
                          {item.value} ({item.percentage}%)
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Actividad Reciente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRecentInteractions.map((interaction, index) => (
                    <motion.div
                      key={interaction.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="p-2 bg-white dark:bg-gray-700 rounded-full">
                        {getInteractionIcon(interaction.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{interaction.user}</span>
                          <Badge variant="outline" className="text-xs">
                            {interaction.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {interaction.content}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">+{interaction.points}</div>
                        <div className="text-xs text-gray-500">{interaction.time}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */} 
          <TabsContent value="users">
            <div className="space-y-6">
              
              {/* Top Users */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5" />
                      Top Usuarios - Potenciales Micro-Influencers
                    </CardTitle>
                    <Button variant="outline">
                      Ver Todos
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockTopUsers.map((user, index) => (
                      <motion.div
                        key={user.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full flex items-center justify-center text-white font-bold">
                            #{index + 1}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{user.username}</span>
                              {user.potentialInfluencer && (
                                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs">
                                  🌟 Micro-Influencer
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-500">
                              <span>{user.interactions} interacciones</span>
                              <span className="text-green-600">{user.growth}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="flex items-center gap-3 mb-1">
                            <Badge className={getClassificationColor(user.classification) + ' text-white'}>
                              {user.classification}
                            </Badge>
                            <span className="text-xl font-bold text-purple-600">
                              {user.points.toLocaleString()}
                            </span>
                          </div>
                          <Button variant="outline" size="sm">
                            Ver Perfil
                            <ChevronRight className="h-3 w-3 ml-1" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns">
            <div className="space-y-6">
              {mockCampaigns.map((campaign, index) => (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{campaign.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-green-600 border-green-600">
                              {campaign.status}
                            </Badge>
                            <Badge className={getPerformanceColor(campaign.performance)}>
                              {campaign.performance}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500 mb-1">Termina</div>
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="h-4 w-4" />
                            {campaign.endDate}
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-indigo-600">
                            {campaign.interactions.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-500">Interacciones</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">
                            {campaign.users}
                          </div>
                          <div className="text-sm text-gray-500">Usuarios Únicos</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">
                            {campaign.points.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-500">Puntos Distribuidos</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Detallados</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={mockDailyStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="interactions" fill="#6366f1" name="Interacciones" />
                    <Bar dataKey="points" fill="#10b981" name="Puntos" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Reglas de Puntos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Heart className="h-4 w-4 text-red-500" />
                      <span>Like</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">2 puntos</span>
                      <Button variant="outline" size="sm">Editar</Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <MessageCircle className="h-4 w-4 text-blue-500" />
                      <span>Comentario</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">5 puntos</span>
                      <Button variant="outline" size="sm">Editar</Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Share2 className="h-4 w-4 text-green-500" />
                      <span>Share</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">10 puntos</span>
                      <Button variant="outline" size="sm">Editar</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Clasificaciones</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Bronze</span>
                      <Button variant="outline" size="sm">Editar</Button>
                    </div>
                    <div className="text-sm text-gray-600">0 - 199 puntos</div>
                  </div>
                  
                  <div className="p-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/20 dark:to-gray-700/20 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Silver</span>
                      <Button variant="outline" size="sm">Editar</Button>
                    </div>
                    <div className="text-sm text-gray-600">200 - 699 puntos</div>
                  </div>
                  
                  <div className="p-3 bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Gold</span>
                      <Button variant="outline" size="sm">Editar</Button>
                    </div>
                    <div className="text-sm text-gray-600">700+ puntos</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}