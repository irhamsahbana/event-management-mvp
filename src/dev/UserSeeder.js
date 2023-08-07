import localforage from "localforage"

const UserSeeder = () => {
  localforage.setItem('users', [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@gmail.com',
      password: 'secret',
      role: 'admin'
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'jane@gmail.com',
      password: 'secret',
      role: 'user',
      points: 0,
      referralCode: 'ABC123'
    },
  ]).then(() => {
    console.log('Users seeded successfully')
  }).catch((err) => {
    console.log(err)
  })

  localforage.setItem('categories',
    [
      {
        "id": "a2c3b1e4-5f6d-7a8b-9c0d-1e2f3a4b5c6d",
        "name": "Music"
      },
      {
        "id": "1e2f3a4b-5c6d-7a8b-9c0d-a2c3b1e4f5g6",
        "name": "Performing & Visual Arts"
      },
      {
        "id": "7a8b9c0d-1e2f-3a4b-5c6d-7f8g9h0i1j2",
        "name": "Holiday"
      },
      {
        "id": "3a4b5c6d-7e8f-9g0h-1i2j-3k4l5m6n7o8",
        "name": "Health"
      },
      {
        "id": "9g0h1i2j-3k4l-5m6n-7o8p-9q0r1s2t3u4",
        "name": "Hobbies"
      },
      {
        "id": "5m6n7o8p-9q0r-1s2t-3u4v-5w6x7y8z9a0",
        "name": "Business"
      },
      {
        "id": "1s2t3u4v-5w6x-7y8z-9a0b-1c2d3e4f5g6",
        "name": "Food & Drink"
      },
      {
        "id": "7y8z9a0b-1c2d-3e4f-5g6h-7i8j9k0l1m2",
        "name": "Sports & Fitness"
      }
    ]
  ).then(() => {
    console.log('Categories seeded successfully')
  }).catch((err) => {
    console.log(err)
  })

  return (
    <div>UserSeeder</div>
  )
}
export default UserSeeder