#!/bin/bash

# Nome do container e da imagem
container_name="store-management-web"
image_name="store-management-web"

# Parar e remover o container se existir
if docker ps -a --filter "name=$container_name" --format "{{.Names}}" | grep -qw "$container_name"; then
  echo "Parando e removendo o container '$container_name'..."
  docker stop "$container_name" > /dev/null 2>&1
  docker rm "$container_name" > /dev/null 2>&1
  echo "Container '$container_name' removido."
fi

# Excluir a imagem com o mesmo nome, se existir
if docker images --format "{{.Repository}}" | grep -qw "$image_name"; then
  echo "Removendo a imagem '$image_name'..."
  docker rmi "$image_name" > /dev/null 2>&1
  echo "Imagem '$image_name' removida."
fi

# Criar uma nova imagem com o mesmo nome
echo "Criando uma nova imagem '$image_name'..."
docker build -t "$image_name" . > /dev/null 2>&1
echo "Imagem '$image_name' criada com sucesso."

# Rodar um novo container
echo "Iniciando um novo container '$container_name'..."
docker run -d --name "$container_name" -p 4000:4000 "$image_name" > /dev/null 2>&1
echo "Projeto web iniciado na url http://localhost:4000 ."

