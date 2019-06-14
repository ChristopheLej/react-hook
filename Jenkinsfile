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
          BR_NAME					= "${BRANCH_NAME}".toLowerCase().replace('_','-').replace('.','-').replace('/','-')

        }
      }
    }

    stage ("Get source") {
      environment {
        TF_VAR_BR_NAME			= "${BR_NAME}"
      }

      steps {
        // checkout scm

        script {
          if ( "${params.Environment}" == "Development" ) {
            loadEnvironmentVariables('deployment/configuration/dev.config.json')
          }

          def props = readJSON file: 'package.json'
          echo props['version']
          sh 'printenv'

          sh 'git clean -dfx'


        if ( fileExists('deployment/dev.config.json1') ) {
          loadEnvironmentVariables('deployment/dev.config.json1')
        }
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
          //sh 'printenv'
// sh 'echo "$USER"'
// sh 'whoami'
// sh 'hostname'

          // docker.image('node:latest').withRun() { c ->
          //   sh 'hostname'
          //   sh 'npm -v'

          //   sh 'cp '
          // }
          // sh 'ls ${WORKSPACE}/build'

          // sh 'rm -rf ${WORKSPACE}/build'
          // sh 'ls ${WORKSPACE}'


          def K8S_NODE_COUNT = TF_VAR_K8S_NODE_COUNT != null ? TF_VAR_K8S_NODE_COUNT : 3
          sh "echo K8S_NODE_COUNT : ${TF_VAR_K8S_NODE_COUNT} , ${K8S_NODE_COUNT}"

          TF_VAR_K8S_NODE_COUNT = "${TF_VAR_K8S_NODE_COUNT:3}"

          echo "K8S_NODE_COUNT : ${TF_VAR_K8S_NODE_COUNT} , ${TF_VAR_K8S_NODE_COUNT:3}"

          sh 'echo ${BR_NAME}'
          sh "echo ${BR_NAME}"
          sh 'echo env.BR_NAME'

					//def image = dockerBuildOrUse("front", "$workingPath/dockerfile", workingPath)
          // docker.build("front:build-${BR_NAME}", "-f deployment/web.dockerfile ${WORKSPACE}").inside("--net=host -v /var/run/docker.sock:/var/run/docker.sock") { c->

          //   try {
          //     def res = 'First try'
          //     sh "echo ${res}"

          //   } finally {

          //   }

          //   try {
          //     def res = 'Second try'
          //     sh "echo ${res}"

          //   } finally {

          //   }

          //   try {
          //     sh 'echo try'

          //     def result = true
          //     if (result) {
          //       sh 'echo change value of result'
          //       result = false
          //     }

          //     if (result) {
          //       sh 'echo result=true'
          //     } else {
          //       sh 'echo result=false'
          //     }

          //     sh 'echo ${result}'

          //     sh 'ls'
          //     sh 'mkdir -p testExist'
          //     sh 'ls'


          //     if ( fileExists('deployment/dev.config.json') ) {
          //       sh 'echo file exist'
          //     }

          //     sh 'mkdir -p ${WORKSPACE}/build/web && cp -R /app/build/* ${WORKSPACE}/build/web'
          //     retry(3) {
          //       sh 'ls /app/build'
          //     }
          //     timeout(time: 3, unit: 'MINUTES') {
          //       sh "while test `test -e /app/build/${filename} && echo 1 || echo 0` -ne 1 ; do sleep 30; echo .; done;"
          //     }
          //     // throw new Exception("Throw to stop pipeline")
          //      //error "Program failed, please read logs..."
          //   } catch (error) {
          //     sh 'echo catch'
          //     currentBuild.result = "FAILURE"
          //   } finally {
          //     sh 'echo finally'
          //   }
          // }

          archiveArtifacts allowEmptyArchive: true, artifacts: 'build/**/*'

          // sh 'ls ${WORKSPACE}/build'
          // sh 'ls ${WORKSPACE}/build/static'
          // sh 'ls ${WORKSPACE}/build/static/css'
          // sh 'ls ${WORKSPACE}/build/static/js'
          // image.inside("--net=host --user root -v /var/run/docker.sock:/var/run/docker.sock") { c->
          //   sh 'npm -v'
          //   sh 'ls'

            
          // }

          

          // sh 'deployment/script.sh'
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