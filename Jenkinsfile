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

          sh "git fetch && git branch -a && git push ${params.Target} --delete ${params.Target}"

        }
      }
    }


  }
}

