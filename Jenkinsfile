pipeline {
  agent any
  
	parameters{
	 	choice( name: 'Environment', 
            choices: ['Development', 'Production'], 
            description: 'Choose the environment')
	 

	}

  environment {
    PROD_FILE_ID = "c9f23695-d930-4dd4-90cf-7c25dc324536"
    DEV_FILE_ID = "e5cbe167-b831-40db-bc97-597b44f16e5e"

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

    stage ("Build") {
      // agent {
      //   docker { image 'node:latest' }
      // }
      steps {
        script {
sh 'echo "$USER"'
sh 'whoami'
sh 'hostname'

          // docker.image('node:latest').withRun() { c ->
          //   sh 'hostname'
          //   sh 'npm -v'

          //   sh 'cp '
          // }


					//def image = dockerBuildOrUse("front", "$workingPath/dockerfile", workingPath)
          docker.build("front:build", "-f dockerfile $workingPath").inside("--net=host -v /var/run/docker.sock:/var/run/docker.sock") { c->
          
            try {
              sh 'echo try'
              sh 'ls /app/build'
            } catch (error) {
              sh 'echo catch'
            } finally {
              sh 'echo finally'
            }
          }
          // image.inside("--net=host --user root -v /var/run/docker.sock:/var/run/docker.sock") { c->
          //   sh 'npm -v'
          //   sh 'ls'

            
          // }
        }
      }
    }

    // stage ("Get URL") {
    //   steps {
		// 		script {
    //       echo "URL of the web is ${WebUrl}"
    //       //printParams()

    //       def data = [
    //         TF_VAR_BR_NAME: TF_VAR_BR_NAME,
    //         SMARTER_EFF_BDD_USER: BDD_USER
    //       ]

    //       input message: 'Finished using the web site? (Click "Proceed" to continue)'
    //       def map = [Io: "1", Europa: "deux", Ganymed: "3"]
    //       for (element in map) {
    //           echo "${element.key} ${element.value}"
    //       }


    //       sh "cd $workingPath && echo export foo=bar"
    //       //sh "export TF_VAR_BR_NAME=`echo -n $TF_VAR_BR_NAME |base64 -w0`"

    //       for (kv in mapToList(data)) {
    //         sh "export ${kv[0]}=`echo -n ${kv[1]} |base64 -w0`"
    //       }

    //       // sh "envsubst <$workingPath/smarter-eff-secrets.yaml > $workingPath/smarter-eff-secrets-ok.yaml && cat $workingPath/smarter-eff-secrets-ok.yaml"
    //       // for(elem in data) {
    //       //   sh "export ${elem.key}=`echo -n ${elem.value} |base64 -w0`"
    //       // }

    //       printParams()
    //     }
      // }
    // }
  }
}

def dockerBuildOrUse(String image, String dockerFile, String buildFolder) {
	def imageDocker
	dir (buildFolder) {
		// Build image if need
    echo "Build image $image"
    imageDocker = docker.build("$image:build", "-f $dockerFile $buildFolder")
	}
	return imageDocker;
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