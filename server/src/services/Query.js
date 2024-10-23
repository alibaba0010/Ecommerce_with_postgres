// export const getAllUsersQuery = "SELECT * FROM users";

export const getUserById = "SELECT * FROM users WHERE id = $1";

export const checkEmailExists = "SELECT s FROM users s WHERE s.email = $1";

export const addUsers =
  "INSERT INTO users (name, email, hashedPassword) VALUES ($1, $2, $3)";
