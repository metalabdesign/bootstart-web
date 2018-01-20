# App Localization

The build process observes the contents of the `messages` directory to determine which additional language chunks to generate. If a `fr-CA.yml` file containing message translations is created here, the build will automatically generate additional script chunks to serve the app for that locale.

The current available locales are accessible within the code as `process.env.BUILD_LOCALES` and are used to parse acceptable values from the `accept-language` header.

Locales can be hot-swapped on the client by dynamically loading additional chunks and populating the app state with new messages.
