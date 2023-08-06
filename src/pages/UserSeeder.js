import localforage from "localforage"

const UserSeeder = () => {
 localforage.setItem('users', [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@gmail.com',
      role: 'admin'
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'jane@gmail.com',
      role: 'user'
    },
  ]).then(() => {
    console.log('Users seeded successfully')
  }).catch((err) => {
    console.log(err)
  })

  return (
    <div>UserSeeder</div>
  )
}
export default UserSeeder