const { gql } = require('apollo-server-express');

//TODO: Add code for saveBook() Mutation
//TODO: Add code for bookId, authors, image, and link in Book type
const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        savedBooks: [Book]
    }

    type Book {
        bookId: ID//NOTE: Change the ID value to what is returned from Google Books API
        authors: [String]
        description: String
        title: String
        image:
        link:

    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
    }

    type Mutations {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook()
        removeBook(bookId: ID!): User
    }
`;

module.exports = typeDefs;