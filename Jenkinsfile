pipeline {
  agent any
  
  stages {
    stage ("Get source") {
      steps {
        echo "====++++something++++===="
        checkout scm
        configFileProvider([configFile(fileId:'JsonConfig', variable:'env')]) {
          echo "${env.env}"
        }
      }
    }
  }
}
