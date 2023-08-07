import localforage from "localforage"

const LoginAsUser = () => {
  localforage.getItem('users').then((users) => {
    const client = users.find((user) => user.role === 'user')

    localforage.setItem('user', client).then(() => {
      console.log('Current user set successfully')
    }).catch((err) => {
      console.log(err)
    })
  }).catch((err) => {
    console.log(err)
  })

  return (
    <div>LoginAsUser</div>
  )
}
export default LoginAsUser