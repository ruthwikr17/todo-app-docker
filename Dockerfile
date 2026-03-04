# Use official Node.js runtime as parent image
FROM node:24-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json files into the container
COPY package*.json .

# Install dependencies
RUN npm install

# Copy rest of the application code (. is the current application directory, . is the working directory in the container)
COPY . .

# Copy prisma file from application into the container
COPY prisma ./prisma/

# Run the prisma file
RUN npx prisma generate

# Expose the port that the application runs on
EXPOSE 8000

# Run the application
CMD sh -c "npx prisma db push && node ./src/server.js"