# Use the official PostgreSQL image
FROM postgres:15-alpine

# Set environment variables for PostgreSQL
ENV POSTGRES_USER=historiadealagoas
ENV POSTGRES_PASSWORD=et071921
ENV POSTGRES_DB=historiadealagoas

# Copy initialization script
COPY init-db.sql /docker-entrypoint-initdb.d/

# Expose PostgreSQL port
EXPOSE 5432

# Create a startup script that binds to the Heroku PORT
RUN echo '#!/bin/bash' > /start.sh && \
    echo 'export PGPORT=${PORT:-5432}' >> /start.sh && \
    echo 'sed -i "s/port = 5432/port = ${PGPORT}/g" /usr/local/share/postgresql/postgresql.conf.sample' >> /start.sh && \
    echo 'exec docker-entrypoint.sh postgres -p ${PGPORT}' >> /start.sh && \
    chmod +x /start.sh

CMD ["/start.sh"]
