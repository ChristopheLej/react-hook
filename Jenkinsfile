pipeline {
  agent any
  
	parameters{
	 	choice( name: 'Environment', 
            choices: ['Development', 'Production'], 
            description: 'Choose the environment')
    
    string( name: 'Target', defaultValue: env.BRANCH_NAME,
		        description: 'Name of K8s cluster where the application should be deployed' )
	}


  stages {
		stage ("Init") {
			steps {
				script {
          echo "Your choice is: ${params.Environment}"

          echo "CHANGE_AUTHOR : ${env.CHANGE_AUTHOR}"

          sh "echo ${env.TF_VAR_K8S_NODE_COUNT}"

          def K8S_NODE_COUNT = env.TF_VAR_K8S_NODE_COUNT != null ? env.TF_VAR_K8S_NODE_COUNT : 3
          
          sh "echo ${K8S_NODE_COUNT}"
        }
      }
    }

		stage ("Sample") {
			steps {
				script {
          def cmd = 'aws ecr list-images --repository-name=#REPO# --filter tagStatus=TAGGED'


          def url = '822550480227.dkr.ecr.eu-west-1.amazonaws.com/smarter-eff'
          echo url

          def afterLastSlash = url.substring(url.lastIndexOf('/') + 1, url.length())
          echo afterLastSlash

          cmd.replace('#REPO#', url.substring(url.lastIndexOf('/') + 1, url.length()))
          echo cmd
        }
      }
    }


  }
}

