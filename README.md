# Install
`yarn`

# Run

`docker-compose up`

При запуске сервис write будет ждать данных, сервис read после отправки завершиться.

Можно запускать `docker-compose up -d write` и `docker-compose up read` для каждой отправки данных.

## Env

Для сервиса read:
- CLUSTER_ID
- CLIENT_ID
- SUBJECT
- URL
- SOURCE_TYPE=
- SOURCE_PATH=
- SOURCE_HWM=

Для сервиса write:
- CLUSTER_ID=test-cluster
- CLIENT_ID=write
- SUBJECT=data
- URL=nats://nats:4222
- TARGET_PATH=./asd2.txt
