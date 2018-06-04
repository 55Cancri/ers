import axios from 'axios'

export let getToken = () => {
  console.log('getting token...')
  const token = localStorage.getItem('ers')
  //headers must be an object
  return { token }
}
export default {
  user: {
    login: credentials =>
      axios.post('/api/login', { credentials }).then(res => res.data.user),

    signup: user =>
      axios.post('/api/signup', { user }).then(res => res.data.user),

    updateGeneral: file =>
      axios
        .post('/api/general_settings', file, { headers: getToken() })
        .then(res => res.data),

    updatePassword: file =>
      axios
        .post('/api/password_settings', file, { headers: getToken() })
        .then(res => res.data),

    updateTransfer: file =>
      axios
        .post('/api/transfer_settings', file, { headers: getToken() })
        .then(res => res.data),

    deleteAccount: data =>
      axios
        .post('/api/delete', data, { headers: getToken() })
        .then(res => res.data),

    updateAccounts: data =>
      axios
        .post('/api/update', data, { headers: getToken() })
        .then(res => res.data),

    getUser: email =>
      axios
        .post('/api/get_user', email, { headers: getToken() })
        .then(res => res.data),

    deleteImage: data =>
      axios
        .post('/api/delete_image', data, { headers: getToken() })
        .then(res => res.data),

    nuke: email =>
      axios
        .post('/api/nuke', email, { headers: getToken() })
        .then(res => res.data)
  }
}
