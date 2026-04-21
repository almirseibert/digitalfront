# ==========================================
# Estágio 1: Build (Compilação do React/Vite)
# ==========================================
FROM node:18-alpine AS builder

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todo o código do frontend para o container
COPY . .

# Roda o comando de build (gera a pasta /dist com HTML/CSS/JS otimizados)
RUN npm run build

# ==========================================
# Estágio 2: Servidor Web (Nginx)
# ==========================================
FROM nginx:alpine

# Copia os arquivos "buildados" da etapa anterior para a pasta pública do Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# (Opcional mas recomendado) Copia uma configuração customizada do Nginx 
# para garantir que as rotas do React (React Router) funcionem corretamente.
# Se você não tiver esse arquivo ainda, o Nginx usará o padrão.
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta padrão da web (o EasyPanel fará o proxy reverso para esta porta)
EXPOSE 80

# Inicia o servidor Nginx
CMD ["nginx", "-g", "daemon off;"]