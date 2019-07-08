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

        }
      }
    }


  }
}

