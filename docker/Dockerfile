FROM ubuntu

ENV DEBIAN_FRONTEND="noninteractive"
RUN echo "US/Pacific" > /etc/timezone
RUN echo "tzdata tzdata/Areas select US" > /tmp/preseed.txt; \
    echo "tzdata tzdata/Zones/US select Pacific" >> /tmp/preseed.txt; \
    debconf-set-selections /tmp/preseed.txt && \
    rm /etc/timezone && \
    apt-get update --fix-missing

RUN apt-get update -y \
    && apt-get install -y mariadb-server

COPY ./scripts/container-entrypoint.sh /root/launch.sh
COPY ./schema.sql /root/init.sql
RUN chmod -R 777 /root/*

ENTRYPOINT ["/root/launch.sh"]