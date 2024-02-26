# Como es la App
En la misma se podra comprar desde la pagina principal en donde se encuentra todo el inventario de nuestros productos.
Para poder realizar una compra se requerira agregar los productos a la carta utilizando el boton del carrito.
Por otro lado la app contara con la configuracion de permisos para poder agregar productos a el inventario.

# Que formato se uso
La app se realizo con Node js y react. La misma cuenta con un Root de rutas para las paginas que son Products, Contact, 
Add Product, LogIn (dentro LogOut y Register) y Cart.

# Como se manejo la información 
Se utiliza un Context Provider para manejar todas las variables mas dinamicas de la app. 
La estructura se hizo a base de funciones no de clases utilizando hook con el fin de renderizar las pantallas a partir de los 
cambios en las variables que se muestran en las diferentes pantallas.

# Diseño de la App 
Se utilizo como diseño de pantalla una estructura a partir de bulma.css.

# Firebase Database (Real Time)
Para la escritura , sobrescritura y eliminacion de los datos que se utilizan en la pagina se hace a partir de firebase, 
especificamente firebase Database.
La estructura a partir de objetos esta compuesta por :
{
  products: [], por aca se encontrara el listado de productos.
  user: [
	username0:{ cada usuario tendra una lista de carts. 
           carts:[
		esto tendra una referencia por usuario y un producto asociado
	   ]
	}
  ]
}

#Firebase Authentification
Se utilizo la posibilidad de crear, iniciar sesión y salir de la sesión.
El usuario podra ingresar con permisos admin utilizando el checkbox de admin. 

# Versionado compatible 

nvm -v 1.1.12
node -v 16.14.0 (a partir de la version 16 no es compatible con las dependencias)
npm -v 8.3.1 

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
