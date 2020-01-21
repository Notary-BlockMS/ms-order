FROM openjdk:8-jre-alpine
ADD target/eureka-service-0.0.1-SNAPSHOT.jar eureka-service-0.0.1-SNAPSHOT.jar
EXPOSE 8761
ENTRYPOINT ["sh", "-c", " java -jar /eureka-service-0.0.1-SNAPSHOT.jar"]

FROM openjdk:8-jre-alpine
ADD target/zuul-0.0.1-SNAPSHOT.jar zuul-0.0.1-SNAPSHOT.jar
EXPOSE 8761
ENTRYPOINT ["sh", "-c", " java -jar /zuul-0.0.1-SNAPSHOT.jar"]

FROM node:8.16-alpine 
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8081
CMD [ "npm", "start" ]




