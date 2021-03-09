# Photo-gallery-of-NASA

This a photo gallery usging NASA's API.

This web application is impletenting Zakas/Osmani architecture. This architecture is splited in:

1. modules \* Every module is independet from the rest of modules
2. sandbox \* It allow to communicate a module with other modules
3. application core _ It allow to register modules, create the modules and managing the communication beetwen the modules _ Managing the interaction with the base library
4. the base library \* It allow DOM manipulation and AJAX communication

User manual:

1. Press button for whatever year
2. After to press a button of a year, you must press some button for a month
3. If photos collection cannot be charged, then will appear a message indicating that photos haven't been charged yet. While you press other button to see photos collection

Warning: If you can't see photo collection and instead you see the next message "Las imagenes para este mes aún no han sido cargadas. Puedes ver fotos de otro mes mientras terminanos con la carga.", it is possible that the NASA's API is limiting the rquests.
