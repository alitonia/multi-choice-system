class DictList:
    def __init__(self, unique=False):
        self.dict = {}
        self.unique = unique

    def initiate_key(self, key):
        self.dict[key] = []

    def has_key(self, key):
        return self.dict.get(key) is not None

    def add(self, key, val):
        if self.has_key(key) is False:
            self.initiate_key(key)

        if self.unique is False or val not in self.dict[key]:
            self.dict[key].append(val)

    def get(self, key):
        if self.has_key(key):
            return self.dict[key]
        else:
            return []
