pipeline {
  agent any
  
  stages {
    stage ("Get source") {
      steps {
        checkout scm
        configFileProvider([configFile(fileId:'6e4385d1-4f03-4132-97b5-1b0e1365346d', variable:'CONFIG_FILE')]) {
          echo " =========== ^^^^^^^^^^^^ Reading config from pipeline script "
          echo "${CONFIG_FILE}"
          readJSON(text: readFile(file: CONFIG_FILE))
          echo " =========== ~~~~~~~~~~~~ ============ "
        }
      }
    }
  }
}
