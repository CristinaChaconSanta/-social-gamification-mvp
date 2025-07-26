import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/components/auth/AuthProvider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Instagram, 
  Trophy,
  Users,
  Zap,
  ArrowRight,
  AlertCircle
} from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function Login() {
  const { signIn, signUp } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  
  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })
  
  // Registration form state
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    full_name: '',
    instagram_username: '',
    user_type: 'fan', // 'fan' or 'brand'
    referred_by: '',
    // Brand specific fields
    brand_name: '',
    brand_description: '',
    website_url: ''
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await signIn(loginData.email, loginData.password)
      if (error) {
        setError(error.message)
      } else {
        // Redirect will happen automatically via AuthProvider
        window.location.href = registerData.user_type === 'brand' ? '/brand/dashboard' : '/user/dashboard'
      }
    } catch (err) {
      setError('Error inesperado al iniciar sesión')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    // Validation
    if (registerData.password !== registerData.confirmPassword) {
      setError('Las contraseñas no coinciden')
      setIsLoading(false)
      return
    }

    if (registerData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      setIsLoading(false)
      return
    }

    try {
      const userData = {
        username: registerData.username,
        full_name: registerData.full_name,
        instagram_username: registerData.instagram_username,
        user_type: registerData.user_type,
        referred_by: registerData.referred_by || null
      }

      // If registering as brand, include brand data
      if (registerData.user_type === 'brand') {
        Object.assign(userData, {
          brand_name: registerData.brand_name,
          brand_description: registerData.brand_description,
          website_url: registerData.website_url
        })
      }

      const { error } = await signUp(registerData.email, registerData.password, userData)
      
      if (error) {
        setError(error.message)
      } else {
        setSuccess('¡Registro exitoso! Revisa tu email para confirmar tu cuenta.')
      }
    } catch (err) {
      setError('Error inesperado al registrarse')
    } finally {
      setIsLoading(false)
    }
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 flex items-center justify-center p-6">
      <motion.div 
        className="w-full max-w-4xl"
        initial="initial"
        animate="animate"
        variants={fadeInUp}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2">
            🎮 Ecosistema de Gamificación Social
          </Badge>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Únete a la Revolución
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Transforma tu tiempo en redes sociales en valor real
          </p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="login" className="text-lg py-3">
              Iniciar Sesión
            </TabsTrigger>
            <TabsTrigger value="register" className="text-lg py-3">
              Registrarse
            </TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login">
            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="text-center">Bienvenido de Vuelta</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="tu@email.com"
                        className="pl-10"
                        value={loginData.email}
                        onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10"
                        value={loginData.password}
                        onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Iniciando...' : 'Iniciar Sesión'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  <div className="text-center">
                    <Button variant="link" className="text-sm text-gray-500">
                      ¿Olvidaste tu contraseña?
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Register Tab */}
          <TabsContent value="register">
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* User Type Selection */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-center mb-6">¿Qué eres?</h3>
                
                <div className="grid gap-4">
                  <Card 
                    className={`cursor-pointer transition-all ${
                      registerData.user_type === 'fan' 
                        ? 'ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => setRegisterData({...registerData, user_type: 'fan'})}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                          <Users className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Usuario/Fan</h4>
                          <p className="text-sm text-gray-500">
                            Gana puntos por tu engagement auténtico
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card 
                    className={`cursor-pointer transition-all ${
                      registerData.user_type === 'brand' 
                        ? 'ring-2 ring-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' 
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => setRegisterData({...registerData, user_type: 'brand'})}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full flex items-center justify-center">
                          <Trophy className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Marca/Empresa</h4>
                          <p className="text-sm text-gray-500">
                            Descubre y cultiva tu comunidad más valiosa
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Registration Form */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    Crear Cuenta {registerData.user_type === 'brand' ? 'Marca' : 'Usuario'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRegister} className="space-y-4">
                    
                    {/* Basic Info */}
                    <div className="space-y-2">
                      <Label htmlFor="reg-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="reg-email"
                          type="email"
                          placeholder="tu@email.com"
                          className="pl-10"
                          value={registerData.email}
                          onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="reg-password">Contraseña</Label>
                        <Input
                          id="reg-password"
                          type="password"
                          placeholder="••••••••"
                          value={registerData.password}
                          onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirmar</Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          placeholder="••••••••"
                          value={registerData.confirmPassword}
                          onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    {registerData.user_type === 'fan' ? (
                      // Fan specific fields
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="username">Nombre de Usuario</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="username"
                              placeholder="tu_username"
                              className="pl-10"
                              value={registerData.username}
                              onChange={(e) => setRegisterData({...registerData, username: e.target.value})}
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="full-name">Nombre Completo</Label>
                          <Input
                            id="full-name"
                            placeholder="Tu Nombre Completo"
                            value={registerData.full_name}
                            onChange={(e) => setRegisterData({...registerData, full_name: e.target.value})}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="instagram">Instagram (opcional)</Label>
                          <div className="relative">
                            <Instagram className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="instagram"
                              placeholder="@tu_instagram"
                              className="pl-10"
                              value={registerData.instagram_username}
                              onChange={(e) => setRegisterData({...registerData, instagram_username: e.target.value})}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="referral">Código de Referido (opcional)</Label>
                          <div className="relative">
                            <Zap className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="referral"
                              placeholder="ABC123"
                              className="pl-10"
                              value={registerData.referred_by}
                              onChange={(e) => setRegisterData({...registerData, referred_by: e.target.value})}
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      // Brand specific fields
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="brand-name">Nombre de la Marca</Label>
                          <Input
                            id="brand-name"
                            placeholder="Mi Marca Increíble"
                            value={registerData.brand_name}
                            onChange={(e) => setRegisterData({...registerData, brand_name: e.target.value, username: e.target.value.toLowerCase().replace(/\s+/g, '_')})}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="brand-instagram">Instagram de la Marca</Label>
                          <div className="relative">
                            <Instagram className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="brand-instagram"
                              placeholder="@mi_marca"
                              className="pl-10"
                              value={registerData.instagram_username}
                              onChange={(e) => setRegisterData({...registerData, instagram_username: e.target.value})}
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="brand-description">Descripción Breve</Label>
                          <Input
                            id="brand-description"
                            placeholder="¿A qué se dedica tu marca?"
                            value={registerData.brand_description}
                            onChange={(e) => setRegisterData({...registerData, brand_description: e.target.value})}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="website">Website (opcional)</Label>
                          <Input
                            id="website"
                            placeholder="https://mi-marca.com"
                            value={registerData.website_url}
                            onChange={(e) => setRegisterData({...registerData, website_url: e.target.value})}
                          />
                        </div>
                      </>
                    )}

                    {error && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    {success && (
                      <Alert className="border-green-200 bg-green-50 text-green-800">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{success}</AlertDescription>
                      </Alert>
                    )}

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Creando cuenta...' : `Crear Cuenta ${registerData.user_type === 'brand' ? 'Marca' : 'Usuario'}`}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Beta Notice */}
        <div className="mt-8 text-center">
          <Badge variant="outline" className="bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 border-purple-200">
            🚀 Beta MVP - Acceso limitado con @crischaconsanta
          </Badge>
        </div>
      </motion.div>
    </div>
  )
}