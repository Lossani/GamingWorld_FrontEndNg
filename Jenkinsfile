pipeline {
  agent any

  stages {
    stage('Install') {
      steps { bat 'npm install' }
    }

    stage('Build') {
      steps { bat 'npm run-script build' }
    }
    stage('Deploy') {
          steps { bat 'sftp gworld@xempre.com'
                  bat 'GWorldTest'
                  bat 'exit'
                  }
        }
  }
}
