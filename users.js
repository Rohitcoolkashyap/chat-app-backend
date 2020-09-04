const users = [];

const addUser = ({ id, name, activeRoom }) => {
  console.log(name, activeRoom);
  name = name.trim().toLowerCase();
  activeRoom = activeRoom.trim().toLowerCase();

  const existingUser = users.find(
    (user) => user.activeRoom === activeRoom && user.name === name
  );

  if (!name || !activeRoom) return { error: "Username and room are required." };
  if (existingUser) return { error: "Username is taken." };

  const user = { id, name, activeRoom };

  users.push(user);

  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) =>
  users.filter((user) => user.activeRoom === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
