import {ApolloServer, gql} from "apollo-server"

const persons = [
    {
        name: "John",
        phone: "123",
        street: "av fakestreet",
        city: "Mountain",
        check: "John",
        id: "122jh3j2b"
    },
    {
        name: "Juan",
        phone: "1233",
        street: "av fakestreet",
        city: "Mountain",
        check: "Juan",
        id: "122jh3j2b"
    },
    {
        name: "Hans",
        phone: "1233",
        street: "av fakestreet",
        city: "Mountain",
        check: "Hans",
        id: "122jh3j2b"
    }
]
const typeDefinitions = gql`
    type Address {
        street: String!
        city: String!
    }

    type Person{
        name: String!
        phone: String
        address: Address!
        id: ID!
}
    type Query{
        personCount: Int!
        allPersons: [Person]!
        findPerson(name: String): Person
    }
`

const resolvers = {
    Query: {
        personCount: ()=> persons.length,
        allPersons: ()=> persons,
        findPerson: (root,args)=>{
            const{name} = args
            return persons.find(person => person.name === name)
        }
    },
    Person: {
        address: (root) =>{
            return {
                street: root.street,
                city: root.city
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs: typeDefinitions,
    resolvers
})

server.listen().then(({url})=>{
    console.log('listening on '+url);
})
//DEFINICION DE DATOS Y DE DONDE SACAMOS LOS DATOS. ESENCIAL EN GRAPHQL