import App from './App.svelte'
import 'appwrite'

var appwrite = new window.Appwrite() // Used for compatability with a <script> imported appwrite installation

appwrite
  .setEndpoint('http://localhost/v1') // Set only when using self-hosted solution
  .setProject('ProjectID')

const app = new App({
  target: document.body,
  props: {
    appwrite: appwrite
  }
})

export default app
