import User from "./user.schema.js";

class UserRepository {
  async register(user) {
    const exist = await User.findOne({ email: user.email });
    if (exist) return null;
    return await User.create(user);
  }

  async findByEmail(email) {
    return await User.findOne({ email });
  }
}

export default UserRepository;
