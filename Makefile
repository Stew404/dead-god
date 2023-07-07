run:
	docker-compose up --build -d

stop:
	docker-compose down -v

restart:
	docker-compose down -v
	docker-compose build
	docker-compose up -d