pipeline {
  agent any
  
  stages {
    stage ("Get source") {
      steps {
        echo "====++++before++++===="
        checkout scm
        configFileProvider([configFile(fileId:'JsonConfig', variable:'env')]) {
          echo "====++++inside++++===="
          echo "${env.env}"
        }
        echo "====++++after++++===="
      }
    }
  }
}
