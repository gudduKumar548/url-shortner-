const sessionIdToUserMap = new Map();
function setUser(id, user) {
    sessionIdToUserMap.set(id, user);
}
function getUser(id, user) {
    sessionIdToUserMap.get(id, user);
}
module.exports = { setUser, getUser };
