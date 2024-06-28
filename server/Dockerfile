# Python requirements
FROM python:3.10.11-slim AS flask

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy all files
COPY . .

# Set the Flask application entry point
ENV FLASK_APP=main.py

EXPOSE 8000

# Command to start the Flask server using Gunicorn
CMD ["gunicorn", "-b", "0.0.0.0:8000", "main:app"]