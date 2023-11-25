# Levantar el Backend

Para poner en marcha el backend de la aplicación, sigue estos simples pasos:

1. Abre una terminal en el directorio raíz del proyecto.

2. Ejecuta el siguiente comando para instalar las dependencias con Yarn:

   ```bash
   yarn install
   ```

3. Cambia al directorio `docker`:

   ```bash
   cd docker
   ```

4. Levanta el contenedor Docker ejecutando:

   ```bash
   docker-compose up -d
   ```

5. Regresa al directorio raíz:

   ```bash
   cd ..
   ```

6. Inicia el servidor de desarrollo con el siguiente comando:

   ```bash
   yarn start:dev
   ```

7. Opcional existe un endpoint llamado

   ```
      http://localhost:3500/api/seed
   ```

   de tipo get que carga dos usuarios y dos tareas de ejemplo

   un dato de acceso es santiagomutistest@gmail.com y password Karate2402! o se pueden registrar

8. El backend tiene un endpoint que filtra por estatus o por propietario de la tarea no se llevo a implementar en el front pero si existe en el backend

   user=propietario
   limit=limite
   offset=cuantos registros saltar
   status=estado de la tarea

```
http://localhost:3500/api/task?user=dperez2402&limit=2&offset=1&status=completed
```

¡Eso es todo! Ahora tu backend debería estar en funcionamiento. Si encuentras algún problema, asegúrate de haber seguido cada paso correctamente y verifica la consola de la terminal para obtener información adicional. ¡Disfruta trabajando con tu aplicación!
