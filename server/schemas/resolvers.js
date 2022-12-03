const { AuthenticationError } = require('apollo-server-express');
const { Book, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        getSingleUser: async (parent, args, context) => {//NOTE: May need to make changes to this code?
            if (context.user) {
                return User.findOne({_id: context.user._id});
            }
            throw new AuthenticationError('You need to be logged in!')
        }
    },
    Mutations: {
        createUser: async (parent, {username, email, password}) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user};
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user){
                throw new AuthenticationError('No user with this email found!');
            }

            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw) {
                throw new AuthenticationError('Incorrect password');
            }

            const token = signToken(user);
            return (token, user);
        },
        saveBook: async (parent, {}) => {
            //TODO: Add code to save a book to user's 'savedBooks'
        },
        deleteBook: async (parent, {}) => {
            //TODO: Add code to delete a book from 'savedBooks'
        }
    }
}

module.exports = resolvers;