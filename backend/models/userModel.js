/**
 * Dummy user model.
 *
 * Replace with a real database/ORM implementation as needed.
 */
class UserModel {
  static getById(id) {
    return {
      id,
      name: "Demo User",
      email: "demo@example.com",
    };
  }
}

module.exports = UserModel;
