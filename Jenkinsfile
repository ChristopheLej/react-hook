pipeline {
  agent any
  
	parameters{
	 	choice( name: 'Environment', 
            choices: ['Development', 'Production'], 
            description: 'Choose the environment')
	 

	}

  stages {
		stage ("Init") {
			steps {
				script {
          echo "Your choice is: ${params.Environment}"
          switch("${params.Environment}")
          {
            case "Development":
              env.FILE_ID="6e4385d1-4f03-4132-97b5-1b0e1365346d"
              break
            case "Production":
              env.FILE_ID="552f9ace-592c-4646-bad1-23df8a4535c7"
              break
            default:
              env.FILE_ID="6e4385d1-4f03-4132-97b5-1b0e1365346d"
              break
          }
        }
      }
    }

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
            def config = readJSON file: "${CONFIG_FILE}"

            keys= config.keySet()
            for(key in keys) {
              value = props["${key}"]
              env."${key}" = "${value}"
            }

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
        }
      }
    }
  }
}
