# Build the React frontend
FROM node:16.20.2 AS frontend
WORKDIR /accubalance/frontend
COPY frontend/package*.json ./
RUN npm install -g npm@8.19.4
RUN npm install
COPY frontend/ .
RUN npm run build

# Build the Django backend
FROM python AS backend
WORKDIR /accubalance/backend
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY backend/ .

# Create the final image
FROM python
WORKDIR /accubalance
COPY --from=frontend /accubalance/frontend/build ./frontend/build
COPY --from=backend /accubalance/backend .
COPY --from=backend /accubalance/backend/requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the ports for Django and React
EXPOSE 8000
EXPOSE 3000

# Set the environment variables for Django
ENV DJANGO_SETTINGS_MODULE=accubalance.settings

COPY start.sh .
CMD ["./start.sh"]
