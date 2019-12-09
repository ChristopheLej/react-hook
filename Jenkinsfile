pipeline {
  agent any
  
	parameters{
	 	choice( name: 'Environment', 
            choices: ['Development', 'Production'], 
            description: 'Choose the environment')
    
    string( name: 'Target', defaultValue: env.BRANCH_NAME,
		        description: 'Name of K8s cluster where the application should be deployed' )

	}

  environment {
    CREDENTIALS_AWS = credentials("DISPATCHPLUS_AWS_DEV");

    AWS_TEST     = "${"${params.Environment}" == Development ? 'equal' : 'smartereff-aws-prod-usr-psw'}";

    // AWS_ACCOUNT1     = "${"${params.Environment}" != 'Production' ? 'smartereff-non-prod-aws-pw' : 'smartereff-aws-prod-usr-psw'}"
    // TF_VAR_DNS_ZONE1	= "('${params.Environment}' != 'Production') ? 'dispatchplus-nonprod.navblue.cloud' : 'dispatchplus.navblue.cloud'"

    AWS_REGION = "eu-west-1"
  }


  stages {
		stage ("Init") {
			steps {
				script {
					env.AWS_ACCESS_KEY_ID			= "${CREDENTIALS_AWS_USR}"
					env.AWS_SECRET_ACCESS_KEY	= "${CREDENTIALS_AWS_PSW}"

    if ("${params.Environment}" == 'Production') {
      AWS_ACCOUNT     = 'smartereff-aws-prod-usr-psw'
      TF_VAR_DNS_ZONE	= 'dispatchplus.navblue.cloud'
    } else {
      AWS_ACCOUNT     = 'smartereff-non-prod-aws-pw'
      TF_VAR_DNS_ZONE	= 'dispatchplus-nonprod.navblue.cloud'
    }


          echo "Your choice is: ${params.Environment}"
          echo "AWS_ACCOUNT: ${AWS_TEST}"

          // echo "CHANGE_AUTHOR : ${env.CHANGE_AUTHOR}"

          // sh "echo ${env.TF_VAR_K8S_NODE_COUNT}"

          // def K8S_NODE_COUNT = env.TF_VAR_K8S_NODE_COUNT != null ? env.TF_VAR_K8S_NODE_COUNT : 3
          
          // sh "echo ${K8S_NODE_COUNT}"

          // Say('Hello')

          // SayWorld('World')

          // sh "id"
        }
      }
    }

		// stage ("Sample") {
		// 	steps {
		// 		script {
    //       abcs = ['a', 'b', 'c']
 		// 				echo "************** loop_of_sh ***************"
    //      loop_of_sh(abcs)
		// 				echo "************** loop_with_preceding_sh ***************"
    //       loop_with_preceding_sh(abcs)
		// 				echo "************** traditional_int_for_loop ***************"
    //       traditional_int_for_loop(abcs)
		// 				echo "************** echo_all ***************"
    //       echo_all(abcs)
    //       sh "ls -l > airlines.txt"
    //       sh "cat airlines.txt"
    //     }
    //   }
    // }


    // stage ("Command") {
    //   steps {
    //     script {
		// 			docker.build("deploy-smarter-eff:deploy-smarter-eff", "-f deploy.Dockerfile --rm ${WORKSPACE}")
		// 			.inside("--net=host --user jenkins:dockerbis -v /var/run/docker.sock:/var/run/docker.sock") { c->

    //         env.DNS_ZONE = "dispatchplus.gfinav.net"
    //         AWS_REGION = "eu-west-1"

    //         def a = sh(script: "aws acm list-certificates --region \${AWS_REGION} | jq -r --arg DNS \"*.\${DNS_ZONE}\" '.CertificateSummaryList[] | select(.DomainName == \$DNS) | .CertificateArn'", returnStdout: true).trim() 
    //         echo "a=${a}"

    //         def CERT_KEY = sh(script:"(for WCERTARN in \$(aws acm list-certificates --region \${AWS_REGION} | jq -r --arg DNS \"*.\${DNS_ZONE}\" '.CertificateSummaryList[] | select(.DomainName == \$DNS) | .CertificateArn'); \
    //                                   do \
    //                                     aws acm describe-certificate --region \${AWS_REGION} --certificate-arn \"\${WCERTARN}\" | jq -r '.Certificate | \"\\(.NotAfter) \\(.CertificateArn)\"'; \
    //                                   done) | sort | tail -1 | awk '{print \$2}'", returnStdout: true).trim()

    //         echo "CERT_KEY=${CERT_KEY}"
          

    //       }
    //     }
    //   }
    // }


		// stage ("test") {
		// 	steps {
		// 		script {

		// 			docker.build("deploy-smarter-eff:deploy-smarter-eff", "-f deploy.Dockerfile --rm ${WORKSPACE}")
		// 			.inside("--net=host --user jenkins:dockerbis -v /var/run/docker.sock:/var/run/docker.sock") { c->

    //       sh 'id'
          
    //       sh 'ls /var/run/docker.sock'

    //       // sh "chown -R 1009 /var/run/docker.sock"

    //       //sudo chmod 666 /var/run/docker.sock


    //       login()

    //       ech 'OK Login'
    //     }
    //   }
    // }
  // }


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

def login()
{
	sh "\$(aws ecr get-login --no-include-email --region ${env.AWS_REGION})"
}
