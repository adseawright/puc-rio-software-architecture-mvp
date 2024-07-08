# Use the official Node.js image.
FROM node:14

# Set the working directory in the container.
WORKDIR /app

# Copy the package.json and package-lock.json files.
COPY package*.json ./

# Install the dependencies.
RUN npm install

# Copy the rest of the application code.
COPY . .

# Make port 3000 available to the world outside this container.
EXPOSE 3000

# Run the application.
CMD ["npm", "start"]
