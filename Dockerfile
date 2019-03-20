# Use a lighter version of Node as a parent image
FROM node
# Set the working directory to /api
RUN mkdir /api
WORKDIR /api
# copy package.json into the container at /api
COPY package*.json ./
# install dependencies
RUN npm install
# Copy the current directory contents into the container at /api
COPY . .
# Make port 80 available to the world outside this container
EXPOSE 5000
# Run the app when the container launches
CMD ["npm", "run", "server"]