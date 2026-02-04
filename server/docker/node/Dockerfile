FROM node:20-alpine

# 1. Create a non-root user for security (Essential for a sandbox)
# We create a user named 'sandboxuser'
RUN addgroup -S sandboxgroup && adduser -S sandboxuser -G sandboxgroup

WORKDIR /app

# 2. Copy package definitions first (for better caching)
# This assumes you have a package.json in your server folder
COPY package*.json ./

# 3. Install dependencies
# We install 'tsx' here to run TypeScript directly
RUN npm install && npm install -g tsx

# 4. Copy the rest of your app source code
COPY . .

# 5. Change ownership of the app folder to the non-root user
RUN chown -R sandboxuser:sandboxgroup /app

# 6. Switch to the secure user
USER sandboxuser

# 7. Start the app
CMD ["tsx", "app.ts"]