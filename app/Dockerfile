# Use a lighter version of Node as a parent image
FROM node:11.11.0-alpine
# Set the working directory to /client
RUN mkdir /client
WORKDIR /client
# copy package.json into the container at /client
COPY package*.json ./
# install dependencies
RUN npm install
# Copy the current directory contents into the container at /client
COPY . .
# Make port 8080 available to the world outside this container
EXPOSE 8080
# Run the app when the container launches
CMD ["npm", "run", "dev"]