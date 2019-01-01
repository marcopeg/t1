export default `
mutation login (
    $uname: String!
    $passw: String!
) {
    login (
        uname: $uname
        passw: $passw
    ) {
        id
        lastLogin
    }
}`
