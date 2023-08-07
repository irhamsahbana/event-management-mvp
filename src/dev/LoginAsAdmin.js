import localforage from "localforage"

const LoginAsAdmin = () => {
  localforage.getItem('users').then((users) => {
    const client = users.find((user) => user.role === 'admin')

    localforage.setItem('user', client).then(() => {
      console.log('Current user set successfully')
    }).catch((err) => {
      console.log(err)
    })
  }).catch((err) => {
    console.log(err)
  })



  return (
    <div>LoginAsAdmin</div>
  )
}
export default LoginAsAdmin