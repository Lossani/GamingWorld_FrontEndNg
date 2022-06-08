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
            sshPut remote: remote, from: 'C:\\Users\\Fjorpa\\.jenkins\\workspace\\GW-1-CICD-FR-1.0-060622\\dist', into: '/upload'
      }
      }
      }
    post {
                always {

                    emailext body: 'The result for the pipeline GW-1-CICD-BA-1.0-060622 build was SUCCESFULL',from: 'fjorpa93@gmail.com',subject: 'CI/CD Results', to: 'fjorpa93@gmail.com, cc:jaorpa93@gmail.com, cc:aaroncicimo3069@gmail.com, cc:lmolina@xempre.com'
                }
            }
  }
}


