# Ya-Va Project

Ya-Va is new project created by two web development students. 

It's a platform that provides a simple and easier way of collaboration to both people who want to collaborate and people who look for collaboration. 

Collaborate has never been so easy!

## End Points

ID | Method | Path | Description |
--- | --- | --- | --- |
1 | GET | /solicitud-colaboracion | Carga el formulario para solicitar ayuda |
2 | POST | /solicitud-colaboracion | Crea nueva Solicitud en BBDD. Se renderiza vista ‘Confirmación solicitud’|
3 | GET | /volver | Redirige al index|
4 | GET | /registro | Se renderiza formulario de registro |
5 | POST | /registro | Crea nuevo usuario en la BBDD.Se renderiza vista ‘confirmación de registro’ |
6 | GET | /:username | Renderiza el perfil del usuario (area privada) |
7 | GET | /verificacion/:codigoConfirmacion | -Desde el email- “Activa” al usuario en la BBDD. Si es correcto loguea al usuario en la web y lo redirige a su perfil |
8 | POST | /verificacion/email | Reenvía nuevo cógido de verificación al usuario. |
9 | GET | /inicio-sesion | Renderiza la vista de login  |
10 | POST | /inicio-sesion | Accede al perfil de usuario/o recarga con mensaje de error |
11 | GET | /recuperacion | Renderiza la vista de “recuperación de contraseña” |
12 | POST | /recuperacion | Envia email de recuperación y renderiza vista de confirmación de envío de recuperación |
13 | GET | /recuperacion/:codigoRecuperacion | Renderiza a la vista de “nueva contraseña” |
14 | POST | /recuperacion/:userID | Actualiza la contraseña del usuario en la BBDD y redirige a la vista de “inicio de sesión” |
15 | GET | /colaboracion/:idColab/aceptar | Asigna un helper a una petición |
16 | GET | /colaboracion/:idColab/completar | Cambia el estado de la petición a completado |

## Creators

Héctor Antón y Gabriela Gallango