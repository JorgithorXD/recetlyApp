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


3. Explicacion archivos mas importantes
