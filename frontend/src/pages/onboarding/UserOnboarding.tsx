import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Instagram, 
  Check, 
  ArrowRight, 
  ArrowLeft,
  Trophy,
  Target,
  Gift,
  Zap,
  Users,
  Heart,
  MessageCircle,
  Share2,
  Star
} from 'lucide-react'

const STEPS = [
  {
    id: 1,
    title: 'Bienvenido al Juego',
    description: 'Conoce cómo funciona nuestro sistema de gamificación'
  },
  {
    id: 2,
    title: 'Conecta Instagram',
    description: 'Vincula tu cuenta para empezar a ganar puntos'
  },
  {
    id: 3,
    title: 'Elige tus Marcas',
    description: 'Selecciona las marcas que te gustan para seguir'
  },
  {
    id: 4,
    title: '¡Listo para Jugar!',
    description: 'Tu cuenta está configurada, comienza a ganar puntos'
  }
]

const mockBrands = [
  {
    id: '1',
    name: 'CrisChaConta',
    logo: '/api/placeholder/60/60',
    instagram: '@crischaconsanta',
    category: 'Educación',
    followers: '125K',
    pointsPerLike: 2,
    pointsPerComment: 5,
    description: 'Cursos y contenido educativo premium'
  },
  {
    id: '2',
    name: 'Brand Beta 1',
    logo: '/api/placeholder/60/60',
    instagram: '@brandbeta1',
    category: 'Tech',
    followers: '89K',
    pointsPerLike: 1,
    pointsPerComment: 3,
    description: 'Productos tecnológicos innovadores'
  },
  {
    id: '3',
    name: 'Brand Beta 2',
    logo: '/api/placeholder/60/60',
    instagram: '@brandbeta2',
    category: 'Lifestyle',
    followers: '67K',
    pointsPerLike: 1,
    pointsPerComment: 2,
    description: 'Estilo de vida y wellness'
  }
]

export default function UserOnboarding() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [instagramConnected, setInstagramConnected] = useState(false)
  const [userData, setUserData] = useState({
    instagram_username: '',
    preferences: {
      notifications: true,
      email_updates: true
    }
  })

  const progress = (currentStep / STEPS.length) * 100

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const toggleBrandSelection = (brandId: string) => {
    setSelectedBrands(prev => 
      prev.includes(brandId) 
        ? prev.filter(id => id !== brandId)
        : [...prev, brandId]
    )
  }

  const handleInstagramConnect = () => {
    // Mock Instagram connection
    setInstagramConnected(true)
    // In real app, this would trigger OAuth flow
  }

  const completeOnboarding = () => {
    // Save preferences and redirect to dashboard
    console.log('Onboarding completed:', {
      selectedBrands,
      userData,
      instagramConnected
    })
    window.location.href = '/user/dashboard'
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 p-6">
      <div className="mx-auto max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2">
            🎮 Configuración Inicial
          </Badge>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            ¡Bienvenido al Juego!
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Configura tu cuenta en unos simples pasos
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-500">
              Paso {currentStep} de {STEPS.length}
            </span>
            <span className="text-sm font-medium text-purple-600">
              {Math.round(progress)}% completado
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          
          {/* Step indicators */}
          <div className="flex justify-between mt-4">
            {STEPS.map((step) => (
              <div
                key={step.id}
                className={`flex flex-col items-center ${
                  step.id <= currentStep ? 'text-purple-600' : 'text-gray-400'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 mb-2 ${
                  step.id < currentStep 
                    ? 'bg-purple-600 border-purple-600 text-white'
                    : step.id === currentStep
                    ? 'border-purple-600 bg-white text-purple-600'
                    : 'border-gray-300 bg-white text-gray-400'
                }`}>
                  {step.id < currentStep ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <span className="text-sm font-bold">{step.id}</span>
                  )}
                </div>
                <span className="text-xs text-center max-w-20">{step.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              custom={currentStep}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
            >
              {/* Step 1: Welcome */}
              {currentStep === 1 && (
                <Card className="max-w-3xl mx-auto">
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Trophy className="h-10 w-10 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold mb-4">¡Esto es un Juego!</h2>
                      <p className="text-gray-600 dark:text-gray-300 text-lg">
                        Tu tiempo en redes sociales ahora tiene valor real. Cada interacción cuenta.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                      <div className="text-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <Heart className="h-8 w-8 text-red-500 mx-auto mb-3" />
                        <h3 className="font-semibold mb-2">Da Likes</h3>
                        <p className="text-sm text-gray-600">
                          Gana 1-2 puntos por cada like auténtico
                        </p>
                      </div>
                      
                      <div className="text-center p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                        <MessageCircle className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                        <h3 className="font-semibold mb-2">Comenta</h3>
                        <p className="text-sm text-gray-600">
                          Gana 3-5 puntos por comentarios naturales
                        </p>
                      </div>
                      
                      <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <Share2 className="h-8 w-8 text-green-500 mx-auto mb-3" />
                        <h3 className="font-semibold mb-2">Comparte</h3>
                        <p className="text-sm text-gray-600">
                          Gana 5-10 puntos por compartir contenido
                        </p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 p-4 rounded-lg mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="h-5 w-5 text-yellow-600" />
                        <span className="font-semibold text-yellow-800 dark:text-yellow-200">
                          IA Inteligente
                        </span>
                      </div>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">
                        Nuestros agentes AI validan que tu engagement sea auténtico. 
                        ¡No funciona el spam o comportamiento artificial!
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Connect Instagram */}
              {currentStep === 2 && (
                <Card className="max-w-2xl mx-auto">
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Instagram className="h-10 w-10 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold mb-4">Conecta tu Instagram</h2>
                      <p className="text-gray-600 dark:text-gray-300 text-lg">
                        Necesitamos acceso a tu cuenta para validar tus interacciones automáticamente
                      </p>
                    </div>

                    {!instagramConnected ? (
                      <div className="space-y-6">
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                          <h3 className="font-semibold mb-3 flex items-center gap-2">
                            <Target className="h-5 w-5" />
                            ¿Qué necesitamos?
                          </h3>
                          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                            <li>• Acceso de solo lectura a tu perfil público</li>
                            <li>• Permiso para ver tus interacciones (likes, comentarios)</li>
                            <li>• No publicamos ni modificamos nada en tu cuenta</li>
                          </ul>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <Label>Username de Instagram (opcional)</Label>
                            <div className="relative mt-2">
                              <Instagram className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                placeholder="@tu_username"
                                className="pl-10"
                                value={userData.instagram_username}
                                onChange={(e) => setUserData({
                                  ...userData, 
                                  instagram_username: e.target.value
                                })}
                              />
                            </div>
                          </div>

                          <Button
                            onClick={handleInstagramConnect}
                            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                            size="lg"
                          >
                            <Instagram className="mr-2 h-5 w-5" />
                            Conectar con Instagram
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Check className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-green-600">
                          ¡Instagram Conectado!
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Tu cuenta {userData.instagram_username || '@tu_instagram'} está lista para ganar puntos
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Step 3: Select Brands */}
              {currentStep === 3 && (
                <Card className="max-w-4xl mx-auto">
                  <CardHeader>
                    <CardTitle className="text-center text-2xl">
                      Elige las Marcas que te Gustan
                    </CardTitle>
                    <p className="text-center text-gray-600 dark:text-gray-300">
                      Selecciona al menos una marca para empezar a ganar puntos
                    </p>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid gap-6">
                      {mockBrands.map((brand) => (
                        <motion.div
                          key={brand.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Card 
                            className={`cursor-pointer transition-all ${
                              selectedBrands.includes(brand.id)
                                ? 'ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-900/20'
                                : 'hover:shadow-lg'
                            }`}
                            onClick={() => toggleBrandSelection(brand.id)}
                          >
                            <CardContent className="p-6">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full flex items-center justify-center">
                                    <Instagram className="h-8 w-8 text-white" />
                                  </div>
                                  <div>
                                    <h3 className="text-xl font-semibold">{brand.name}</h3>
                                    <p className="text-gray-500">{brand.instagram}</p>
                                    <div className="flex items-center gap-4 mt-2 text-sm">
                                      <Badge variant="outline">{brand.category}</Badge>
                                      <span className="text-gray-400">{brand.followers} seguidores</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-2">{brand.description}</p>  
                                  </div>
                                </div>
                                
                                <div className="text-right">
                                  <div className="mb-2">
                                    <div className="text-sm text-gray-500 mb-1">Puntos por:</div>
                                    <div className="space-y-1 text-sm">
                                      <div className="flex items-center gap-2">
                                        <Heart className="h-3 w-3 text-red-500" />
                                        <span>Like: {brand.pointsPerLike} pts</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <MessageCircle className="h-3 w-3 text-blue-500" />
                                        <span>Comment: {brand.pointsPerComment} pts</span>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  {selectedBrands.includes(brand.id) && (
                                    <Badge className="bg-purple-600 text-white">
                                      <Check className="h-3 w-3 mr-1" />
                                      Seleccionada
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-6 text-center text-sm text-gray-500">
                      {selectedBrands.length} marca{selectedBrands.length !== 1 ? 's' : ''} seleccionada{selectedBrands.length !== 1 ? 's' : ''}
                      {selectedBrands.length === 0 && ' (selecciona al menos una)'}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 4: Complete */}
              {currentStep === 4 && (
                <Card className="max-w-2xl mx-auto">
                  <CardContent className="p-8">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Star className="h-10 w-10 text-white" />
                      </div>
                      
                      <h2 className="text-3xl font-bold mb-4">¡Todo Listo!</h2>
                      <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
                        Tu cuenta está configurada. Ya puedes empezar a ganar puntos con tus interacciones auténticas.
                      </p>

                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
                          <Users className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                          <h3 className="font-semibold mb-2">
                            {selectedBrands.length} Marca{selectedBrands.length !== 1 ? 's' : ''} Activa{selectedBrands.length !== 1 ? 's' : ''}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Listas para empezar a darte puntos
                          </p>
                        </div>
                        
                        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                          <Instagram className="h-8 w-8 text-green-600 mx-auto mb-3" />
                          <h3 className="font-semibold mb-2">Instagram Conectado</h3>
                          <p className="text-sm text-gray-600">
                            Tracking automático activado
                          </p>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20 p-4 rounded-lg mb-6">
                        <div className="flex items-center gap-2 mb-2">
                          <Gift className="h-5 w-5 text-indigo-600" />
                          <span className="font-semibold text-indigo-800 dark:text-indigo-200">
                            ¡Bonus de Bienvenida!
                          </span>
                        </div>
                        <p className="text-sm text-indigo-700 dark:text-indigo-300">
                          Empiezas con 50 puntos de regalo en cada marca seleccionada
                        </p>
                      </div>

                      <Button
                        onClick={completeOnboarding}
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                        size="lg"
                      >
                        <Trophy className="mr-2 h-5 w-5" />
                        Ir a mi Dashboard
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Anterior
          </Button>

          <div className="text-sm text-gray-500">
            {STEPS[currentStep - 1]?.title}
          </div>

          {currentStep < STEPS.length ? (
            <Button
              onClick={nextStep}
              disabled={
                (currentStep === 2 && !instagramConnected) ||
                (currentStep === 3 && selectedBrands.length === 0)
              }
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600"
            >
              Siguiente
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={completeOnboarding}
              className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600"
            >
              Completar
              <Check className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}