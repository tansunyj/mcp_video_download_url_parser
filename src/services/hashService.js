function calculateHash(url) {
    return btoa(url) + "L" + (url.length + 1000) + "L" + btoa("aio-dl");
}

module.exports = {
    calculateHash
};