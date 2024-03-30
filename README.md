<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Recetly App</title>
<style>
  body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    background-color: #f7f7f7;
    padding: 20px;
  }

  h1 {
    color: #333;
  }

  h2 {
    color: #555;
  }

  p {
    color: #777;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin-bottom: 10px;
  }

  .directory {
    margin-left: 20px;
    padding-left: 20px;
    border-left: 2px solid #ccc;
  }
</style>
</head>
<body>
<h1>Recetly App</h1>
<p>Aplicación móvil realizada para la materia <strong>Desarrollo de Aplicaciones Móviles para iOS</strong>.</p>
<p>Hecha con el Framework <strong>React Native</strong>.</p>
<p>Desarrollado por <strong>Rustic Development</strong>, que se compone por:</p>
<ul>
  <li>Aguilar Avila Said Sebastian</li>
  <li>De Leon Barrios Kevin Antonio</li>
  <li>Garcia Avitia Jesus Roberto</li>
  <li>Gomez Gonzalez Jesus Roberto</li>
  <li>Gomez Zavala Brian Alexander</li>
  <li>Medina Gonzalez Ramon Alberto</li>
  <li>Medina Ramos Daniel Alejandro</li>
  <li>Sandoval Rodriguez Jorge Roque</li>
  <li>Zuñiga Huerta Javier Samzyel</li>
</ul>
<h2>Explicación del funcionamiento de la aplicación</h2>
<ol>
  <li>Creación del proyecto:
    <p>Para crear el proyecto se debe utilizar el siguiente comando en la consola del SO "<strong>npx react-native init proyecto</strong>", donde:</p>
    <ul>
      <li><strong>npx:</strong> es un ejecutable de Node.js que permite ejecutar paquetes desde el repositorio NPM sin tener que instalarlos de manera global en el sistema.</li>
      <li><strong>react-native:</strong> paquete que contiene las herramientas y scripts necesarios para el desarrollo de aplicaciones móviles usando React Native.</li>
      <li><strong>init:</strong> comando proporcionado por react-native para iniciar la creación de un proyecto de react-native.</li>
      <li><strong>"proyecto":</strong> es el nombre elegido para el proyecto.</li>
    </ul>
  </li>
  <li>Carpetas y archivos:
    <p>Todas las carpetas y archivos a excepción de la carpeta <strong>SRC</strong> son creados automáticamente al ejecutar el comando ya mencionado. Lo más destacable es:</p>
    <ul class="directory">
      <li><strong>index.js:</strong> donde se inicializa el componente principal de la aplicación.</li>
      <li><strong>app.json:</strong> declara el nombre de la aplicación y su nombre de visualización.</li>
      <li><strong>App.tsx:</strong> es el componente principal de la aplicación, es el componente de mayor nivel en la aplicación y es el que define la estructura de la interfaz de usuario. Aquí podemos definir varias cosas, por ejemplo, el sistema de navegación, usando <strong>Stack Navigation</strong> o algo similar.</li>
    </ul>
    <p>Dentro de la carpeta <strong>src</strong> se encuentra todo el código fuente desarrollado por nosotros, Rustic Development.</p>
    <ul class="directory">
      <li><strong>components:</strong> Aquí se encuentran los fragmentos de código que nos servirán para la aplicación.
        <ul class="directory">
          <li><strong>headers:</strong> Cabeceras reutilizables.</li>
          <li><strong>svg:</strong> Iconos.</li>
          <li><strong>ui:</strong> Componentes de la interfaz reutilizables
            <ul class="directory">
              <li><strong>buttons:</strong> Botones reutilizables</li>
              <li><strong>inputs:</strong> Campos de texto reutilizables</li>
              <li><strong>layouts:</strong> Plantillas para reutilizar entre pantallas y que mantengan el mismo estilo</li>
              <li><strong>loading:</strong> Pantallas de carga, si es que son necesarias</li>
              <li><strong>notifications:</strong> Pantallas, PopUps o mensajes emergentes que muestran mensajes, en caso de ser necesario</li>
            </ul>
          </li>
          <li><strong>utils:</strong> Archivos con cierta utilidad para el diseño de la interfaz, ejemplo, paletas de colores</li>
        </ul>
      </li>
      <li><strong>navigation:</strong> Aquí se encuentran los archivos que gestionan las pantallas de la aplicación y su forma de navegar</li>
      <li><strong>screens:</strong> Aquí están los archivos de cada pantalla de la aplicación</li>
      <li><strong>utils:</strong> Archivos útiles como funciones específicas, por ejemplo, la función que revisa si el usuario tiene la sesión iniciada</li>
    </ul>
  </li>
  <li>Explicación archivos más importantes</li>
</ol>
</body>
</html>
