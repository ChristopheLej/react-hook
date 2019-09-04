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

          Say(Hello)
        }
      }
    }

		stage ("Sample") {
			steps {
				script {
          abcs = ['a', 'b', 'c']
 						echo "************** loop_of_sh ***************"
         loop_of_sh(abcs)
						echo "************** loop_with_preceding_sh ***************"
          loop_with_preceding_sh(abcs)
						echo "************** traditional_int_for_loop ***************"
          traditional_int_for_loop(abcs)
						echo "************** echo_all ***************"
          echo_all(abcs)
        }
      }
    }


  }
}

def Say(String msg, String name='') {
  sh "echo ${msg} ${name}!"
}

def SayWorld(String name) {
  Say('Hello', "${name}")
}


@NonCPS // has to be NonCPS or the build breaks on the call to .each
def echo_all(list) {
    list.each { item ->
        echo "echo_all ${item}"
    }
}
// outputs all items as expected

@NonCPS
def loop_of_sh(list) {
    list.each { item ->
        sh "echo loop_of_sh ${item}"
    }
}
// outputs only the first item

@NonCPS
def loop_with_preceding_sh(list) {
    sh "echo Going to echo a list"
    list.each { item ->
        sh "echo loop_with_preceding_sh ${item}"
    }
}
// outputs only the "Going to echo a list" bit

//No NonCPS required
def traditional_int_for_loop(list) {
    sh "echo Going to echo a list"
    for (int i = 0; i < list.size(); i++) {
        sh "echo traditional_int_for_loop ${list[i]}"
    }
}
// echoes everything as expected