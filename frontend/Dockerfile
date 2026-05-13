# Base image
# FROM node:20-alpine

FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies including optional ones
RUN npm install --include=optional

# Copy application files
COPY . .

# Expose port for the application
EXPOSE 3000

# Start the application in development mode
CMD ["npm", "run", "dev"]
