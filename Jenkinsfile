pipeline {
  agent any
  
  stages {
    stage ("Get source") {
      steps {
        checkout scm
        configFileProvider([configFile(fileId:'6e4385d1-4f03-4132-97b5-1b0e1365346d', variable:'CONFIG_FILE')]) {
          echo " =========== ^^^^^^^^^^^^ Reading config from pipeline script "
          echo "${CONFIG_FILE}"
          sh "${CONFIG_FILE} | awk -v k="${text}" '{n=split($0,a,"${,}"); for (i=1; i<=n; i++) print a[i]}'"
          echo " =========== ~~~~~~~~~~~~ ============ "
        }
      }
    }
  }
}
