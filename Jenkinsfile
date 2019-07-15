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
          def ex =['sh','-c','ps -aef | grep Xmx']
          String str =  ex.execute().text

          echo $str
        }
      }
    }


  }
}

