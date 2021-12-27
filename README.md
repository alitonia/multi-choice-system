# multi-choice-system

A multiple choice exam system on browser.

# Install

* `bash cmd/propagate_env.sh`

### Frontend

* node ^14.15.0
* yarn ^1.22.x
* `yarn install`

### Backend

* python ^3.8.x
* can install directly with `pip install -r requirement.txt`
* or:

  ```
  pip install virtualenv
  virtualenv venv
  source venv/bin/activate
  pip install -r requirement.txt
  deactivate
  ```
* or just use `docker-compose`:
  * from root of repo: docker-compose up
  * then check port 0.0.0.0:8088/api/v1/pings ;/

* note: api is served in /api/v1

### Test

_TODO_

### Docker

* start database and backend with `docker-compose up`


# Design

_Doing_

# Documentation
https://drive.google.com/drive/folders/1XV3F5jSV621eYT657jwBvsW-TYCzXCmw?usp=sharing
