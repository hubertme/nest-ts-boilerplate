FROM node:20-alpine As development

# Create app directory
WORKDIR /app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY --chown=node:node package*.json ./

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN npm ci

# Bundle app source
COPY --chown=node:node . .

# Use the node user from the image (instead of the root user)
USER node



###################
# BUILD FOR PRODUCTION
###################

FROM node:20-alpine As build

WORKDIR /app

COPY --chown=node:node package*.json ./

# In order to run `npm run build` we need access to the Nest CLI which is a dev dependency. In the previous development stage we ran `npm ci` which installed all dependencies, so we can copy over the node_modules directory from the development image
COPY --chown=node:node --from=development /app/node_modules ./node_modules

# Copy envs and keys
COPY --chown=node:node --from=development /app/envs ./envs
COPY --chown=node:node --from=development /app/keys ./keys

COPY --chown=node:node . .

# Run the build command which creates the production bundle
RUN npm run build

# Set NODE_ENV environment variable
ENV NODE_ENV production

# Running `npm ci` removes the existing node_modules directory and passing in --only=production ensures that only the production dependencies are installed. This ensures that the node_modules directory is as optimized as possible
RUN npm ci --only=production && npm cache clean --force

USER node



###################
# PRODUCTION
###################

FROM node:20-alpine As production

# Install curl for healthcheck
RUN apk add --no-cache curl

RUN ls -alh

WORKDIR /app

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist

COPY --chown=node:node --from=build /app/envs/ ./envs
COPY --chown=node:node --from=build /app/keys/ ./keys

# Add security scanning
RUN npm audit

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=30s \
  CMD curl -f http://localhost:${PORT}/health || exit 1

# Start the server using the production build
CMD [ "node", "dist/src/main" ]