# Usa una imagen oficial de Python
FROM python:3.11-slim

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de requerimientos
COPY requirements.txt ./

# Instala las dependencias
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copia el resto del código
COPY . .

# Expone el puerto (Render usará el 10000 por defecto, pero Gunicorn escucha en 8000)
EXPOSE 8000

# Comando para correr el servidor con Gunicorn
CMD ["gunicorn", "admin_project.wsgi:application", "--bind", "0.0.0.0:8000"] 