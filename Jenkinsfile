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
          abcs = ['a', 'b', 'c']
          echo_all(abcs)
          loop_of_sh(abcs)
          loop_with_preceding_sh(abcs)
          traditional_int_for_loop(abcs)
        }
      }
    }


  }
}

@NonCPS // has to be NonCPS or the build breaks on the call to .each
def echo_all(list) {
    list.each { item ->
        echo "Hello ${item}"
    }
}
// outputs all items as expected

@NonCPS
def loop_of_sh(list) {
    list.each { item ->
        sh "echo Hello ${item}"
    }
}
// outputs only the first item

@NonCPS
def loop_with_preceding_sh(list) {
    sh "echo Going to echo a list"
    list.each { item ->
        sh "echo Hello ${item}"
    }
}
// outputs only the "Going to echo a list" bit

//No NonCPS required
def traditional_int_for_loop(list) {
    sh "echo Going to echo a list"
    for (int i = 0; i < list.size(); i++) {
        sh "echo Hello ${list[i]}"
    }
}
// echoes everything as expected