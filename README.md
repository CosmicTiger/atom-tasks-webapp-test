# 📘 Atom Tasks Frontend (Technical Test)

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Firebase](https://img.shields.io/badge/firebase-%23039BE0.svg?style=for-the-badge&logo=firebase&logoColor=white)
![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)
![RxJS](https://img.shields.io/badge/rxjs-%23B7178C.svg?style=for-the-badge&logo=reactivex&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Firestore](https://img.shields.io/badge/Firestore-%23FFCA28.svg?style=for-the-badge&logo=firebase&logoColor=black)
![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/prettier-%23F7B93E.svg?style=for-the-badge&logo=prettier&logoColor=black)
![GitHub](https://img.shields.io/badge/GitHub-%23181717.svg?style=for-the-badge&logo=github&logoColor=white)
![Git](https://img.shields.io/badge/Git-%23F05032.svg?style=for-the-badge&logo=git&logoColor=white)
![Visual Studio Code](https://custom-icon-badges.demolab.com/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=vsc&logoColor=white)

## 🧩 Descripción del Proyecto

Este frontend forma parte del sistema **"Atom Tasks"**, desarrollado como solución al **challenge técnico Fullstack**.
La aplicación permite a los usuarios iniciar sesión con su correo, visualizar y gestionar sus tareas, agregarlas, editarlas, eliminarlas y marcarlas como completadas,
todo con una interfaz responsive y moderna basada en Angular 19.

## 🚀 Tecnologías Usadas

| Tecnología                                                   | Propósito                                                                      |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| [TypeScript](https://www.typescriptlang.org/)                | Superset de JavaScript con tipado estático para mayor seguridad y claridad     |
| [Node.js](https://nodejs.org/)                               | Entorno de ejecución para JavaScript del lado del servidor                     |
| [Angular CLI](https://github.com/angular/angular-cli)        | Framework frontend para el desarrollo de la aplicación. Usando la versión 19   |
| [Firebase Hosting](https://firebase.google.com/docs/hosting) | Hosting de Firebase para alojar la aplicación productiva                       |
| [Firestore](https://firebase.google.com/products/firestore)  | Base de datos NoSQL en tiempo real usada para almacenar usuarios y tareas      |
| [Zod](https://zod.dev/)                                      | Librería de validación de esquemas de datos basada en TypeScript (Backend)     |
| [ESLint](https://eslint.org/)                                | Linter de JavaScript/TypeScript para mantener consistencia y calidad de código |
| [Prettier](https://prettier.io/)                             | Formateador de código para mantener estilo uniforme                            |
| [Git](https://git-scm.com/) + [GitHub](https://github.com/)  | Control de versiones y repositorio remoto                                      |
| [Visual Studio Code](https://code.visualstudio.com/)         | Editor de código optimizado para TypeScript y desarrollo con Firebase          |

---

## 📁 Estructura del Proyecto

```bash
src/
├── app/
│   ├── core/            # Servicios, guards, constantes
│   ├── features/
│   │   ├── auth/        # LoginComponent + AuthModule
│   │   ├── tasks/       # TasksPageComponent + TaskCardComponent
│   ├── app-routing.module.ts
├── assets/
├── environments/
├── styles/
```

## 🖥️ Funcionalidades implementadas

### 🔐 Página de Inicio de Sesión

- [x] Flujo simple con campo de correo electrónico.
- [x] Llama al endpoint `/users/login-or-create` del backend.
- [x] Si el usuario existe, redirige a `/tasks`.
- [x] Si no existe, lo crea automáticamente.

### 📝 Página Principal de Tareas

- [x] Lista todas las tareas del usuario
- [x] Permite:
  - [x] Crear nuevas tareas.
  - [x] Editar título y descripción.
  - [x] Marcar como completadas o pendientes.
  - [x] Eliminar tareas.
- [x] Tareas ordenadas por fecha de creación.
- [x] Redirección al login desde cualquier parte si no hay sesión activa.

### 🎨 Responsive UI

- [x] Navegación adaptada a móvil y escritorio.
- [x] Inputs, botones, toasts, checkboxes estilizados.

## 🧠 Principios Aplicados

<pre>
✔️ Modularización por dominio (auth, tasks)
✔️ Guards para proteger rutas
✔️ Servicios singleton (AuthService, TaskService)
✔️ Observables y async pipe para reactividad
✔️ TrackBy para performance en ngFor
✔️ Routing estructurado con lazy loading
✔️ DRY / KISS / YAGNI
</pre>

## 🔐 Seguridad

- Restricción de rutas con AuthGuard
- Validación de datos del usuario antes de realizar peticiones
- Preparado para incluir autenticación Firebase Auth si se desea escalar

## ⚙️ Configuración del proyecto

1. Clonar el repositorio
   ```bash
   git clone https://github.com/CosmicTiger/atom-tasks-webapp-test.git
   cd atom-tasks-angular
   ```
2. Instalar dependencias
   ```bash
   npm install
   ```
3. 3. Ejecutar en desarrollo

   ```bash
   ng serve
   ```

   ó bien

   ```bash
   npm start
   ```

   Acceder a http://localhost:4200/

### ⚙️ Utilización de Angular CLI

> **_✏️NOTE_** - _**Recordatorio del uso de CLI**_:
> _Recuerda que es recomendable utilizar el CLI de Angular para la generación
> recurrente de código ante cualquier situación de creación de nuevos componentes, guards,
> entre otro tipo recurrente de estructuras de código requeridas en la aplicación._

1. Generar un nuevo componente
   ```bash
   ng generate component nombre-componente
   ```
2. Generar un nuevo servicio

   ```bash
   ng generate service nombre-servicio
   ```

3. Generar un nuevo guard

   ```bash
   ng generate guard nombre-guard
   ```

4. Generar un nuevo módulo

   ```bash
    ng generate module nombre-modulo
   ```

5. Checar la lista de comandos esquemáticos disponibles
   ```bash
   ng generate --help
   ```

## 🌐 Backend

Este frontend depende de las funciones backend desplegadas en Firebase.
Asegúrate de tener configurada la URL base en `🗒️ src/app/app.config.ts`:

```typescript
export const environmentAppConfig = {
  isDebug: false,
  apiUrl: "https://api.example.com",
};
```

## 🧪 Pruebas

En esta versión no se incluyen pruebas básicas en el frontend.

## ✅🌐 Accesibilidad (A11y)

Dentro de las prácticas implementadas se incluyen:

1. Uso de atributos ARIA

   - [x] aria-label dinámico en botones y enlaces para describir claramente su propósito.
   - [x] aria-labelledby y aria-describedby para asociar títulos y descripciones de formularios y modales.
   - [x] Uso de role="dialog" y aria-modal="true" en modales para indicar correctamente su función.

2. Navegación por teclado

   - [x] Todos los botones e inputs están correctamente focusables (tabindex implícito).
   - [x] Foco automático en campos relevantes al abrir modales (edit, delete) usando ViewChild + .focus().
   - [x] Cierre automático del modal al presionar Escape, respetando el flujo natural del teclado.

3. Validación visible y accesible

   - [x] Validaciones de formularios muestran errores con:
   - [x] Texto visual claro (text-red-500, DaisyUI badges)
   - [x] Mensajes conectados a inputs vía aria-describedby
   - [x] aria-invalid="true" dinámico para notificar errores activamente
   - [x] Inputs tienen label accesibles, incluso si son visualmente ocultos (.sr-only).

4. Contraste y diseño responsivo

   - [x] Uso de temas DaisyUI (dark, light, synthwave, etc.) con colores de alto contraste.
   - [x] Soporte para cambiar el tema dinámicamente con persistencia en localStorage.
   - [x] Layout responsivo con flex, w-full, max-w-screen, y sm:flex-col para una experiencia fluida en móvil y desktop.

5. Semántica clara en HTML
   - [x] Uso correcto de section, form, nav, button, label, dialog, etc.

### 📱 Compatibilidad confirmada

- [x] Navegación por teclado (Tab, Enter, Esc, Shift+Tab)
- [x] Lectores de pantalla (VoiceOver, NVDA, ChromeVox)
- [x] Interfaz adaptativa para pantallas móviles y tablets

### 🧩 Opcionalmente implementable

- [x] Foco "trap" dentro del modal (no salir del modal con Tab)
- [x] Roles como alert, status, log para feedback (ej. Toasts accesibles)

## 🧪 Pruebas unitarias

Para ejecutarlas sólo hace falta realizar:

```bash
  ng test
```

> **_✏️NOTE_** - _**Karma y su vinculo natural con Angular**_:
> _Tomar en cuenta que Angular por estándar utiliza la herramienta [Karma](https://karma-runner.github.io)
> para la ejecución de sus pruebas. Así que, se puede configurar alguna otra librería o bien, utilizar Karma._

## 🧪 Pruebas e2e

Para ejecutarlas sólo hace falta realizar:

```bash
  ng e2e
```

> **_✏️NOTE_** - _**Pruebas e2e libres de suite default**_:
> _Recordar que Angular por estándar utiliza permite que definir de manera libre el entorno de pruebas para pruebas e2e._

## 🚀 Deploy a Firebase Hosting

> **_✏️NOTE_** - _**Inicio de Sesión previamente efectuado**_:
> _Recuerda que debes de ingresar a tu sesión de firebase desde la CLI, escoger el Id de proyecto
> correspondiente para que el deploy tenga efecto._

```bash
npm run build # Se encargará de compilar los últimos cambios hechos en el código a JS
npm run deploy # Desplegará la función a Firebase
```

O usa Vercel, Netlify o GitHub Pages si prefieres otro stack.

## 📬 Contacto

Built with 💙 by Luisangel M. Marcia Palma
