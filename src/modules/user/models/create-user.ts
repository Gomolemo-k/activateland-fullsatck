import  PrismaClient from  '@prisma/client'
const prisma = new PrismaClient();

class User {
  async createUser(email, password) {
    const newUser = await prisma.user.create({
      data: {
        email,
        password,
      },
    });
    return newUser;
  }

  async getUserById(userId) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        workspaces: true,
        userProfile: true,
        userAccount: true,
        userSession: true,
      },
    });
    return user;
  }

  async updateUser(userId, data) {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data,
      include: {
        workspaces: true,
        userProfile: true,
        userAccount: true,
        userSession: true,
      },
    });
    return updatedUser;
  }

  async deleteUser(userId) {
    const deletedUser = await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    return deletedUser;
  }
}

module.exports = User;
