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
1. Feasibility Report
https://docs.google.com/document/d/1VT9y-X6eKpjdUpR0zedK1TY7sKEvC-VuaprmIu7D9FI/edit?usp=sharing
2. Work Breakdown Structure
https://drive.google.com/file/d/1VPGHuMnUXlsrq1DHA_kIq5Ak9kaRDmCS/view?usp=sharing
3. Risk Management
https://docs.google.com/document/d/1PNsBOK7fGuS2F5KneTkGNvHo3qNqT6UzxBCvelK87sA/edit?usp=sharing
