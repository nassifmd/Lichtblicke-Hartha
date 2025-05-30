export const users = {
  tda: "tda123",
  admin: "admin123",
  hartha: "hartha123"
};

export function authenticate(username, password) {
  return users[username] === password;
}
