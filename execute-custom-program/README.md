##Aprendizajes

1. Cuando hago el build del programa en rust de un programa generado con el CL usa el ID que esta en anchor.tom. Para generar ese ID genero un nueva wallet (Keypair) eso genera la dirección de la cuenta que será usada para el programa y es el mismo programID.
2. La autoridad del programa será la wallet que se usó para desplegar el programa desde la línea de comandos.
3. Al ejecutar el comando createJournalEntry la primera con un título va a crear una cuenta, el seed es el título más el owner 'seeds = [title.as_bytes(), owner.key().as_ref()],' (así está la lógica del programa)
4. Si se ejecuta neuvamente el comando  createJournalEntry con el mismo título desde la misma billetera se va a producir un error dicendo que la cuenta está en uso. Eso es porque intenta crear una cuenta usando el mismo seed entonces siemrpre va a dar lo mismo. (Pendiente ver porque el programa de ejemplo de ract si funciona con el mismo mensaje, tiene que ser que está cambiando el owner)
5. el comando updateJournalEntry se puede llamar las veces que sea con el mismo título de mensaje.