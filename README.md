# Ya-Va Project

"Ya-Va" is project created by two web development students. 

It's a platform that provides a simple and easier way of collaboration to both people who want to collaborate and people who look for collaboration. 

Collaborating has never been so easy!

## End Points

ID | Method | Path | Description |
--- | --- | --- | --- |
1 | GET | /collaboration-request | Carga el formulario para solicitar ayuda |
2 | POST | /collaboration-request | Crea nueva Solicitud en BBDD. Se renderiza vista ‘Confirmación solicitud’|
3 | GET | /back | Redirige al index|
4 | GET | /signup | Se renderiza formulario de registro |
5 | POST | /signup | Crea nuevo usuario en la BBDD.Se renderiza vista ‘confirmación de registro’ |
6 | GET | /:username | Renderiza el perfil del usuario (area privada) |
7 | GET | /verification/:confirmationCode | -Desde el email- “Activa” al usuario en la BBDD. Si es correcto loguea al usuario en la web y lo redirige a su perfil |
8 | POST | /verification/email | Reenvía nuevo cógido de verificación al usuario. |
9 | GET | /login | Renderiza la vista de login  |
10 | POST | /login | Accede al perfil de usuario/o recarga con mensaje de error |
11 | GET | /recuperation | Renderiza la vista de “recuperación de contraseña” |
12 | POST | /recuperation | Envia email de recuperación y renderiza vista de confirmación de envío de recuperación |
13 | GET | /recuperation/:recuperationCode | Renderiza a la vista de “nueva contraseña” |
14 | POST | /recuperation/:userID | Actualiza la contraseña del usuario en la BBDD y redirige a la vista de “inicio de sesión” |
15 | GET | /collaboration/:collaborationId/accept | Asigna un helper a una petición |
16 | GET | /collaboration/:collaborationId/complet | Cambia el estado de la petición a completado |

## Creators

Héctor Antón y Gabriela Gallango
