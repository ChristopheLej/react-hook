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

        configFileProvider([configFile(fileId:'6e4385d1-4f03-4132-97b5-1b0e1365346d', variable:'CONFIG_FILE')]) {
          echo " =========== ^^^^^^^^^^^^ Reading config from pipeline script "
          script{
            def config = readJSON file: "${CONFIG_FILE}"
            switch( config['env'])
            {
              case "DEV":
                echo "The platform is development"
                break
              case "PROD":
                echo "The platform is production"
                break
              default:
                echo "The platform is unknown"
                break
            }
          }
          echo " =========== ~~~~~~~~~~~~ ============ "
        }

      }
    }
  }
}
