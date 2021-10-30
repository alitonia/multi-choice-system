import time
from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, Text, DateTime
from app.core.db import Base


class TimeStampMixin(object):
    """ Timestamping mixin"""

    created = Column(Integer, default=lambda: int(time.time()))
    created._creation_order = 9998
    updated = Column(Integer, default=lambda: int(
        time.time()), onupdate=lambda: int(time.time()))
    updated._creation_order = 9998
