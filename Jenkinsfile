pipeline {
  agent any

  stages {
    stage('Install') {
      steps { bat 'npm install' }
    }

    stage('Build') {
      steps { bat 'npm run-script build' }
    }


      stage('Deployment') {
      steps {
      script{
       def remote = [:]
            remote.name = 'Deployment'
            remote.host = 'xempre.com'
            remote.user = 'gworld'
            remote.password = 'GWorldTest'
            remote.allowAnyHosts = true
            writeFile file: 'Jenkinsfile'
                    sshPut remote: remote, from: 'Jenkinsfile', into: '/upload'
      }
      }
      }
  }
}


