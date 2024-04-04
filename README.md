# Recetly App
Aplicacion moviles realizada para la materia **Desarrollo de Aplicaciones Moviles para iOS**
Hecha con el Framework **React Native**
Desarrollado por **Rustic Development**, que se compone por:

- Aguilar Avila Said Sebastian
- De Leon Barrios kevin Antonio
- Garcia Avitia Jesus Roberto
- Gomez Gonzalez Jesus Roberto
- Gomez Zavala Brian Alexander
- Medina Gonzalez Ramon Alberto
- Medina Ramos Daniel Alejandro
- Sandoval Rodriguez Jorge Roque
- Zuñiga Huerta Javier Samzyel

## Explicacion del funcionamiento de la aplicacion 

1. Creacion del proyecto:
   Para crear el proyecto se debe utilizar el siguiente comando en la consola del SO "**npx react-native init proyecto**", donde:
   
   - **npx**: es un ejecutanle de Node.JS, Node.JS permite ejecutar paquetes desde el repositorio NPM sin tener que instalarlos de manera global en el sistema.
   - **react-native**: paquete que contiene las herramientas y scripts necesarios para el desarrollo de aplicaciones moviles usando React Native.
   - **init**: comando proporcionado por react-native para iniciar la creacion de un proyecto de react-native.
   - **"proyecto"**: es el nombre elegido para el proyecto.

2. Carpetas y archivos:
   **Todas** las carpetas y archivos a excepcion de la carpeta **SRC** son creados automaticamente al ejecutar el comando ya mencionado.
   Lo mas destacable es:
   - **index.js**: donde se inicializa el componente principal de la aplicacion.
   - **app.json**: declara el nombre de la aplicacion y su nombre de visualizacion.
   - **App.tsx**: es el compontente principal de la aplicacion, es el componente de mayor nivel en la aplicacion y es el que define la estructura de la interfaz de usuario. Aqui podemos definir varias cosas, por ejemplo, el sistema de navegacion, usando **Stack Navigation** o algo similar.

   Dentro de la carpeta **src** se encuentra todo el codigo fuente desarrollado por nosotros, Rustic Development.
   Su estructura es la siguiente:
```shell
    - /components         -> Aquí se encuentran los fragmentos de código que nos servirán para la aplicación.
       ├ /headers         -> Cabeceras reutilizables.
       ├ /svg             -> Iconos
       ├ /ui              -> Componentes de la interfaz reutilizables
       │ ├ /buttons       -> Botones reutilizables
       │ ├ /inputs        -> Campos de texto reutilizables
       │ ├ /layouts       -> Plantillas para reutilizar entre pantallas y que mantengan el mismo estilo
       │ ├ /loading       -> Pantallas de carga, si es que son necesarias
       │ └ /notifications -> Pantallas, PopUps o mensajes emergentes que muestran mensajes, en caso de ser necesario
       │
       └ /utils           -> Archivos con cierta utilidad para el diseño de la interfaz, ejemplo, paletas de colores
         
    - /navigation         -> Aquí se encuentran los archivos que gestionan las pantallas de la aplicación y su forma de navegar
    - /screens            -> Aquí están los archivos de cada pantalla de la aplicación
    - /utils              -> Archivos útiles como funciones específicas, por ejemplo, la función que revisa si el usuario tiene la sesión iniciada
```

3. Explicacion archivos / carpetas mas importantes

**Archivo de codigo independiente y reutilizable -> modulo**

**Antes que nada** al trabajar con React Native en este proyecto se maneja los siguientes puntos:

- Import
```shell 
      import LoadingScreen from './src/screens/RunningScreen'
      import {Button} from './src/components/ui/buttons/Button'
```
   En este caso, ambos son maneras de importar ya sean funciones, metodos, variables, etc, de archivos/modulos del proyecto o de librerias y dependencias de las cuales podemos hacer uso.

   Su manera de escribir depende de la manera de exportar del archivo que vienen, el primer import es para un elemento exportado de manera predeterminada, osea el elemento, funcion, etc, que el modulo/archivo exporta de manera por defecto.

   Por otro lado, el segundo import, se usa para extraer elementos, especificos (exportados) de un modulo, por si necesitamos algo en especifico y no todo el modulo.

- Funciones
```shell 
      export o export default function NombreDeLaFuncion ({propiedades} o props) {
         //Logica
         // Codigo
         // Etc

         return (
            //Lo que la funcion debe realizar
            // Generalmente, elemenots JSX
         )
      }

      //Se puede declarar el export junto con la inicializacion de la funcion o despues
      export o export default NombreDeLaFuncion

      o

      export o export default const NombreDeLaFuncion = ({propiedades} o props) => {
         //Logica
         // Codigo
         // Etc

         return (
            //Lo que la funcion debe realizar
            // Generalmente, elemenots JSX
         )
      }

      //Se puede declarar el export junto con la inicializacion de la funcion o despues
      export o export default NombreDeLaFuncion
```
   Si bien ambas pueden ser lo mismo, por temas de legibilidad y comodidad, en la **MAYORIA** de los archivos del proyecto se utiliza la primera forma de definir funciones. Y realmente no hay problema en usar la segunda, sirven para lo mismo o puede que tengan sus ventajas unas sobre otras, pero, nuevamente, es por temas de legibilidad y comodidad.

   **Entonces**, continuemos con la explicacion.
   
   Como se menciono anteriormente, el desarrollo de la aplicacion se encuentra en **SRC**, entonces, de lo mas importante es:
   - /src/navigation: Carpeta que contiene la inicializacion y/o definicion del como se navega en la aplicacion. Esta carpeta cuenta con los archivos:
      * /mainStack.js: Haciendo uso de las librerias **@react-navigation/native** y **@react-navigation/native-stack** se inicializa la forma de navegacion de la siguiente manera:
      ```shell

         const Stack = createNativeStackNavigator()
         Creamos una constante que almacena el resultado de la funcion createNativeStackNavigator(), un navegador de pila.

         Definimos una funcion la cual sera nuestra pila de pantallas.
         export default function MainStack() {
         return (
            <NavigationContainer> -> Componente de @react-navigation/native, devuelve la estructura de navegacion de la aplicacion
               <Stack.Navigator   -> Crea el navegador de pila
                  screenOptions={{
                     headerShown: false,
                   }}
               >
                  <Stack.Screen name="Run" component={LoadingScreen} />  -> Define la pantalla "Run" y el componente que le pertenece
                  <Stack.Screen name="StartScreen" component={StartScreen} /> -> Define la pantalla "StartScreen" y el componente que le pertenece
                  <Stack.Screen name="LogIn" component={LogIn} /> -> Define la pantalla "LogIn" y el componente que le pertenece
                  <Stack.Screen name="SignUp" component={SignUp} /> -> Define la pantalla "SignUp" y el componente que le pertenece
                  <Stack.Screen name="SignUpEmail" component={SignUpEmail} /> -> Define la pantalla "SignUpEmail" y el componente que le pertenece
                  <Stack.Screen name="SignUpPassword" component={SignUpPassword} /> -> Define la pantalla "SignUpPassword" y el componente que le pertenece
                  <Stack.Screen name="Drawer" component={DrawerNavigation} /> -> Define otro navegador como nueva pantalla
               </Stack.Navigator>
            </NavigationContainer>
            )
         }

      ```
      Nota: La primera pantalla definida es la primera pantalla mostrada al iniciar la aplicacion.

      * /DrawerNavigation.js: Haciendo uso de la libreria **@react-navigation/drawer** se crea un metodo de navegacion similar al STACK, pero este utiliza un menu desplegable para poder moverse entre pantallas. De la siguiente manera:
      ```shell
         export default function DrawerNavigation() {
            return (
               <Drawer.Navigator screenOptions={{ drawerPosition: "right", headerShown: false }} drawerContent={props => <CustomDrawerContent {...props} />}>
                  <Drawer.Screen name="Home" component={Home} />
                  <Drawer.Screen name="Perfil" component={UserProfile} />
                  <Drawer.Screen name="Recipe" component={RecipeScreen} />
                  <Drawer.Screen name="Favorite" component={FavoriteScreen} />
                  <Drawer.Screen name="Settings" component={SettingsScreen} />
               </Drawer.Navigator>
            )
         }
      ```
      Es la misma forma de definir el navegador y pantallas que tiene el stack.

   - App.tsx: Archivo por defecto, el cual maneja y define el componente principal de la aplicacion
      ```shell
         import React from 'react'
         import { SafeAreaView } from 'react-native'

         import MainStack from './src/navigation/mainStack'

         export default function App() {
            return (
            <SafeAreaView style={{ flex: 1 }}>
               <MainStack />
            </SafeAreaView>
            )
         }
      ```
   Aqui podemos notar que:
   * Se importa SafeAreaView, un componente que sirve como un contenedor que respeta las dimensiones de la pantalla, y se ajusta por si la pantalla posee **notch**
   * Se importa MainStack, o sea, el navegador que gestiona las pantallas, y dado que, la primera pantalla definida es RUN, es la primera mostrada.
   
   - src/screens: Aqui se encuentran todas las pantallas de la aplicacion, las cuales son:
      * /Favorites.js: La pantalla que se usa para mostrar los favoritos del usuario
      * /HomeScreen.js: La pantalla principal de la aplicaion
      * /LogInScreen.js: La pantalla del formulario para iniciar sesion
      * /ProfileScreen.js: La pantalla que muestra el perfil de un usuario
      * /RecipeScreen.js: La pantalla que muestra los detalles de una receta
      * /RunningScreen.js: Pantalla de carga, en esta pantalla ocurren procesos para saber si el usuario tiene una sesion activa y redirigirlo a la pagina principal, o, por otro lado, redirigirlo al menu de opciones
      * /Settings: Pantalla de ajustes
      * /SignUpScreen: Formulario que pide al usuario datos basicos para crear su cuenta
      * /SignUpEmail: Formulario que pide al usuario introduccir su correo electronico
      * /SignUpPassword: Formulario que pide al usuario la creacion de su contraseña
      * /StartScreen: La pantalla de inicio que muestra las opciones como: Iniciar sesion, registrarse, entrar como invitado

   - src/components/iu/buttons:
      * button.js: Es un boton reutilizable con caracteristicas especificas y al cual se le pueden pasar ciertos parametros extras.

      ```shell

         import { TouchableWithoutFeedback, Text, StyleSheet, View } from "react-native"

         export function Button({ ButtonText, style, onPress, TextColor, TextStyle }) {
            return (
               <TouchableWithoutFeedback onPress={onPress}>
                  <View style={{ ...styles.button, ...style }}>
                      <Text style={{ fontSize: 30, color: TextColor, ...TextStyle }}>
                        {ButtonText}
                     </Text>
                  </View>
               </TouchableWithoutFeedback>
               )
            }

            const styles = StyleSheet.create({
               button: {
                  height: 50,
                  borderRadius: 50,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
               }
            })
      ```
      Aqui: 
      - Importamos los componentes:
         * TouchableWithoutFeedback: Contenedor que permite a su contenido ser tocado, realizar una accion PERO, sin mostrar algun tipo de reaccion.
         * Text: Componente que permite renderizar texto, sin esto, no es posible mostrar texto en la aplicacion.
         * View: Contenedor donde podemos agregar otras cosas, necesario para renderizar cualquier cosa y definir sus dimensiones y estilos.

         y StyleSheet, que nos permite crear una hoja de estilos para aplicarlo a un compontente.