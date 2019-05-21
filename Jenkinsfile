pipeline {
  agent any
  
  stages {
    stage ("Get source") {
      steps {
        checkout scm
        script {
          def props = readJSON file: 'package.json'
          echo props['version']
        }
      }
    }
  }
}
