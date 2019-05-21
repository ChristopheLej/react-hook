pipeline {
  agent any
  
  stages {
    stage ("Get source") {
      steps {
        checkout scm
        def props = readJSON file: 'package.json'
        echo props['version']
        configFileProvider([configFile(fileId:'6e4385d1-4f03-4132-97b5-1b0e1365346d', variable:'CONFIG_FILE')]) {
          echo " =========== ^^^^^^^^^^^^ Reading config from pipeline script "
          script{
            def props = readJSON file: "${CONFIG_FILE}"
            echo props['env']
          }
          echo " =========== ~~~~~~~~~~~~ ============ "
        }
      }
    }
  }
}
