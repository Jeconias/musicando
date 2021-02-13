# Musicando

This project aims to facilite communication between music and event promoters.

### How to build - Android

- Create your .keystore with:
  - `keytool -genkey -v -dname "cn=OlaMundoWeb, ou=OMW, o=none, l=none, st=Rio Grande do Norte, c=RN" -keystore my-release-key.keystore -storepass my-password -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000`
- Move the file to `android/app`
- Use the `.env.example` to create your .env file.
- In the android folder run:
  - `ENVFILE=.env.ENVIRONMENT ./gradlew assembleRelease`
