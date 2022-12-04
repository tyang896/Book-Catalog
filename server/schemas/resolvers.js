const { AuthenticationError } = require('apollo-server-express');
const { Book, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        //TODO: Add code to find user
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({_id: context.user._id});
            }
            throw new AuthenticationError('You need to be logged in!')
        }
    },
    Mutations: {
        addUser: async (parent, {username, email, password}) => {
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
        removeBook: async (parent, { bookId }, context) => {
            //TODO: Add code to delete a book from 'savedBooks'
            if(context.user) {
                const book = await Book.findOneAndDelete({
                    _id: bookId
                })
            }
            throw new AuthenticationError('You need to be logged in!')

        }
    }
}

module.exports = resolvers;