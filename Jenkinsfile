pipeline {
  agent any
  
	parameters{
	 	choice( name: 'Environment', 
            choices: ['Development', 'Production'], 
            description: 'Choose the environment')
	 

	}

  environment {
    PROD_FILE_ID = "552f9ace-592c-4646-bad1-23df8a4535c7"
    DEV_FILE_ID = "6e4385d1-4f03-4132-97b5-1b0e1365346d"
	}


  stages {
		stage ("Init") {
			steps {
				script {
          echo "Your choice is: ${params.Environment}"
          switch("${params.Environment}")
          {
            case "Development":
              env.FILE_ID=env.DEV_FILE_ID
              break
            case "Production":
              env.FILE_ID=env.PROD_FILE_ID
              break
            default:
              env.FILE_ID=env.DEV_FILE_ID
              break
          }

          env.workingPath = "${pwd()}"

        }
      }
    }

    stage ("Get source") {
      steps {
        // checkout scm
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
          //printParams()

          def data = [
            TF_VAR_BR_NAME: TF_VAR_BR_NAME,
            SMARTER_EFF_BDD_USER: BDD_USER
          ]

          def map = [Io: "1", Europa: "deux", Ganymed: "3"]
          for (element in map) {
              echo "${element.key} ${element.value}"
          }

          def cmd = "cd $workingPath/Applications "
          for(elem in data) {
            def value = "${elem.value}"
            echo "$value"
            echo "${env.$value}"
            echo "export ${elem.key}=`echo -n "${elem.value}" |base64 -w0`"
          }
          // for (kv in mapToList(data)) {
          //   //echo "sh make build KEY=${kv[0]} VALUE='${kv[1]}'"
          //   cmd. += "&& export ${kv[0]}=`echo -n ${${kv[1]}}|base64 -w0` "
          // }

          echo cmd


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

@NonCPS
List<List<?>> mapToList(Map map) {
  return map.collect { it ->
    [it.key, it.value]
  }
}