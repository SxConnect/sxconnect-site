version: '3.8'

services:
  wordpress-db:
    image: mariadb:11
    environment:
      - MYSQL_DATABASE=wordpress
      - MYSQL_USER=wordpress
      - MYSQL_PASSWORD=pWQ9xML2LHwUpfKDOxEd
      - MYSQL_ROOT_PASSWORD=XyqOG7VQVwkUOBaksbaw
    volumes:
      - wordpress-db-data:/var/lib/mysql
    networks:
      - networko
    deploy:
      replicas: 1
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
      placement:
        constraints:
          - node.role == manager

  wordpress:
    image: wordpress:php8.3-apache
    environment:
      - WORDPRESS_DB_HOST=wordpress-db:3306
      - WORDPRESS_DB_NAME=wordpress
      - WORDPRESS_DB_USER=wordpress
      - WORDPRESS_DB_PASSWORD=pWQ9xML2LHwUpfKDOxEd
      - WORDPRESS_TABLE_PREFIX=wp_
      # chave usada para autenticação de admin do painel (opcional, gerar em api.wordpress.org/secret-key/1.1/salt/)
    volumes:
      - wordpress-data:/var/www/html
      - wordpress-php-config:/usr/local/etc/php/conf.d
    networks:
      - networko
    deploy:
      replicas: 1
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
      placement:
        constraints:
          - node.role == manager
      labels:
        - "traefik.enable=true"
        - "traefik.http.routers.sxconnect.rule=Host(`sxconnect.com.br`) || Host(`www.sxconnect.com.br`)"
        - "traefik.http.routers.sxconnect.tls=true"
        - "traefik.http.routers.sxconnect.tls.certresolver=letsencryptresolver"
        - "traefik.http.services.sxconnect.loadbalancer.server.port=80"

volumes:
  wordpress-data:
  wordpress-db-data:
  wordpress-php-config:

networks:
  networko:
    external: true
