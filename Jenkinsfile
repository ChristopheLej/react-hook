pipeline {
  agent any
  
  stages {
    stage ("Get source") {
      steps {
        echo "====++++something++++===="
        checkout scm
        configFileProvider([configFile(fileId:'6e4385d1-4f03-4132-97b5-1b0e1365346d', variable:'env')]) {
          echo $env
        }
      }
    }
  }
}
