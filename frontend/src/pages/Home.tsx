import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Trophy, 
  Users, 
  Target, 
  Zap, 
  Instagram, 
  Gift,
  TrendingUp,
  Award,
  Heart,
  MessageCircle,
  Share2
} from 'lucide-react'

export default function Home() {
  const [userType, setUserType] = useState<'fan' | 'brand' | null>(null)

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 pt-20 pb-32">
        <div className="mx-auto max-w-7xl">
          <motion.div 
            className="text-center"
            variants={staggerChildren}
            initial="initial"
            animate="animate"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2">
                🎮 Beta MVP - Transforma tu tiempo en valor real
              </Badge>
            </motion.div>
            
            <motion.h1 
              className="text-6xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 bg-clip-text text-transparent mb-8"
              variants={fadeInUp}
            >
              Ecosistema de
              <br />
              Gamificación Social
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              Convierte tus interacciones en Instagram en puntos reales. Las marcas descubren su comunidad más valiosa, 
              los usuarios obtienen recompensas por su engagement auténtico.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              variants={fadeInUp}
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 text-lg rounded-full shadow-2xl"
                onClick={() => setUserType('fan')}
              >
                <Users className="mr-2 h-5 w-5" />
                Soy Fan/Usuario
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-purple-200 hover:bg-purple-50 px-8 py-4 text-lg rounded-full"
                onClick={() => setUserType('brand')}
              >
                <Trophy className="mr-2 h-5 w-5" />
                Soy Marca/Empresa
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div 
          className="absolute top-20 left-10 text-purple-300 opacity-60"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Heart className="h-8 w-8" />
        </motion.div>
        
        <motion.div 
          className="absolute top-32 right-20 text-indigo-300 opacity-60"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        >
          <MessageCircle className="h-6 w-6" />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-20 left-1/4 text-pink-300 opacity-60"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 2 }}
        >
          <Share2 className="h-7 w-7" />
        </motion.div>
      </section>

      {/* User Type Selection Cards */}
      {userType && (
        <motion.section 
          className="px-6 pb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-8">
              {userType === 'fan' ? (
                <>
                  {/* Fan Journey */}
                  <Card className="p-8 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border-purple-200">
                    <div className="text-center mb-6">
                      <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mb-4">
                        <Zap className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Para Usuarios/Fans
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        "Tu tiempo en redes sociales ahora tiene valor real"
                      </p>
                    </div>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-3">
                        <Instagram className="h-5 w-5 text-purple-500" />
                        <span className="text-gray-700 dark:text-gray-300">Conecta tu Instagram</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Target className="h-5 w-5 text-indigo-500" />
                        <span className="text-gray-700 dark:text-gray-300">Gana puntos por engagement auténtico</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Trophy className="h-5 w-5 text-purple-500" />
                        <span className="text-gray-700 dark:text-gray-300">Sube de nivel: Bronze → Silver → Gold</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Gift className="h-5 w-5 text-indigo-500" />
                        <span className="text-gray-700 dark:text-gray-300">Canjea recompensas reales</span>
                      </div>
                    </div>
                    
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white">
                      Empezar como Usuario
                    </Button>
                  </Card>

                  {/* Points System Preview */}
                  <Card className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                      Sistema de Puntos
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Heart className="h-4 w-4 text-red-500" />
                          <span>Like</span>
                        </div>
                        <Badge variant="secondary">1-2 puntos</Badge>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-3">
                          <MessageCircle className="h-4 w-4 text-blue-500" />
                          <span>Comentario</span>
                        </div>
                        <Badge variant="secondary">3-5 puntos</Badge>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Share2 className="h-4 w-4 text-green-500" />
                          <span>Share</span>
                        </div>
                        <Badge variant="secondary">5-10 puntos</Badge>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="h-4 w-4 text-yellow-600" />
                        <span className="font-semibold text-yellow-800 dark:text-yellow-200">
                          IA Inteligente
                        </span>
                      </div>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">
                        Nuestros agentes AI validan que tu engagement sea auténtico y natural
                      </p>
                    </div>
                  </Card>
                </>
              ) : (
                <>
                  {/* Brand Journey */}
                  <Card className="p-8 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 border-indigo-200">
                    <div className="text-center mb-6">
                      <div className="mx-auto w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
                        <TrendingUp className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Para Marcas/Empresas
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        "Descubre y cultiva tu comunidad más valiosa"
                      </p>
                    </div>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-indigo-500" />
                        <span className="text-gray-700 dark:text-gray-300">Identifica micro-influencers auténticos</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Target className="h-5 w-5 text-blue-500" />
                        <span className="text-gray-700 dark:text-gray-300">Configura tus propios valores de puntos</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Trophy className="h-5 w-5 text-indigo-500" />
                        <span className="text-gray-700 dark:text-gray-300">Analytics profundos de comunidad</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Award className="h-5 w-5 text-blue-500" />
                        <span className="text-gray-700 dark:text-gray-300">Gestión escalable sin intervención manual</span>
                      </div>
                    </div>
                    
                    <Button className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white">
                      Empezar como Marca
                    </Button>
                  </Card>

                  {/* Brand Features Preview */}
                  <Card className="p-8 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                      Dashboard Inteligente
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Usuarios Activos</span>
                          <span className="text-2xl font-bold text-green-600">1,247</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full" style={{width: '75%'}}></div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Engagement Hoy</span>
                          <span className="text-2xl font-bold text-purple-600">856</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full" style={{width: '60%'}}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="h-4 w-4 text-blue-600" />
                        <span className="font-semibold text-blue-800 dark:text-blue-200">
                          Automatización Total
                        </span>
                      </div>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        Sin intervención manual. La IA gestiona todo: validación, puntos, clasificaciones
                      </p>
                    </div>
                  </Card>
                </>
              )}
            </div>
          </div>
        </motion.section>
      )}

      {/* Beta Testing Call-to-Action */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-4xl">
          <motion.div 
            className="text-center bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-12 text-white"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              🚀 Beta MVP - Acceso Limitado
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Únete al beta testing con <strong>@crischaconsanta</strong> y sé parte de la revolución del engagement social
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white text-purple-600 hover:bg-gray-100"
              >
                Solicitar Acceso Beta
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Ver Demo Live
              </Button>
            </div>
            
            <div className="mt-8 flex justify-center gap-8 text-sm opacity-75">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>3 Marcas Beta</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                <span>Solo Instagram</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <span>IA Validación</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}