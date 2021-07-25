class LocalStorageHelper {
  getItem(key) {
    const result = localStorage.getItem(key);
    if (result) {
      return JSON.parse(result);
    }
    return null;
  }

  setItem(key = "", json = null) {
    if (json) {
      localStorage.setItem(key, JSON.stringify(json));
    }
  }
}

export default new LocalStorageHelper();
