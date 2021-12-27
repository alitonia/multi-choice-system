FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7

COPY ./requirements.txt /app/requirements.txt

# install dependencies
RUN pip install -r /app/requirements.txt \
    && rm -rf /root/.cache/pip \
    && echo 'OK'

# copy project
COPY . /app
