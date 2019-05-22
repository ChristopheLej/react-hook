pipeline {
  agent any
  
	parameters{
	 	choice( name: 'Environment', 
            choices: ['Development', 'Production'], 
            description: 'Choose the environment')
	 

	}

  environment {
      switch("${params.Environment}")
      {
        case "Development":
          FILE_ID="6e4385d1-4f03-4132-97b5-1b0e1365346d"
          break
        case "Production":
          FILE_ID="552f9ace-592c-4646-bad1-23df8a4535c7"
          break
        default:
          FILE_ID="6e4385d1-4f03-4132-97b5-1b0e1365346d"
          break
      }
  }


  stages {
    stage ("Get source") {
      steps {
        checkout scm
        script {
          def props = readJSON file: 'package.json'
          echo props['version']
        }

        configFileProvider([configFile(fileId:env.FILE_ID, variable:'CONFIG_FILE')]) {
          echo " =========== ^^^^^^^^^^^^ Reading config from pipeline script "
          script{
            
            loadEnvironmentVariables("${CONFIG_FILE}")

            env.TF_VAR_BR_NAME="${params.Environment}".toLowerCase().replace('_','-')
            env.DB_CLUSTER="$TF_VAR_APP_NAME-$TF_VAR_BR_NAME"


            switch("${ENVIRONMENT}")
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

            //env.WebUrl=config['server']
          }
          echo " =========== ~~~~~~~~~~~~ ============ "
        }

      }
    }

    stage ("Get URL") {
      steps {
				script {
          echo "URL of the web is ${WebUrl}"
          printParams()
        }
      }
    }
  }
}

def loadEnvironmentVariables(path) {
  def config = readJSON file: path
  keys= config.keySet()
  for(key in keys) {
    env."${key}" = config["${key}"]
  }
}

def printParams() {
  env.getEnvironment().each { name, value -> println "$name: $value" }
}
