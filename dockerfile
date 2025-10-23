# Use official nginx image
FROM nginx:alpine

# Clean default files
RUN rm -rf /usr/share/nginx/html/*

# Copy app files to nginx directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
